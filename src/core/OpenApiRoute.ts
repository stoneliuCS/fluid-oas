import { BadPathError } from "../lib/error";
import { validatePath } from "../lib/url";

export class OpenApiRoute {
  private readonly uri: string;
  private readonly summary?: string;
  private readonly description?: string;

  /**
   * @param uri - Uri of the route, must be a string of the form: /foo/bar or can allow parameters such as /foo/{id} or /foo/:id
   * @param summary - An optional summary
   * @param description - An optional description
   */
  public constructor(uri: string, summary?: string, description?: string) {
    //TODO: Verify that this uri is in valid string form.
    if (!validatePath(uri)) {
      throw new BadPathError("Uri is of invalid form: ");
    }
    this.uri = uri;
    if (summary) {
      this.summary = summary;
    }
    if (description) {
      this.description = description;
    }
  }

  public addGet(): OpenApiRoute {
    return this;
  }
}
