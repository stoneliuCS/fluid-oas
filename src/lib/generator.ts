import { OpenApiNumber } from "../core/OpenApiSchema";

export function randomInteger(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomString = () => (Math.random() + 1).toString(36).substring(7);

export const generateOpenApiNumber = () => {
  let number = OpenApiNumber;
  const randomIntegerVal = () => randomInteger(0, 10000);
  const functionMappings = {
    minimum: () => {
      number = number.min(randomIntegerVal());
    },
    default: () => {
      number = number.default(randomIntegerVal());
    },
    nullable: () => {
      number = number.nullable();
    },
    exampleFn: () => {
      number = number.example(randomIntegerVal());
    },
    descriptionFn: () => {
      number = number.description(randomString());
    },
  };

  for (const fn of Object.values(functionMappings)) {
    fn();
  }

  return number;
};
