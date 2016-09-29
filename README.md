# Learning Microsoft Bot Builder Framework

> Learning the new V3 Bot Framework by Microsoft

This is an experimental repo where I'm trying some methods and structures of the framework.

The promise is to write a Bot one time that can talk with different chat services, such as Facebook Messenger, Telegram, Skype, Slack etc.

[I choose NodeJs](https://docs.botframework.com/en-us/faq/#im-a-developer-what-do-i-need-to-get-started) as language so you need to install the [latest current Nodejs](https://nodejs.org/en/download/current/) version on your machine.

## Installation

    $ git clone https://github.com/LasaleFamine/learn-ms-bot-builder
    $ npm install

## Play

    $ node [one-of-the-app-scripts]

E.g.

    $ node console/app-1

And start interact with the "console bot".

## Structure

Right now there are present only some tests with the `ConsoleConnector`.  
The really simple configuration for all the script within the `console` folder is the `config.js` file.

## References

- [Microsoft Bot Framework](https://dev.botframework.com/)
