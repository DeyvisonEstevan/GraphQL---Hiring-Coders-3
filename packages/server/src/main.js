import express from "express";
import { ApolloServer } from "apollo-server-express";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";


const app = express();

async function startApolloServer() {
  const server = new ApolloServer({
    
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
    typeDefs,
    resolvers,
  });

  server.start().then(() => {
    server.applyMiddleware({
        app,
        cors: {
            origin: '*',
        },
        bodyParserConfig: true,
    })
});


}

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 8000;
const HOSTNAME = process.env.HOSTNAME || "127.0.0.1";

app.listen(PORT, HOSTNAME, () => {
  console.log(`Server is listening at http://${HOSTNAME}:${PORT}.`);
});

// server.get('/status', (_, response => {
//   response.send({
//     status: 'Okay',
//   })
// }));

// server
// .options('/authenticate', enableCors)
// .post('/authenticate', cors(enableCors), express.json(), (request, response) => {
//   console.log(
//     'E-mail', request.body.email,
//     'Senha', request.body.password
//     );
//     response.send({Okay: true});
// });

// await server.start();

  
  // server.applyMiddleware({
  //   app,
  //   cors: {
  //     origin: 'http://localhost:3000',
  //   },
  //   bodyParserConfig: true,
  // });


