import { CONFIG } from "./config";

const RESOURCE_KEYS = {
  ARTIFACT_REGISTRY: "ARTIFACT_REGISTRY",
  CLOUD_BUILD_TRIGGER: "CLOUD_BUILD_TRIGGER",
  CLOUD_BUILD_SERVICE_ACCOUNT: "CLOUD_BUILD_SERVICE_ACCOUNT",
  CLOUD_RUN: "CLOUD_RUN",
  SECRET_BINDING: "SECRET_BINDING",
  SECRET_POLICY: "SECRET_POLICY",
} as const;

export const RESOURCES: Record<keyof typeof RESOURCE_KEYS, { NAME: string; DESCRIPTION?: string }> =
  {
    ARTIFACT_REGISTRY: {
      NAME: `${CONFIG.APP.NAME}-artifact-registry`,
      DESCRIPTION: "The artifact registry for generetro",
    },
    CLOUD_BUILD_TRIGGER: {
      NAME: `${CONFIG.APP.NAME}-cloud-build-trigger`,
      DESCRIPTION: "The pipeline for generetro",
    },
    CLOUD_BUILD_SERVICE_ACCOUNT: {
      NAME: `${CONFIG.APP.NAME}-cloud-build-service-account`,
      DESCRIPTION: "The service account for generetro cloud build",
    },
    CLOUD_RUN: {
      NAME: `${CONFIG.APP.NAME}-cloud-run`,
      DESCRIPTION: "The execution environment for generetro",
    },
    SECRET_BINDING: {
      NAME: `${CONFIG.APP.NAME}-secret-binding`,
    },
    SECRET_POLICY: {
      NAME: `${CONFIG.APP.NAME}-secret-policy`,
    },
  };
