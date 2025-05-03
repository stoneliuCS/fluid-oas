import { OpenApiObject, OpenApiString } from "../core/OpenApiSchema";

const userSchema = OpenApiObject.description("A representation of a User.")
  .property("name", OpenApiString.description("Name of the User."))
  .property("username", OpenApiString.description("Display name of the user."))
  .property(
    "id",
    OpenApiString.format("uuid").example(
      "5e91507e-5630-4efd-9fd4-799178870b10",
    ),
  )
  .property("mode", OpenApiString.enum("BASIC", "ADVANCED", null))
  .property("profilePhoto", OpenApiString.description("Url.").nullable())
  .property("bio", OpenApiString.description("Bio for the user.").nullable())
  .required("name", "username", "id");
