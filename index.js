const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const session = require('express-session')
const conn = require('./db/conn')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

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

app.use(flash())
app.use(express.static('public'))


const ToughtsController = require('./controllers/ToughtsController')


app.get('/', ToughtsController.showToughts)

const toughtsRoutes = require('./routes/toughtsRoutes')
const ToughtController = require('/controllers/ToughtControllers')



app.use((req,res,next)=> {
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})



const Tought = require('./models/Tought')
const User = require('./models/User')



app.use('/toughts', toughtsRoutes)

conn.sync().then(() => { 
    app.listen(3006)
}).catch((error) => console.log(error))