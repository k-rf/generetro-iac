import { CONFIG } from "./config";

const RESOURCE_KEYS = {
  ARTIFACT_REGISTRY: "ARTIFACT_REGISTRY",
  CLOUD_BUILD_TRIGGER: "CLOUD_BUILD_TRIGGER",
  CLOUD_RUN: "CLOUD_RUN",
} as const;

export const RESOURCES: Record<keyof typeof RESOURCE_KEYS, { NAME: string; DESCRIPTION: string }> =
  {
    ARTIFACT_REGISTRY: {
      NAME: `${CONFIG.APP.NAME}-artifact-registry`,
      DESCRIPTION: "The artifact registry for generetro",
    },
    CLOUD_BUILD_TRIGGER: {
      NAME: `${CONFIG.APP.NAME}-cloud-build-trigger`,
      DESCRIPTION: "The pipeline for generetro",
    },
    CLOUD_RUN: {
      NAME: `${CONFIG.APP.NAME}-cloud-run`,
      DESCRIPTION: "The execution environment for generetro",
    },
  };
