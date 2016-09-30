/**
  * IntentDialog, matches and onDefault
  *
  **/

const { builder, bot } = require('./config.js')

bot.dialog('/', new builder.IntentDialog()
    .matches(/^hello/i, function (session) {
        session.send("Hi there!");
    })
    .onDefault(function (session) {
        session.send("I didn't understand. Say hello to me!");
    }));
