# Terraform - App Engine + GitHub OIDC

Cette stack Terraform:

- active les APIs GCP necessaires au deploiement App Engine,
- cree l'application App Engine (une seule fois par projet),
- cree un Workload Identity Pool + Provider pour GitHub Actions,
- cree les service accounts necessaires pour CI (et runtime optionnel),
- assigne les roles IAM pour permettre le deploiement depuis GitHub Actions.

## Prerequis

- Terraform >= 1.6
- Droits IAM suffisants sur le projet GCP cible (Project IAM Admin + Service Usage Admin + App Engine Admin)

## Utilisation

1. Copier et adapter les variables:

```bash
Copy-Item terraform.tfvars.example terraform.tfvars
```

2. Initialiser et verifier:

```bash
terraform init
terraform fmt -recursive
terraform validate
```

3. Appliquer:

```bash
terraform apply
```

4. Recuperer les sorties utiles pour `.github/workflows/deploy.yml`:

```bash
terraform output workload_identity_provider
terraform output github_actions_service_account_email
```

## Integration workflow GitHub

Dans l'etape `google-github-actions/auth@v2`, utiliser:

- `workload_identity_provider`: output `workload_identity_provider`
- `service_account`: output `github_actions_service_account_email`

Exemple:

```yaml
- id: auth
  uses: google-github-actions/auth@v2
  with:
    workload_identity_provider: projects/123/locations/global/workloadIdentityPools/github/providers/github
    service_account: github-actions@my-project.iam.gserviceaccount.com
```

## Notes

- La region App Engine (`app_engine_location`) est irreversible apres creation.
- Le resource `google_app_engine_application` ne doit normalement jamais etre detruit.
- Pour securiser davantage, definir `github_ref` (ex: `refs/heads/main`).
