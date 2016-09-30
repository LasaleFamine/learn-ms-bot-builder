/**
  * Dialog, beginDialog and Prompts
  *
  **/

const { builder, bot } = require('./config.js')

bot.dialog('/', [
    (session) => {
        session.beginDialog('/askName')
    },
    (session, results) => {
        session.send('Hello %s!', results.response)
    }
])

bot.dialog('/askName', [
    (session) => {
        builder.Prompts.text(session, 'Hi! What is your name?')
    }
    /** This belowe will be execute silently */
    // (session, results) {
    //     session.endDialogWithResult(results);
    // }
])
