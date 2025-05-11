import type { GConstructor } from "./constructor.ts";

export function withAllowReserved<TBase extends GConstructor>(Base: TBase) {
    return class extends Base {
        private _allowReserved?: boolean
        allowReserved() {
            const copy: this = Object.create(this);
            copy._allowReserved = true;
            return copy;
        }
        toJSON(): unknown {
            const json = super.toJSON();
            if (this._allowReserved) {
                Object.defineProperty(json, "allowReserved", { value: this._allowReserved, enumerable: true });
            }
            return json;
        }
    }
}

export function withDeprecated<TBase extends GConstructor>(Base: TBase) {
    return class extends Base {
        private _deprecated?: boolean
        deprecated() {
            const copy: this = Object.create(this);
            copy._deprecated = true;
            return copy;
        }
        toJSON(): unknown {
            const json = super.toJSON();
            if (this._deprecated) {
                Object.defineProperty(json, "deprecated", { value: this._deprecated, enumerable: true });
            }
            return json;
        }
    }
}

export function withRequired<TBase extends GConstructor>(Base: TBase) {
    return class extends Base {
        private _required?: boolean
        required() {
            const copy: this = Object.create(this);
            copy._required = true;
            return copy;
        }
        toJSON(): unknown {
            const json = super.toJSON();
            if (this._required) {
                Object.defineProperty(json, "required", { value: this._required, enumerable: true });
            }
            return json;
        }
    }
}
