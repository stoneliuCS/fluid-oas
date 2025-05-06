import {
  OpenApiNumber,
  OpenApiInteger,
  OpenApiString,
  OpenApiBoolean,
  OpenApiObject,
} from "../core/schema";

// Define a number schema
const numberSchema = OpenApiNumber.description("I am a OpenAPI Number!")
  .default(1.5)
  .format("double")
  .min(0.5)
  .max(2.5)
  .exclusiveMin();

// Define a integer schema
const integerSchema = OpenApiInteger.description("I am a OpenAPI Integer!")
  .default(2)
  .format("int64")
  .min(0)
  .max(99)
  .exclusiveMax();

// Define a string schema
const uuidSchema = OpenApiString.description("Unique identifier")
  .format("uuid")
  .pattern(
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/,
  )
  .example("643ad75f-0514-49f1-a68e-18a87ba017f0");

// Define a boolean schema
const booleanSchema = OpenApiBoolean.description("I am a OpenAPI boolean!")
  .default(false)
  .nullable();

const schema = OpenApiObject.description("Blah Blah blahajkshdjhaksjjksadhaks")
  .property("name", OpenApiString.min(1).description("Display name of user"))
  .property(
    "username",
    OpenApiString.min(1).description("The username of the user."),
  )
  .property(
    "id",
    OpenApiString.format("uuid")
      .example("5e91507e-5630-4efd-9fd4-799178870b10")
      .description("Unique identifier for the user."),
  )
  .property(
    "mode",
    OpenApiString.enum("BASIC", "ADVANCED", null).description(
      "Mode for the user.",
    ),
  )
  .property(
    "profilePhoto",
    OpenApiString.nullable().description("A URL to the users profile photo."),
  )
  .property(
    "bio",
    OpenApiString.nullable().description("A bio for the users profile."),
  )
  .property(
    "birthday",
    OpenApiString.nullable()
      .format("date")
      .description("Birthday of the user."),
  )
  .property(
    "timezone",
    OpenApiString.nullable().description("Timezone for the user."),
  )
  .property(
    "postCount",
    OpenApiInteger.nullable().description("Number of posts for this user."),
  )
  .required("username", "mode");

const userSchema = OpenApiObject.properties({
  name: OpenApiString.min(1).description("Display name of the user."),
  username: OpenApiString.min(1).description("The username of the user."),
  id: OpenApiString.format("uuid")
    .example("5e91507e-5630-4efd-9fd4-799178870b10")
    .description("Unique identifier for the user."),
  mode: OpenApiString.enum("BASIC", "ADVANCED", null).description(
    "Mode for the user.",
  ),
  profilePhoto: OpenApiString.nullable().description(
    "A URL to the users profile photo.",
  ),
  bio: OpenApiString.nullable().description("A bio for the users profile."),
  birthday: OpenApiString.nullable()
    .format("date")
    .description("Birthday of the user."),
  timezone: OpenApiString.nullable().description("Timezone for the user."),
  postCount: OpenApiInteger.nullable().description(
    "Number of posts for this user.",
  ),
}).required("username", "mode");

console.log(userSchema.toJSON());
