import { OpenApiNumber } from "../core/schema";

const randomInteger = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const randomString = () => (Math.random() + 1).toString(36).substring(7);

const randomNumberArray = (min: number, max: number) => {
  return Array.from({ length: randomInteger(min, max) }, () =>
    randomInteger(min, max),
  );
};

const getRandomElement = (array: any[]) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

const LOWER_BOUND = 0;
const UPPER_BOUND = 1000000;

const generateOpenApiNumber = () => {
  const randomIntegerVal = () => randomInteger(LOWER_BOUND, UPPER_BOUND);
  const mappings: Map<string, () => void> = new Map();
  // Create a mapping of EXPECTED JSON PROPERTY NAMES AND METHODS THAT GENERATE THEM
  let numberSchema = OpenApiNumber;

  const defaultFn = () => {
    numberSchema = numberSchema.default(randomIntegerVal());
  };

  const enumFn = () => {
    const numbers = randomNumberArray(0, 10);
    numberSchema = numberSchema.enum(...numbers);
  };

  const nullableFn = () => {
    numberSchema = numberSchema.nullable();
  };

  const multipleFn = () => {
    numberSchema = numberSchema.multipleOf(randomIntegerVal());
  };

  const formatFn = () => {
    const formats = ["float", "double"];
    numberSchema = numberSchema.format(getRandomElement(formats));
  };

  const exclusiveMaxFn = () => {
    if (Object.hasOwn(numberSchema, "maximum")) {
      numberSchema = numberSchema.exclusiveMax();
    }
  };

  const exclusiveMinFn = () => {
    if (Object.hasOwn(numberSchema, "minimum")) {
      numberSchema = numberSchema.exclusiveMin();
    }
  };

  const maxFn = () => {
    numberSchema = numberSchema.max(
      randomInteger(UPPER_BOUND + 1, UPPER_BOUND + UPPER_BOUND),
    );
  };

  const minFn = () => {
    numberSchema = numberSchema.min(randomInteger(LOWER_BOUND, UPPER_BOUND));
  };

  const descriptionFn = () => {
    numberSchema = numberSchema.description(randomString());
  };

  mappings.set("default", defaultFn);
  mappings.set("enum", enumFn);
  mappings.set("nullable", nullableFn);
  mappings.set("multipleOf", multipleFn);
  mappings.set("format", formatFn);
  mappings.set("exclusiveMaximum", exclusiveMaxFn);
  mappings.set("exclusiveMinimum", exclusiveMinFn);
  mappings.set("minimum", minFn);
  mappings.set("maximum", maxFn);
  mappings.set("description", descriptionFn);

  mappings.forEach((fn) => {
    fn();
  });

  return numberSchema;
};

export const createRandomOpenApiNumberSchemas = (numToCreate: number) => {
  const nums = [];
  for (let i = 0; i < numToCreate; i++) {
    const schema = generateOpenApiNumber();
    nums.push(schema);
  }
  return nums;
};
