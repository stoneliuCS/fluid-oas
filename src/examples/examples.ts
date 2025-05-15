import { s } from "../";

// Strings
console.log(
  s
    .string()
    .description("Unique identifier")
    .default("1238971891792")
    .format("uuid")
    .pattern(
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
    )
    .maxLength(0)
    .minLength(9)
    .toJSON()
);
