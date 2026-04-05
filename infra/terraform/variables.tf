variable "project_id" {
  description = "ID du projet GCP cible"
  type        = string
}

variable "region" {
  description = "Region GCP principale"
  type        = string
  default     = "europe-west1"
}

variable "app_engine_location" {
  description = "Region App Engine (irreversible apres creation)"
  type        = string
  default     = "europe-west"
}

variable "github_repository" {
  description = "Repository GitHub autorise au format org/repo"
  type        = string
}

variable "github_ref" {
  description = "Ref GitHub autorisee (ex: refs/heads/main ou refs/tags/v*). Null = toutes refs"
  type        = string
  default     = null
}

variable "workload_identity_pool_id" {
  description = "ID du Workload Identity Pool"
  type        = string
  default     = "github"
}

variable "workload_identity_provider_id" {
  description = "ID du Workload Identity Provider"
  type        = string
  default     = "github"
}

variable "github_actions_service_account_id" {
  description = "ID du service account utilise par GitHub Actions"
  type        = string
  default     = "github-actions"
}

variable "runtime_service_account_id" {
  description = "ID du service account runtime App Engine"
  type        = string
  default     = "appengine-runtime"
}

variable "create_runtime_service_account" {
  description = "Cree un service account runtime dedie pour App Engine"
  type        = bool
  default     = true
}

variable "ci_project_roles" {
  description = "Roles IAM projet pour le service account de deploiement CI"
  type        = list(string)
  default = [
    "roles/appengine.appAdmin",
    "roles/cloudbuild.builds.editor",
    "roles/storage.admin"
  ]
}

variable "runtime_service_account_roles" {
  description = "Roles IAM projet pour le service account runtime"
  type        = list(string)
  default = [
    "roles/logging.logWriter",
    "roles/monitoring.metricWriter",
    "roles/cloudtrace.agent"
  ]
}
