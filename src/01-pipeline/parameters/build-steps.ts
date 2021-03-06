import { ENV_CONFIG } from "../../variables/config/env";
import { GCP_CONFIG } from "../../variables/config/gcp";
import { CloudBuildTriggerProps } from "../modules/cloud-build";
import { SecretManager } from "../modules/secret-manager";

import { prodImage, testImage } from "./image-name";

type BuildSteps = (props: {
  artifactRegistryName: string;
  cloudRunName: string;
  secretManager: SecretManager;
}) => CloudBuildTriggerProps["build"];

const imagesOnCloudBuild = {
  docker: "gcr.io/cloud-builders/docker",
  gcloud: "gcr.io/google.com/cloudsdktool/cloud-sdk",
};

export const buildSteps: BuildSteps = (props) => {
  const dockerEnv = Object.keys(ENV_CONFIG).reduce((p, c) => `${p} --build-arg ${c}=$$${c}`, "");

  return {
    timeout: "7200s",
    images: [`${prodImage}:latest`, `${prodImage}:$COMMIT_SHA`],
    availableSecrets: {
      secretManagers: props.secretManager.created.map((secret) => ({
        env: secret.key.created.secretId,
        versionName: secret.value.created.name,
      })),
    },
    options: { logging: "CLOUD_LOGGING_ONLY" },
    steps: [
      {
        id: "Test",
        name: imagesOnCloudBuild.docker,
        entrypoint: `bash`,
        args: [`-c`, `docker build --target=test -t ${testImage}:$COMMIT_SHA ${dockerEnv} .`],
        secretEnvs: Object.keys(ENV_CONFIG),
      },
      {
        id: "Build",
        name: imagesOnCloudBuild.docker,
        entrypoint: `bash`,
        args: [
          `-c`,
          `docker build -t ${prodImage}:$COMMIT_SHA -t ${prodImage}:latest ${dockerEnv} .`,
        ],
        secretEnvs: Object.keys(ENV_CONFIG),
      },
      {
        id: "Push",
        name: imagesOnCloudBuild.docker,
        args: [`push`, `--all-tags`, `${prodImage}`],
      },
      {
        id: "Deploy",
        name: imagesOnCloudBuild.gcloud,
        entrypoint: "gcloud",
        args: [
          `run`,
          `deploy`,
          `${props.cloudRunName}`,
          `--platform=managed`,
          `--image=${prodImage}:$COMMIT_SHA`,
          `--labels=commit-sha=$COMMIT_SHA,gcb-build-id=$BUILD_ID`,
          `--region=${GCP_CONFIG.REGION}`,
          `--port=3000`,
          `--quiet`,
          `--project=${GCP_CONFIG.PROJECT}`,
        ],
      },
    ],
  };
};
