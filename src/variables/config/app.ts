import * as pulumi from "@pulumi/pulumi";

export type AppConfig = {
  NAME: string;
};

const appConfig = new pulumi.Config("app");

export const APP_CONFIG: AppConfig = {
  NAME: appConfig.require("name"),
};
