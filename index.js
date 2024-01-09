const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const session = require('express-session')
const conn = require('./db/conn')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

//template engine :
// esse código configura o Express para usar o Handlebars como mecanismo de template para renderizar arquivos com extensão .handlebars, permitindo que o aplicativo renderize e exiba esses modelos usando o Handlebars como motor de renderização.

app.engine('handlebars', exphbs.engine());

app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

//session middleware
// middleware de sessão permite que você armazene dados do usuário de maneira temporária ou persistente durante várias solicitações HTTP, o que é útil para autenticação, armazenamento de carrinho de compras, preferências do usuário, entre outros cenários.

app.use(session({
    name: "session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function () {},
        path: require('path').join(require('os').tmpdir(), 'session'),
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httponly: true
    }
}))

//flash messages
//Isso é útil para transmitir mensagens entre diferentes requisições e respostas, principalmente após redirecionamentos, fornecendo feedback ao usuário sobre ações realizadas no servidor.
app.use(flash())

// public path
// É uma maneira conveniente de fornecer acesso a arquivos estáticos, como folhas de estilo, scripts JavaScript e imagens, sem a necessidade de configurar manualmente rotas para cada um deles.
app.use(express.static('public'))

//Tought

const ToughtController = require('./controllers/ToughtController')
const toughtsRoutes = require('./routes/toughtsRoutes')
app.get('/', ToughtController.showToughts)
app.use('/toughts', toughtsRoutes)


//set session to res
// mpre que esse middleware for chamado (normalmente em todas as requisições), se houver um userid na sessão, as informações da sessão serão disponibilizadas para o template/renderização de forma local, acessíveis através de res.locals.session nas views do Express.
app.use((req,res,next)=> {
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})


//models
const Tought = require('./models/Tought')
const User = require('./models/User')


//Import Rotas
const authRoutes = require('./routes/authRoutes')

// Rotas
app.use('/' , authRoutes)

conn.sync().then(() => { 
    app.listen(3000)
}).catch((error) => console.log(error))