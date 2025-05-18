import {
  withDescription,
  withSummary,
  withTitle,
  withVersion,
} from "../../common/common";
import { Base } from "./base";

const InfoBase = withVersion(withTitle(withDescription(withSummary(Base))));
class _OpenApiInfo extends InfoBase {}

export const Info = (title: string) => {
  return {
    withVersion: (version: string) => {
      return new _OpenApiInfo().title(title).version(version);
    },
  };
};
export type Info = _OpenApiInfo;
