import {
  withContact,
  withDescription,
  withLicense,
  withSummary,
  withTermsOfService,
  withTitle,
  withVersion,
} from "../../common/common";
import { Base } from "./base";

const InfoBase = withLicense(
  withContact(
    withTermsOfService(
      withVersion(withTitle(withDescription(withSummary(Base))))
    )
  )
);
class _OpenApiInfo extends InfoBase {}

export function Info(title: string) {
  return {
    withVersion: (version: string) => {
      return new _OpenApiInfo().title(title).version(version);
    },
  };
}
export type OpenApiInfo = _OpenApiInfo;
