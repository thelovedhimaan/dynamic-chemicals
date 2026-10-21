const app = require("../dist-server/server/index.js").default;

module.exports = function handler(request, response) {
  const url = new URL(request.url, "http://localhost");
  const route = url.searchParams.get("path") || "";
  url.searchParams.delete("path");
  const query = url.searchParams.toString();
  request.url = `/api/${route}${query ? `?${query}` : ""}`;
  return app(request, response);
};
