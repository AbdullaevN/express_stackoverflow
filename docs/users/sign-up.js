module.exports = {
  post: {
    tags: ["Users"],
    description: "signup user",
    operationId: "sign up User",
    parameters: [],
    requestBody: {
      description: "properties for sign up",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                description: "email",
                example: "ann@gmail.com",
              },
              password: {
                type: "string",
                minLength: 3,
                maxLength: 30,
                description: "password",
                example: "123456789",
              },
              firstName: {
                type: "string",
                description: "Name",
                example: "Ann",
              },
              lastName: {
                type: "string",
                description: "Last Name",
                example: "Hathaway",
              },
            },
            required: ["email", "password"],
          },
        },
      },
    },
    responses: {
      200: {
        description: "get-tokens",
        content: {
          "application/json": {
            schema: {
              $ref: "#/components/schemas/Token",
            },
          },
        },
      },
    },
  },
};
