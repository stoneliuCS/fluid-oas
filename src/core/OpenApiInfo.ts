import { deepFreeze } from "../lib/freeze";

class OpenApiLicense {
  private readonly fn: (contact: OpenApiLicense) => OpenApiInfo;
  private readonly name: string;
  private readonly identifier?: string;
  private readonly url?: string;

  public constructor(
    fn: (contact: OpenApiLicense) => OpenApiInfo,
    name: string,
    identifier?: string,
    url?: string,
  ) {
    this.fn = fn;
    this.name = name;
    this.identifier = identifier;
    this.url = url;
    deepFreeze(this);
  }

  public getJSON() {
    const json = {};
    if (this.name) {
      Object.defineProperty(json, "name", { value: this.name });
    }

    if (this.identifier) {
      Object.defineProperty(json, "identifier", { value: this.identifier });
    }

    if (this.url) {
      Object.defineProperty(json, "url", { value: this.url });
    }
    return json;
  }

  public addIdentifier(identifier: string) {
    return new OpenApiLicense(this.fn, this.name, identifier, this.url);
  }

  public addUrl(url: string) {
    return new OpenApiLicense(this.fn, this.name, this.identifier, url);
  }

  public endLicense() {
    return this.fn(this);
  }
}

class OpenApiContact {
  private readonly fn: (contact: OpenApiContact) => OpenApiInfo;
  private readonly name?: string;
  private readonly url?: string;
  private readonly email?: string;

  public constructor(
    fn: (contact: OpenApiContact) => OpenApiInfo,
    name?: string,
    url?: string,
    email?: string,
  ) {
    this.fn = fn;
    this.name = name;
    this.url = url;
    this.email = email;
    deepFreeze(this);
  }

  public addName(name: string) {
    return new OpenApiContact(this.fn, name, this.url, this.email);
  }

  public addUrl(url: string) {
    return new OpenApiContact(this.fn, this.name, url, this.email);
  }

  public addEmail(email: string) {
    return new OpenApiContact(this.fn, this.name, this.url, email);
  }

  public getJSON() {
    const json = {};
    if (this.name) {
      Object.defineProperty(json, "name", { value: this.name });
    }

    if (this.url) {
      Object.defineProperty(json, "url", { value: this.url });
    }

    if (this.email) {
      Object.defineProperty(json, "email", { value: this.email });
    }
    return json;
  }

  public endContact() {
    return this.fn(this);
  }
}

export class OpenApiInfo {
  private readonly title: string;
  private readonly version: string;
  private readonly summary?: string;
  private readonly description?: string;
  private readonly termsOfService?: string;
  private readonly contact?: OpenApiContact;
  private readonly license?: OpenApiLicense;

  public static create(title: string, version: string) {
    return new OpenApiInfo(title, version);
  }

  private constructor(
    title: string,
    version: string,
    summary?: string,
    description?: string,
    termsOfService?: string,
    contact?: OpenApiContact,
    license?: OpenApiLicense,
  ) {
    this.title = title;
    this.version = version;
    this.summary = summary;
    this.description = description;
    this.termsOfService = termsOfService;
    this.contact = contact;
    this.license = license;
  }

  public getJSON() {
    const json = {};
    Object.defineProperty(json, "title", { value: this.title });
    if (this.summary) {
      Object.defineProperty(json, "summary", { value: this.summary });
    }
    if (this.description) {
      Object.defineProperty(json, "description", { value: this.description });
    }
    if (this.termsOfService) {
      Object.defineProperty(json, "termsOfService", {
        value: this.termsOfService,
      });
    }
    if (this.contact) {
      Object.defineProperty(json, "contact", {
        value: this.contact.getJSON(),
      });
    }
    if (this.license) {
      Object.defineProperty(json, "license", {
        value: this.license.getJSON(),
      });
    }
    Object.defineProperty(json, "version", { value: this.version });
    return json;
  }

  public addContact() {
    const _fn = (contact: OpenApiContact) => {
      return new OpenApiInfo(
        this.title,
        this.version,
        this.summary,
        this.description,
        this.termsOfService,
        contact,
        this.license,
      );
    };
    return new OpenApiContact(_fn);
  }

  public addLicense(name: string) {
    const _fn = (license: OpenApiLicense) => {
      return new OpenApiInfo(
        this.title,
        this.version,
        this.summary,
        this.description,
        this.termsOfService,
        this.contact,
        license,
      );
    };
    return new OpenApiLicense(_fn, name);
  }

  public addTermsOfService(service: string) {
    return new OpenApiInfo(
      this.title,
      this.version,
      this.summary,
      this.description,
      service,
      this.contact,
      this.license,
    );
  }

  public addSummary(summary: string) {
    return new OpenApiInfo(
      this.title,
      this.version,
      summary,
      this.description,
      this.termsOfService,
      this.contact,
      this.license,
    );
  }

  public addDescription(description: string) {
    return new OpenApiInfo(
      this.title,
      this.version,
      this.summary,
      description,
      this.termsOfService,
      this.contact,
      this.license,
    );
  }
}
