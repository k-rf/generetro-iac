import { Trigger, TriggerArgs } from "@pulumi/gcp/cloudbuild";

import { Properties, Resource } from "../../../shared";
import { GCP_CONFIG } from "../../../variables/config/gcp";
import { GITHUB_CONFIG } from "../../../variables/config/github";

type Props = Properties & Pick<TriggerArgs, "description" | "tags" | "build" | "serviceAccount">;

export class CloudBuildTrigger extends Resource<Trigger, Props> {
  protected resource: Trigger;

  constructor(props: Props) {
    super(props);

    this.resource = new Trigger(props.resourceName, {
      ...props,
      name: props.resourceName,
      project: GCP_CONFIG.PROJECT,
      github: {
        name: GITHUB_CONFIG.REPOSITORY,
        owner: GITHUB_CONFIG.OWNER,
        push: {
          branch: "^main$",
        },
      },
      serviceAccount: props.serviceAccount,
      build: props.build,
    });
  }
}

export { Props as CloudBuildTriggerProps };
