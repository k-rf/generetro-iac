import { Secret, SecretArgs } from "@pulumi/gcp/secretmanager";

import { Properties, Resource } from "../../../shared";
import { GCP_CONFIG } from "../../../variables/config/gcp";

type Props = Properties & Pick<SecretArgs, "secretId">;

export class SecretKey extends Resource<Secret, Props> {
  protected resource: Secret;

  constructor(props: Props) {
    super(props);

    this.resource = new Secret(props.resourceName, {
      replication: {
        userManaged: {
          replicas: [{ location: GCP_CONFIG.REGION }],
        },
      },
      secretId: props.secretId,
    });
  }
}

export { Props as SecretKeyProps };
