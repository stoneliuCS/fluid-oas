import {
  withContact,
  withDescription,
  withLicense,
  withSummary,
  withTermsOfService,
  withTitle,
  withVersion,
} from "../common";
import { Base, type BaseInterface } from "./base";
import type { OpenApiContact } from "./OpenApiContact";
import type { OpenApiLicense } from "./OpenApiLicense";

const InfoBase = withLicense(
  withContact(
    withTermsOfService(
      withVersion(withTitle(withDescription(withSummary(Base))))
    )
  )
);

export interface OpenApiInfo extends BaseInterface {
  addDescription(description: string): this;
  addSummary(summary: string): this;
  addTitle(title: string): this;
  addVersion(version: string): this;
  addTermsOfService(termsOfService: string): this;
  addContact(contact: OpenApiContact): this;
  addLicense(license: OpenApiLicense): this;
}

class _OpenApiInfo extends InfoBase implements OpenApiInfo {}

export function Info(title: string, version: string): OpenApiInfo {
  return new _OpenApiInfo().addTitle(title).addVersion(version);
}
