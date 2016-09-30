/**
  * SimpleDialog
  *
  **/

const { builder, bot } = require('./config.js')

bot.dialog('/', new builder.SimpleDialog(function (session, results) {
    if (results && results.response) {
        session.send(results.response.toString('base64'));
    }
    builder.Prompts.text(session, "What would you like to base64 encode?");
}));
