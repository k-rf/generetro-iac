import { SecretKey, SecretKeyProps } from "./secret-key";
import { SecretValue, SecretValueProps } from "./secret-value";

type Props = {
  keyValues: {
    key: SecretKeyProps;
    value: Omit<SecretValueProps, "secret">;
  }[];
};

type Output = {
  key: SecretKey;
  value: SecretValue;
}[];

export class SecretManager {
  protected resource: Output;

  constructor(props: Props) {
    this.resource = props.keyValues.map((e) => {
      const key: SecretKey = new SecretKey(e.key);
      const value: SecretValue = new SecretValue({
        ...e.value,
        secret: key.created.id,
      });

      return { key, value };
    });
  }

  get created() {
    return this.resource;
  }
}
