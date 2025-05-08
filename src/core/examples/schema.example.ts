import { CreateOpenApiString } from "../schema/OpenApiString";

// Example of a SSN in OpenApi String
const ssn = CreateOpenApiString().pattern(/^\d{3}-\d{2}-\d{4}$/);
