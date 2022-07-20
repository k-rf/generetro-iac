import { getProject } from "@pulumi/gcp/organizations";
import { IAMMember } from "@pulumi/gcp/projects";
import * as pulumi from "@pulumi/pulumi";

import { RESOURCES } from "../variables";
import { GCP_CONFIG } from "../variables/config/gcp";

import { ServiceAccount } from "./modules/account";

// ============================================================================
const project = getProject();

const cloudRunRole = new IAMMember(
  `${RESOURCES.CLOUD_RUN_ROLE.NAME}-secretmanager-secret-accessor`,
  {
    role: "roles/secretmanager.secretAccessor",
    member: project.then((p) => `serviceAccount:${p.number}-compute@developer.gserviceaccount.com`),
    project: GCP_CONFIG.PROJECT,
  }
);

export const cloudRunRoleId = cloudRunRole.id;

// ============================================================================
const cloudSchedulerServiceAccount = new ServiceAccount({
  resourceName: RESOURCES.CLOUD_SCHEDULER_SERVICE_ACCOUNT.NAME,
  description: RESOURCES.CLOUD_SCHEDULER_SERVICE_ACCOUNT.DESCRIPTION,
  accountId: "generetro-cloud-scheduler",
});

new IAMMember(`${RESOURCES.CLOUD_SCHEDULER_ROLE.NAME}-run-invoker`, {
  role: "roles/run.invoker",
  member: pulumi.interpolate`serviceAccount:${cloudSchedulerServiceAccount.created.email}`,
  project: GCP_CONFIG.PROJECT,
});

export const cloudSchedulerServiceAccountEmail = cloudSchedulerServiceAccount.created.email;

// ============================================================================
const cloudBuildServiceAccount = new ServiceAccount({
  resourceName: RESOURCES.CLOUD_BUILD_SERVICE_ACCOUNT.NAME,
  description: RESOURCES.CLOUD_BUILD_SERVICE_ACCOUNT.DESCRIPTION,
  accountId: "generetro-cloud-build",
});

[
  { role: "roles/logging.logWriter", name: "logging-log-writer" },
  { role: "roles/logging.viewer", name: "logging-viewer" },
  { role: "roles/artifactregistry.writer", name: "artifactregistry-writer" },
  { role: "roles/run.developer", name: "run-developer" },
  { role: "roles/secretmanager.secretAccessor", name: "secretmanager-secret-accessor" },
  { role: "roles/iam.serviceAccountUser", name: "iam-service-account-user" },
].map(
  (role) =>
    new IAMMember(`${RESOURCES.CLOUD_BUILD_ROLE.NAME}-${role.name}`, {
      role: role.role,
      member: pulumi.interpolate`serviceAccount:${cloudBuildServiceAccount.created.email}`,
      project: GCP_CONFIG.PROJECT,
    })
);

export const cloudBuildServiceAccountId = cloudBuildServiceAccount.created.id;
