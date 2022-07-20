import { output } from "@pulumi/gcp/types";
import * as pulumi from "@pulumi/pulumi";

import { RESOURCES } from "../variables";

import { Scheduler } from "./modules/scheduler";

// ============================================================================
const config = new pulumi.Config();

const iam = new pulumi.StackReference(`${config.require("org")}/generetro/iam`);
const iamOutput = iam.getOutput("cloudSchedulerServiceAccountEmail") as pulumi.Output<string>;

const deployment = new pulumi.StackReference(`${config.require("org")}/generetro/deployment`);
const runOutput = deployment.getOutput("cloudRunStatuses") as pulumi.Output<
  output.cloudrun.ServiceStatus[]
>;

// ============================================================================
new Scheduler({
  resourceName: RESOURCES.CLOUD_SCHEDULER.NAME,
  description: RESOURCES.CLOUD_SCHEDULER.DESCRIPTION,
  schedule: "0 21 * * 7",
  httpTarget: {
    httpMethod: "POST",
    uri: runOutput.apply((statuses) => `${statuses[0].url}/`),
    oidcToken: {
      serviceAccountEmail: iamOutput,
    },
  },
});
