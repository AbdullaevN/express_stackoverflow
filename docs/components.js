module.exports = {
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "number",
            description: "Uniq id",
            example: "1",
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
          email: {
            type: "string",
            description: "email",
            example: "ann@gmail.com",
          },
          password: {
            type: "string",
            description: "password",
            example: "123456789",
          },
        },
      },

      Problem: {
        type: "object",
        properties: {
          id: {
            type: "number",
            example: 1,
          },
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          tag: {
            type: "string",
            example: "Java",
            description:
              "Tag is enum, allowed only (Java, Javascript, Python, Kotlin)",
          },
          replies: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Reply",
            },
          },
          pictures: {
            type: "object",
            properties: {
              id: {
                type: "number",
                description: "picture Id",
                example: 1,
              },
              image: {
                type: "string",
                description: "name of the image",
                example: "6d7b903f-082d-42bd-8b57-3a375fc87b7f.jpeg",
              },
            },
          },
        },
      },

      Reply: {
        type: "object",
        properties: {
          userId: {
            type: "number",
            description: "author of reply",
            example: 1,
          },
          problemId: {
            type: "number",
            description: "id of related problem",
            example: 1,
          },
          text: {
            type: "string",
            description: "body of reply",
            example: "this is reply to problem",
          },
        },
      },

      Token: {
        type: "object",
        properties: {
          accessToken: {
            type: "string",
            description: "this is access token",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
          },
          refreshToken: {
            type: "string",
            description: "this is refresh token",
            example:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
          },
        },
      },
    },
  },
};
