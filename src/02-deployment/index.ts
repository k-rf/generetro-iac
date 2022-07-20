import * as pulumi from "@pulumi/pulumi";

import { CloudRun } from "./modules/cloud-run";

const config = new pulumi.Config();

// ============================================================================
const pipeline = new pulumi.StackReference(`${config.require("org")}/generetro/pipeline`);
const secretOutput = pipeline.getOutput("secretManagerName") as pulumi.Output<
  {
    id: string;
    secretId: string;
  }[]
>;
const buildImageOutput = (pipeline.getOutput("build") as pulumi.Output<string[]>)[0];

const cloudRun = new CloudRun({
  resourceName: "generetro-cloud-run",
  image: buildImageOutput,
  envs: secretOutput.apply((secrets) =>
    secrets.map((e) => ({
      name: e.secretId,
      valueFrom: {
        secretKeyRef: {
          name: e.secretId,
          key: "1",
        },
      },
    }))
  ),
});

export const cloudRunName = cloudRun.created.name;
export const cloudRunStatuses = cloudRun.created.statuses;
