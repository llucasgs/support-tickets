import { routes } from "../routs/index.js";

export function routHandler(request, response) {
  const route = routes.find((route) => {
    return route.method === request.method && route.path === request.url;
  });

  if (route) {
    return route.controller(request, response);
  }

  return response.writeHead(404).end("not found");
}
