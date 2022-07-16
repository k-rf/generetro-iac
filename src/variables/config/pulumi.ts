import * as pulumi from "@pulumi/pulumi";

export type PulumiConfig = {
  PROJECT: string;
};

export const PULUMI_CONFIG: PulumiConfig = {
  PROJECT: pulumi.getProject(),
};
