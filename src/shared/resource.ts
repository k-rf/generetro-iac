export type Properties = {
  resourceName: string;
};

export abstract class Resource<R, P extends Properties> {
  protected abstract resource: R;

  constructor(protected readonly properties: P) {}

  get created() {
    return this.resource;
  }
}
