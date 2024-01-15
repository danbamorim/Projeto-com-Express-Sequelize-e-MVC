const User = require('../models/User')

const bcrypt = require('bcryptjs')

module.exports = class UserController {
  static login(req, res) {
    res.render('auth/login')
  }

  static async loginPost(req, res) {  // req e res são objetos que representam a solicitação (request) HTTP recebida pelo servidor e a resposta (response) HTTP que será enviada de volta para o cliente, respectivamente. Esses objetos são geralmente usados ao lidar com solicitações HTTP em um servidor web, como aquele construído com o framework Express.js.
    const { email, password } = req.body

    // find user
    const user = await User.findOne({ where: { email: email } })

    if (!user) {

      req.flash('message', 'Usuário não encontrado')
      res.render('auth/login')
      return
    }

    // compare password
    const passwordMatch = bcrypt.compareSync(password, user.password)

    if (!passwordMatch) {
      res.render('auth/login')
      req.flash('message', 'Senha inválida!',)


      return
    }

    // inicializar a entrada
    req.session.userid = user.id

    req.flash('message', 'Entrada Liberada')

    req.session.save(() => {
      res.redirect('/')
    })
  }

  static register(req, res) {
    res.render('auth/register')
  }

  static async registerPost(req, res) {
    const { name, email, password, confirmpassword } = req.body

    // passwords match validation
    if (password != confirmpassword) {
      req.flash('message', 'As senhas não conferem, tente novamente!')
      res.render('auth/register')

      return
    }

    // email validation
    const checkIfUserExists = await User.findOne({ where: { email: email } })

    if (checkIfUserExists) {
      req.flash('message', 'O e-mail já está sendo utilizado') //req.flash é uma função usada em muitos frameworks web, incluindo o Express.js, para armazenar mensagens flash temporárias. Mensagens flash são mensagens que são exibidas uma vez para o usuário após uma redireção. Elas são úteis para enviar feedback ou notificações breves entre as solicitações.
      res.render('auth/register')

      return
    }

    const salt = bcrypt.genSaltSync(10) //bcrypt é uma função de hash de senhas que utiliza um algoritmo de hashing unidirecional projetado para ser lento e resistente a ataques de força bruta. Essa biblioteca é comumente usada para armazenar senhas de forma segura em aplicações web.
    const hashedPassword = bcrypt.hashSync(password, salt)

    const user = {
      name,
      email,
      password: hashedPassword, // hashedPassword geralmente se refere a uma senha que foi processada por uma função de hash, como o bcrypt, antes de ser armazenada em um banco de dados
    }

    User.create(user)
      .then((user) => {
        // initialize session
        req.session.userid = user.id

        // console.log('salvou dado')
        // console.log(req.session.userid)

        req.session.userid = user.id

        req.flash('message', 'Cadastro realizado com sucesso!')

        req.session.save(() => {
          res.redirect('/')
        })
      })
      .catch((err) => console.log(err))
  }

  static logout(req, res) {
    req.session.destroy()
    res.redirect('/login')
  } // funcao para o usuario sair 
}



// Controller (Controlador): Representa a camada que lida com a lógica de controle do aplicativo. Os controllers recebem as entradas do usuário, interagem com o modelo para obter ou modificar dados e atualizam a visão para refletir essas mudanças. Eles desempenham um papel crucial na coordenação entre o modelo e a visão.