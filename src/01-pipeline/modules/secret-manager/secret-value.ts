import { SecretVersion, SecretVersionArgs } from "@pulumi/gcp/secretmanager";

import { Properties, Resource } from "../../../shared";

type Props = Properties & Pick<SecretVersionArgs, "secret" | "secretData">;

export class SecretValue extends Resource<SecretVersion, Props> {
  protected resource: SecretVersion;

  constructor(props: Props) {
    super(props);

    this.resource = new SecretVersion(props.resourceName, {
      ...props,
    });
  }
}

export { Props as SecretValueProps };
