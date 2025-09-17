import http from "node:http";
import { jsonHandler } from "./middlewares/jsonHandler.js";

/* Essa é uma forma de criar um servidor.
const server = http.createServer((request, response) => {
  // Aqui executaremos a função.
});
server.listen(3333);
*/

// Há uma outra forma mais resumida abaixo.

async function listener(request, response) {
  await jsonHandler(request, response);
}

http.createServer(listener).listen(3333);
