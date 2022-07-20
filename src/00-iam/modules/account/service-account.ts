import { Account, AccountArgs } from "@pulumi/gcp/serviceaccount/account";

import { Properties, Resource } from "../../../shared";

type Props = Properties & Pick<AccountArgs, "accountId" | "description">;

export class ServiceAccount extends Resource<Account, Props> {
  protected resource: Account;

  constructor(props: Props) {
    super(props);

    const { resourceName, ...properties } = props;

    this.resource = new Account(resourceName, {
      ...properties,
    });
  }
}
