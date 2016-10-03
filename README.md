# Learning Microsoft Bot Builder Framework

[![Build Status](https://travis-ci.org/LasaleFamine/learn-ms-bot-builder.svg?branch=master)](https://travis-ci.org/lasalefamine/learn-ms-bot-builder)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/lasalefamine/learn-ms-bot-builder)

> Learning the new V3 Bot Framework by Microsoft

This is an experimental repo where I'm trying some methods and structures of the framework.

The promise is to write a Bot one time that can talk with different chat services, such as Facebook Messenger, Telegram, Skype, Slack etc.  

[I choose NodeJs](https://docs.botframework.com/en-us/faq/#im-a-developer-what-do-i-need-to-get-started) as language so you need to install the [latest current Nodejs](https://nodejs.org/en/download/current/) version on your machine.

## Installation

    $ git clone https://github.com/LasaleFamine/learn-ms-bot-builder && cd learn-ms-bot-builder
    $ npm install

## Play

    $ node [one-of-the-app-scripts]

E.g.

    $ node console/app-1

And start interact with the "console bot".


## Core concepts ([ref](https://docs.botframework.com/en-us/node/builder/guides/core-concepts/#navtitle))


### Storing data
---


``` js

let builder = require('botbuilder');

let connector = new builder.ConsoleConnector().listen();
let bot = new builder.UniversalBot(connector);
bot.dialog('/', [
    (session, args, next) => {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    (session, results) => {
        session.send('Hello %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    (session) => {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    (session, results) => {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

```

> The SDK provides different ways for persisting data:
- **userData** stores information globally for the user across all conversations.
- **conversationData** stores information globally for a single conversation. This data is visible to everyone within the conversation so care should be used to what’s stored there. It’s disabled by default and needs to be enabled using the bots persistConversationData setting.
- **privateConversationData** stores information globally for a single conversation but its private data for the current user. This data spans all dialogs so it’s useful for storing temporary state that you want cleaned up when the conversation ends.
- **dialogData** persists information for a single dialog instance. This is essential for storing temporary information in between the steps of a waterfall.

### Intents
---

``` js

let builder = require('botbuilder');

let connector = new builder.ConsoleConnector().listen();
let bot = new builder.UniversalBot(connector);

bot.dialog('/', new builder.IntentDialog()
    .matches(/^hello/i, (session) => {
        session.send("Hi there!");
    })
    .onDefault( (session) => {
        session.send("I didn't understand. Say hello to me!");
    }));

```

The key features of a great bot is understand the real intent of the user.

> The **`IntentDialog`** class lets you determine the users intent using a combination of two techniques. You can pass a **regular expression** to `IntentDialog.matches()` the users message text will be compared against that RegEx. If it matches then the handler associated with that expression will be triggered.  
[...]  
Regular expressions are nice but for even more powerful **intent recognition you can leverage machine learning via LUIS by plugging a LuisRecognizer** into your `IntentDialog`.


### Chat Connector and online bot
---

Well, switch from the ConsoleConnector to the ChatConnector is simple as hell.

First you need to configure the `connector`:

``` js

const connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

```

I'm using [dotenv](https://github.com/motdotla/dotenv) for managing my environment variables.

After that you need to expose your application. For this MS use [restify](https://github.com/restify/node-restify) and I appreciate the advice.

So simply choose the main root for your bot:

``` js

const restify = require('restify')

const server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 8080, () => {
   console.log(`${server.name} listening to ${server.url}`)
})

server.post('/api/messages', connector.listen())

```

Now you are ready to publish your simple NodeJs Bot.  
You can use:  

**For testing**  
- [Microsoft Bot Emulator](https://docs.botframework.com/en-us/tools/bot-framework-emulator/) (only Windows)
- [ngrok](https://ngrok.com/)  

**Deploy**  
- [Heroku](https://www.heroku.com/)
- [now](https://zeit.co/now)
- everything will make your app available to the world!


Almost ready.
Last step is to register the bot and get the ***appId*** and ***appSecret*** to update our `.env`.

- [Register an MS bot (documentation)](https://docs.botframework.com/en-us/csharp/builder/sdkreference/gettingstarted.html#registering)

## :construction: `chatConnector/`

Inside the `chatConnector` folder there is my first attempt to implement some functionalities and make it work like a ***cross-apps*** bot.
I'm currently working on it.

### Dependencies
  - [restify]()
  - [got](https://github.com/sindresorhus/got)
  - [moment](http://momentjs.com/)
  - [dotenv](https://github.com/motdotla/dotenv/) [DEV]

## Tests

> [xo](https://github.com/sindresorhus/xo) and [ava](https://github.com/avajs/ava)

    $ npm test

## References

- [Microsoft Bot Framework](https://dev.botframework.com/)

### TODO
- More unit tests
