import fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { connectDB } from './config/database';
import { registerQueryProcessors } from './routes';

declare module 'fastify' {
  interface FastifyInstance {
    db: any;
  }
}

const server = fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

// Register plugins
server.register(cors);
server.register(swagger, {
  openapi: {
    info: {
      title: 'Query Processor API',
      version: '1.0.0',
    },
  },
  hideUntagged: true,
});

// Register routes
server.register(registerQueryProcessors, { prefix: '/api/process' });

// Start server
const start = async () => {
  try {
    const db = await connectDB();
    // Add database instance to fastify for access in routes
    server.decorate('db', db);
    await server.listen({ port: 3000, host: '0.0.0.0' });
    console.log('Server running on port 3000');
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();