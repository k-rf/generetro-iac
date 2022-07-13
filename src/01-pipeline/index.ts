import { IAMBinding } from "@pulumi/gcp/projects";

import { lowerHyphen } from "../utils/lower-hyphen";
import { CONFIG, RESOURCES } from "../variables";

import { ServiceAccount } from "./modules/account";
import { ArtifactRegistry } from "./modules/artifact-registry";
import { CloudBuildTrigger } from "./modules/cloud-build";
import { SecretManager } from "./modules/secret-manager";
import { buildSteps } from "./parameters/build-steps";

// ============================================================================
// TODO: サービスアカウントの作成やロールの付与は別スタックで実行する
const cloudBuildServiceAccount = new ServiceAccount({
  resourceName: RESOURCES.CLOUD_BUILD_SERVICE_ACCOUNT.NAME,
  description: RESOURCES.CLOUD_BUILD_SERVICE_ACCOUNT.DESCRIPTION,
  accountId: "generetro-cloud-build",
});

cloudBuildServiceAccount.created.email.apply((email) => {
  [
    { role: "roles/logging.logWriter", name: "logging-log-writer" },
    { role: "roles/logging.viewer", name: "logging-viewer" },
    { role: "roles/artifactregistry.writer", name: "artifactregistry-writer" },
    { role: "roles/run.developer", name: "run-developer" },
    { role: "roles/secretmanager.secretAccessor", name: "secretmanager-secret-accessor" },
    { role: "roles/iam.serviceAccountUser", name: "iam-service-account-user" },
  ].map(
    (role) =>
      new IAMBinding(`binding-${role.name}`, {
        role: role.role,
        members: [`serviceAccount:${email}`],
        project: CONFIG.GCP.PROJECT,
      })
  );
});

// ============================================================================
const secretManager = new SecretManager({
  keyValues: Object.entries(CONFIG.ENV).map(([key, value]) => ({
    key: { resourceName: `${lowerHyphen(key)}-key`, secretId: key },
    value: { resourceName: `${lowerHyphen(key)}-value`, secretData: value },
  })),
  serviceAccount: cloudBuildServiceAccount,
});

export const secretManagerName = secretManager.created.map((e) => e.key.created.id);

// ============================================================================
const artifactRegistry = new ArtifactRegistry({
  resourceName: RESOURCES.ARTIFACT_REGISTRY.NAME,
  description: RESOURCES.ARTIFACT_REGISTRY.DESCRIPTION,
});

export const artifactRegistryName = artifactRegistry.created.name;

// ============================================================================
const cloudBuildTrigger = new CloudBuildTrigger({
  resourceName: RESOURCES.CLOUD_BUILD_TRIGGER.NAME,
  description: RESOURCES.CLOUD_BUILD_TRIGGER.DESCRIPTION,
  serviceAccount: cloudBuildServiceAccount.created.id,
  build: buildSteps({
    artifactRegistryName: String(artifactRegistryName),
    cloudRunName: RESOURCES.CLOUD_RUN.NAME,
    secretManager,
  }),
  tags: [CONFIG.APP.NAME],
});

export const triggerName = cloudBuildTrigger.created.name;
