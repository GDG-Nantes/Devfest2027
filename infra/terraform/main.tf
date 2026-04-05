locals {
  services_to_enable = toset([
    "appengine.googleapis.com",
    "iam.googleapis.com",
    "iamcredentials.googleapis.com",
    "cloudresourcemanager.googleapis.com",
    "sts.googleapis.com",
    "cloudbuild.googleapis.com"
  ])

  github_provider_condition = var.github_ref == null ? "assertion.repository == '${var.github_repository}'" : "assertion.repository == '${var.github_repository}' && assertion.ref == '${var.github_ref}'"
}

provider "google" {
  project = var.project_id
  region  = var.region
}

provider "google-beta" {
  project = var.project_id
  region  = var.region
}

resource "google_project_service" "required" {
  for_each = local.services_to_enable

  project            = var.project_id
  service            = each.value
  disable_on_destroy = false
}

resource "google_app_engine_application" "app" {
  project     = var.project_id
  location_id = var.app_engine_location

  # FIRESTORE mode is Google recommended default for new projects.
  database_type = "CLOUD_FIRESTORE"

  depends_on = [google_project_service.required]
}

resource "google_iam_workload_identity_pool" "github" {
  project                   = var.project_id
  workload_identity_pool_id = var.workload_identity_pool_id
  display_name              = "GitHub Actions Pool"
  description               = "Federation OIDC pour GitHub Actions"

  depends_on = [google_project_service.required]
}

resource "google_iam_workload_identity_pool_provider" "github" {
  project                            = var.project_id
  workload_identity_pool_id          = google_iam_workload_identity_pool.github.workload_identity_pool_id
  workload_identity_pool_provider_id = var.workload_identity_provider_id
  display_name                       = "GitHub Provider"
  description                        = "Provider OIDC token.actions.githubusercontent.com"
  attribute_condition                = local.github_provider_condition

  attribute_mapping = {
    "google.subject"       = "assertion.sub"
    "attribute.actor"      = "assertion.actor"
    "attribute.repository" = "assertion.repository"
    "attribute.ref"        = "assertion.ref"
  }

  oidc {
    issuer_uri = "https://token.actions.githubusercontent.com"
  }
}

resource "google_service_account" "github_actions" {
  project      = var.project_id
  account_id   = var.github_actions_service_account_id
  display_name = "GitHub Actions App Engine Deployer"
  description  = "Utilise via Workload Identity Federation"
}

resource "google_project_iam_member" "github_actions_project_roles" {
  for_each = toset(var.ci_project_roles)

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.github_actions.email}"
}

resource "google_service_account_iam_member" "github_actions_wif_user" {
  service_account_id = google_service_account.github_actions.name
  role               = "roles/iam.workloadIdentityUser"
  member             = "principalSet://iam.googleapis.com/${google_iam_workload_identity_pool.github.name}/attribute.repository/${var.github_repository}"
}

resource "google_service_account" "runtime" {
  count = var.create_runtime_service_account ? 1 : 0

  project      = var.project_id
  account_id   = var.runtime_service_account_id
  display_name = "App Engine Runtime"
  description  = "Service account runtime dedie App Engine"
}

resource "google_project_iam_member" "runtime_roles" {
  for_each = var.create_runtime_service_account ? toset(var.runtime_service_account_roles) : toset([])

  project = var.project_id
  role    = each.value
  member  = "serviceAccount:${google_service_account.runtime[0].email}"
}

resource "google_service_account_iam_member" "github_actions_act_as_runtime" {
  count = var.create_runtime_service_account ? 1 : 0

  service_account_id = google_service_account.runtime[0].name
  role               = "roles/iam.serviceAccountUser"
  member             = "serviceAccount:${google_service_account.github_actions.email}"
}
