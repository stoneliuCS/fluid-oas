import { withMaxItems, withMinItems } from "../../common/common";
import { Base, SchemaBase } from "../common/base";

const ArrayBase = withMaxItems(withMinItems(SchemaBase));

class _OpenApiArray extends ArrayBase {}
