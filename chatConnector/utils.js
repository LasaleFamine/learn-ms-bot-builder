'use strict'

const got = require('got')

const getGithubUser = user => {
  return got(`https://api.github.com/users/${user}`, {
    json: true
  })
  .then(response => {
    return response.body
  })
  .catch(err => {
    return {
      message: err.response.body.message,
      error: true
    }
  })
}

module.exports = {getGithubUser}
