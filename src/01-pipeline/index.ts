import * as pulumi from "@pulumi/pulumi";

import { lowerHyphen } from "../utils/lower-hyphen";
import { RESOURCES } from "../variables";
import { APP_CONFIG } from "../variables/config/app";
import { ENV_CONFIG } from "../variables/config/env";

import { ArtifactRegistry } from "./modules/artifact-registry";
import { CloudBuildTrigger } from "./modules/cloud-build";
import { SecretManager } from "./modules/secret-manager";
import { buildSteps } from "./parameters/build-steps";

// ============================================================================
const config = new pulumi.Config();
const iam = new pulumi.StackReference(`${config.require("org")}/generetro/iam`);
const cloudBuildServiceAccountIdOutput = iam.getOutput(
  "cloudBuildServiceAccountId"
) as pulumi.Output<string>;

// ============================================================================
const secretManager = new SecretManager({
  keyValues: Object.entries(ENV_CONFIG).map(([key, value]) => ({
    key: { resourceName: `${lowerHyphen(key)}-key`, secretId: key },
    value: { resourceName: `${lowerHyphen(key)}-value`, secretData: value },
  })),
});

export const secretManagerName = secretManager.created.map((e) => ({
  id: e.key.created.id,
  secretId: e.key.created.secretId,
}));

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
  serviceAccount: cloudBuildServiceAccountIdOutput,
  build: buildSteps({
    artifactRegistryName: String(artifactRegistryName),
    cloudRunName: RESOURCES.CLOUD_RUN.NAME,
    secretManager,
  }),
  tags: [APP_CONFIG.NAME],
});

export const triggerName = cloudBuildTrigger.created.name;
export const build = cloudBuildTrigger.created.build.apply((build) => build?.images);
