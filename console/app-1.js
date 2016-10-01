/**
  * userData, dialogData, waterfall
  *
  **/

const {builder, bot} = require('./config.js')

bot.dialog('/', [
  session => {
    session.beginDialog('/ensureProfile', session.userData.profile)
  },
  (session, results) => {
    session.userData.profile = results.response
    session.send('Hello %(name)s! I love %(company)s!', session.userData.profile)
  }
])

bot.dialog('/ensureProfile', [
  (session, args, next) => {
    session.dialogData.profile = args || {}
    if (session.dialogData.profile.name) {
      next()
    } else {
      builder.Prompts.text(session, 'What\'s your name?')
    }
  },
  (session, results, next) => {
    if (results.response) {
      session.dialogData.profile.name = results.response
    }
    if (!session.dialogData.profile.company) {
      next()
    } else {
      builder.Prompts.text(session, 'What company do you work for?')
    }
  },
  (session, results) => {
    if (results.response) {
      session.dialogData.profile.company = results.response
    }
    session.endDialogWithResult({
      response: session.dialogData.profile
    })
  }
])
