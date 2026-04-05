output "project_id" {
  description = "Projet GCP cible"
  value       = var.project_id
}

output "app_engine_default_hostname" {
  description = "Hostname par defaut App Engine"
  value       = google_app_engine_application.app.default_hostname
}

output "workload_identity_provider" {
  description = "A reutiliser dans google-github-actions/auth@v2"
  value       = google_iam_workload_identity_pool_provider.github.name
}

output "github_actions_service_account_email" {
  description = "Email du service account CI"
  value       = google_service_account.github_actions.email
}

output "runtime_service_account_email" {
  description = "Email du service account runtime App Engine"
  value       = var.create_runtime_service_account ? google_service_account.runtime[0].email : null
}

