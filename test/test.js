'use strict'

import test from 'ava'
import {getGithubUser} from './../chatConnector/utils'
import {user} from './../chatConnector/models'

test('getGithubUser()', async t => {
  const userDetails = await getGithubUser('lasalefamine')
  t.truthy(userDetails, 'User details exists')
  t.deepEqual(userDetails.login, 'LasaleFamine', 'correct login name from github')
})

test('getGithubUser() (not found)', async t => {
  const userDetails = await getGithubUser('notfoundofcourses')
  const objNotFound = {message: 'Not Found', error: true}
  t.deepEqual(userDetails, objNotFound, 'Correct not found hanlder')
  // t.deepEqual(userDetails.message, 'Not found', 'correct not found message')
})

test('model user()', async t => {
  const userDetails = await getGithubUser('lasalefamine')
  const modelUser = user(userDetails)
  const msg = `
name: Alessio Occhipinti,
company: @Contactlab,
blog: https://godev.space,
followers: 12,
following: 31,
publicRepos: 27,
publicGits: 4,
created: 2015/06/26,
reposUrl: https://api.github.com/users/LasaleFamine/repos 
  `
  t.truthy(modelUser, 'User exists with details')
  t.deepEqual(modelUser, msg, 'correct information for the user')
})
