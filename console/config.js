'use strict'

const builder = require('botbuilder')

const connector = new builder.ConsoleConnector().listen()
const bot = new builder.UniversalBot(connector)

module.exports = { builder, bot }
