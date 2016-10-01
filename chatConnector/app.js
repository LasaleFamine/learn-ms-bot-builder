const {
  builder,
  bot
} = require('./config.js')

const {user} = require('./models.js')
const {getGithubUser} = require('./utils.js')

//  =========================================================
//  Bots Dialogs
//  =========================================================

const intents = new builder.IntentDialog()
bot.dialog('/', intents)

/**
  * Change name intents
  */
intents.matches(/change my name/i, [
  session => {
    session.beginDialog('/profile')
  },
  session => {
    session.send(`Ok... Changed your name to ${session.userData.name}`)
  }
])

/**
  * Github intents
  */
intents.matches(/github user/i, [
  session => {
    session.beginDialog('/github')
  },
  (session, results) => {
    // Get data from github
    getGithubUser(results.response).then(res => {
      const userData = user(res)
      const msg = res.error ? res.message : userData
      session.send(msg)
    })
  }
])

/**
  * On default intent
  */
intents.onDefault([
  (session, args, next) => {
    if (session.userData.name) {
      next()
    } else {
      session.beginDialog('/profile')
    }
  },
  session => {
    session.send(`Hello ${session.userData.name}!
  I can:
    - search a Github user
    - change and persit your name :D
    `)
  }
])

// --- Dialogs --- //
bot.dialog('/profile', [
  session => {
    builder.Prompts.text(session, 'Hi! What is your name?')
  },
  (session, results) => {
    session.userData.name = results.response
    session.endDialog()
  }
])

bot.dialog('/github', [
  session => {
    builder.Prompts.text(session, 'Username please!')
  },
  (session, results) => {
    session.dialogData.githubUser = results.response
    session.endDialogWithResult({
      response: session.dialogData.githubUser
    })
  }
])
