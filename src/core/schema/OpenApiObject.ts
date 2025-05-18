import { withDefault, withProperty } from "../../common/common";
import { SchemaBase } from "../common/base";

const ObjectBase = withProperty(withDefault(SchemaBase)<Object>());

class _OpenApiObject extends ObjectBase {

  toJSON(): unknown {
    const json = super.toJSON();
    json.type = "object";
    return json;
  }
}

export type Object = _OpenApiObject;
export const Object = () => new _OpenApiObject();
