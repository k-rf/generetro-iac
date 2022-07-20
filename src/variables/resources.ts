import { APP_CONFIG } from "./config/app";

const RESOURCE_KEYS = {
  ARTIFACT_REGISTRY: "ARTIFACT_REGISTRY",
  CLOUD_BUILD_TRIGGER: "CLOUD_BUILD_TRIGGER",
  CLOUD_BUILD_SERVICE_ACCOUNT: "CLOUD_BUILD_SERVICE_ACCOUNT",
  CLOUD_BUILD_ROLE: "SECRET_BINDING",
  CLOUD_RUN: "CLOUD_RUN",
  CLOUD_RUN_ROLE: "CLOUD_RUN_ROLE",
  CLOUD_SCHEDULER: "CLOUD_SCHEDULER",
  CLOUD_SCHEDULER_SERVICE_ACCOUNT: "CLOUD_SCHEDULER_SERVICE_ACCOUNT",
  CLOUD_SCHEDULER_ROLE: "CLOUD_SCHEDULER_ROLE",
} as const;

export const RESOURCES: Record<keyof typeof RESOURCE_KEYS, { NAME: string; DESCRIPTION?: string }> =
  {
    ARTIFACT_REGISTRY: {
      NAME: `${APP_CONFIG.NAME}-artifact-registry`,
      DESCRIPTION: "The artifact registry for generetro",
    },
    CLOUD_BUILD_TRIGGER: {
      NAME: `${APP_CONFIG.NAME}-cloud-build-trigger`,
      DESCRIPTION: "The pipeline for generetro",
    },
    CLOUD_BUILD_SERVICE_ACCOUNT: {
      NAME: `${APP_CONFIG.NAME}-cloud-build-service-account`,
      DESCRIPTION: "The service account for generetro cloud build",
    },
    CLOUD_BUILD_ROLE: {
      NAME: `${APP_CONFIG.NAME}-cloud-build-role`,
    },
    CLOUD_RUN: {
      NAME: `${APP_CONFIG.NAME}-cloud-run`,
      DESCRIPTION: "The execution environment for generetro",
    },
    CLOUD_RUN_ROLE: {
      NAME: `${APP_CONFIG.NAME}-cloud-run-role`,
    },
    CLOUD_SCHEDULER: {
      NAME: `${APP_CONFIG.NAME}-cloud-scheduler`,
      DESCRIPTION: "The scheduler for generetro",
    },
    CLOUD_SCHEDULER_SERVICE_ACCOUNT: {
      NAME: `${APP_CONFIG.NAME}-cloud-scheduler-service-account`,
      DESCRIPTION: "The service account for generetro cloud scheduler",
    },
    CLOUD_SCHEDULER_ROLE: {
      NAME: `${APP_CONFIG.NAME}-cloud-scheduler-role`,
    },
  };
