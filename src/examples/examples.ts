import {
  String,
  Object,
  Path,
  PathItem,
  Operation,
  Response,
  SecurityRequirement,
  RequestBody,
} from "../core";
import { MediaType } from "../core/common/OpenApiMedia";

const stringSchema = String().minLength(1).maxLength(100);

const userSchema = Object()
  .property("name")
  .with(stringSchema.description("Name of the user"))
  .property("username")
  .with(stringSchema.description("The username of the user"))
  .property("mode")
  .with(String().enum("BASIC", "ADVANCED", null))
  .property("profilePhoto")
  .with(String().nullable().description("A URL to the user's profile photo."));

const paths = Path()
  .endpoint("/healthcheck")
  .with(
    PathItem()
      .method("get")
      .with(
        Operation()
          .tags("HealthCheck")
          .summary("Health Check Endpoint")
          .description(
            "Pings the server to check the health of the current server"
          )
          .response("200")
          .with(
            Response("Success!")
              .content("application/json")
              .with(
                MediaType().schema(
                  Object().property("message").with(String().enum("OK"))
                )
              )
          )
      )
  )
  .beginGroup("/api/v1")
  .endpoint("/users")
  .with(
    PathItem()
      .method("post")
      .with(
        Operation()
          .tags("user")
          .summary("Creates a User")
          .description(
            "Creates a user from the specified body (with ID being the decoded ID from JWT)."
          )
          .security(SecurityRequirement().field("BearerAuth").with())
          .requestBody(
            RequestBody("application/json").with(MediaType().schema(userSchema))
          )
      )
  );

console.log(JSON.stringify(paths.toJSON(), undefined, 2));
