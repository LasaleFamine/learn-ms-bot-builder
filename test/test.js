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
  const msg = 'Alessio Occhipinti'
  t.truthy(modelUser, 'User exists with details')
  t.truthy(modelUser.indexOf(msg), 'correct information for the user')
})
