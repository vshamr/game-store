const jsonServer = require("json-server");
const db = require('./db.json');
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const SERVER_PORT = 3000;
server.use(jsonServer.bodyParser);
server.use(middlewares);

server.use((req, res, next) => {
  const body = req.body;

  if (req.method === "POST" && req.url === `/users`) {
    db.users.push(body);
    const users = db.users.filter(user => user.login === body.login);

    if(users.length > 1){
      res.status(500).send('Such user has already existed');
    }
  }
  next()
});

server.use(router);
server.listen(SERVER_PORT, () => {
  console.log("JSON Server is running");
});
