const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const FileStore = require("session-file-store")(session);
const flash = require("express-flash");

//express: Framework web para Node.js.
//exphbs: Engine de template Handlebars para Express.js.
//session: Middleware para gerenciar sessões de usuário.
//session-file-store: Armazenamento de sessão em arquivos.
//express-flash: Middleware para mensagens flash.

const app = express(); //Cria uma instância do aplicativo Express.

const conn = require("./db/conn");

// Models

const Tought = require("./models/Tought");

// routes
const toughtsRoutes = require("./routes/toughtsRoutes");
const authRoutes = require("./routes/authRoutes");
const ToughController = require("./controllers/ToughtController");

app.engine('handlebars', exphbs.engine());
app.set("view engine", "handlebars");

app.use(
  express.urlencoded({
    extended: true,
  }) // Configura o middleware para análise de dados enviados via formulários (express.urlencoded) e JSON (express.json).
);

app.use(express.json());

//session middleware
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }), //esse trecho de código configura o middleware de sessão para a aplicação Express.js, definindo várias opções relacionadas ao nome do cookie, segredo, armazenamento em arquivos, configurações do cookie de sessão, entre outros. Esse middleware é essencial quando você precisa lidar com autenticação de usuário e deseja manter o estado da sessão entre as solicitações HTTP.
)

// flash messages
app.use(flash());

app.use(express.static("public"));

// set session to res
app.use((req, res, next) => {
  // console.log(req.session)
  console.log(req.session.userid);

  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});

app.use("/toughts", toughtsRoutes);
app.use("/", authRoutes);

app.get("/", ToughController.showToughts);

conn //esse trecho de código sincroniza os modelos Sequelize com o banco de dados e, se essa operação for bem-sucedida, inicia o servidor Express na porta 3000
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));


  // index.js em um projeto Node.js é frequentemente utilizado como um ponto central ou ponto de entrada, seja para agrupar módulos, configurar o aplicativo, organizar rotas ou fornecer uma forma mais concisa de importar funcionalidades de um diretório.




