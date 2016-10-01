/**
  * IntentDialog, matches and onDefault
  *
  **/

const {builder, bot} = require('./config.js')

bot.dialog('/', new builder.IntentDialog()
  .matches(/^hello/i, session => {
    session.send('Hi there!')
  })
  .onDefault(session => {
    session.send('I didn\'t understand. Say hello to me!')
  }))
