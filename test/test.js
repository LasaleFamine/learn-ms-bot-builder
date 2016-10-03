'use strict'

import test from 'ava'
import {getGithubUser} from './../chatConnector/utils'

test('getGithubUser()', async t => {
  const userDetails = await getGithubUser('lasalefamine')
  t.truthy(userDetails, 'User details exists')
  t.deepEqual(userDetails.login, 'LasaleFamine', 'correct login name from github')
})
