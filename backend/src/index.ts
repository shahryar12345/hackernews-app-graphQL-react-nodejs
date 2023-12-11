import 'graphql-import-node';
import fastify from "fastify";
import { getGraphQLParameters, processRequest, Request, renderGraphiQL, shouldRenderGraphiQL, sendResult } from "graphql-helix";
import { schema } from "./schema";
import { contextFactory } from "./context";

async function main() {
  const server = fastify();

  server.route({
    method: ["POST", "GET"],
    url: "/graphql",
    handler: async (req, reply) => {
      const request: Request = {
        headers: req.headers,
        method: req.method,
        query: req.query,
        body: req.body,
      };

      if (shouldRenderGraphiQL(request)) {
        reply.header("Content-Type", "text/html");
        reply.send(
          renderGraphiQL({
            endpoint: "/graphql",
          })
        );

        return;
      }

      const { operationName, query, variables } = getGraphQLParameters(request);

      const result = await processRequest({
        request,
        schema,
        operationName,
        contextFactory: () => contextFactory(req),
        query,
        variables,
      });

      sendResult(result, reply.raw);
    }
  });

  server.listen(4000, "0.0.0.0", () => {
    console.log(`GraphQL API is running on http://localhost:4000/graphql`);
  });
}

main();









// import 'graphql-import-node';
// import { execute, parse } from "graphql";
// import { schema } from "./schema";

// async function main() {
//   const myQuery = parse(`query { info }`);

//   const result = await execute({
//     schema,
//     document: myQuery,
//   });

//   console.log(result);
// }

// main();

// import "graphql-import-node";
// import fastify from "fastify";

// async function main() {
//   const server = fastify();

//   server.get("/", (req, reply) => {
//     reply.send({ test: true });
//   });

//   server.listen(3000, "0.0.0.0", () => {
//     console.log(`Server is running on http://localhost:3000/`);
//   });
// }

// main();


// import 'graphql-import-node';
// import fastify from "fastify";
// import { getGraphQLParameters, processRequest, Request, sendResult } from "graphql-helix";
// import { schema } from "./schema";

// async function main() {
//   const server = fastify();

//   server.route({
//     method: "POST",
//     url: "/graphql",
//     handler: async (req, reply) => {
//       const request: Request = {
//         headers: req.headers,
//         method: req.method,
//         query: req.query,
//         body: req.body,
//       };

//       const { operationName, query, variables } = getGraphQLParameters(request);

//       const result = await processRequest({
//         request,
//         schema,
//         operationName,
//         query,
//         variables,
//       });

//       sendResult(result, reply.raw);
//     }
//   });

//   server.listen(3000, "0.0.0.0", () => {
//     console.log(`Server is running on http://localhost:3000/`);
//   });
// }

// main();