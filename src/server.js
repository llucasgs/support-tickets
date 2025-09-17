import http from "node:http";

/* Essa é uma forma de criar um servidor.
const server = http.createServer((request, response) => {
  // Aqui executaremos a função.
});
server.listen(3333);
*/

// Há uma outra forma mais resumida abaixo.

function listener(request, response) {
  // Função a ser executada.
}

http.createServer(listener).listen(3333);
