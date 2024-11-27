import fastify from "fastify";
import cors from "@fastify/cors";
import swagger from "@fastify/swagger";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { connectDB } from "./config/database";
import { registerQueryProcessors } from "./routes";

declare module "fastify" {
  interface FastifyInstance {
    db: any;
  }
}

const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

server.register(require("@fastify/mongodb"), {
  forceClose: true,
  url: "mongodb://127.0.0.1:27017/school?directConnection=true",
});

// Register plugins
server.register(cors);
server.register(swagger, {
  openapi: {
    info: {
      title: "Query Processor API",
      version: "1.0.0",
    },
  },
  hideUntagged: true,
});

// Register routes
server.register(registerQueryProcessors, { prefix: "/api/process" });

// Start server
const start = async () => {
  try {
    const db = server.db;
    console.log({ db });
    await server.listen({ port: 3003, host: "0.0.0.0" });
    console.log("Server running on port 3000");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
