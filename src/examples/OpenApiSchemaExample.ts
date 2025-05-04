import {
  OpenApiInteger,
  OpenApiObject,
  OpenApiString,
} from "../core/OpenApiSchema";

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
