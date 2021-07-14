#!/usr/bin/env node
const https = require('https');

// first two argument params are node and script
const INPUTS_MAIN_BRANCH_NAME = process.argv[2];
const PROJECT_SLUG = process.argv[3];
const URL = `https://circleci.com/api/v2/project/${PROJECT_SLUG}/pipeline?branch=${INPUTS_MAIN_BRANCH_NAME}`;

console.log('before');
(async () => {
  let nextPage;
  let foundSHA;
  console.log('in');

  do {
    const { next_page_token, sha } = await findSha(nextPage);
    console.log(next_page_token, sha);
    foundSha = sha;
    nextPage = next_page_token;
  } while (!foundSHA && nextPage);

  if (foundSHA) {
    console.log(foundSHA);
  } else {
    console.log('NOT FOUND');
  }
});

/**
 * Finds the last successful commit and or token for the next page
 * @param {string} pageToken
 * @returns { next_page_token?: string, sha?: string }
 */
async function findSha(pageToken) {
  return getJson(pageToken ? `${URL}&page-token=${pageToken}` : URL)
    .then(({ next_page_token, items }) => {
      const pipeline = items.find(async ({ id, errors }) => {
        return errors.length === 0 && await isWorkflowSuccessful(id);
      });
      return {
        next_page_token,
        sha: pipeline ? pipeline.vcs.revision : void 0
      };
    });
}

/**
 *
 * @param {string} pipelineId
 * @returns {boolean}
 */
async function isWorkflowSuccessful(pipelineId) {
  return getJson(`https://circleci.com/api/v2/pipeline/${pipelineId}/workflow`)
    .then(({ items }) => items.some(item => item.status === 'success'));
}

/**
 * Helper function to wrap Https.get as an async call
 * @param {string} url
 * @returns {Promise<JSON>}
 */
async function getJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        const response = Buffer.concat(data).toString();
        resolve(JSON.parse(response));
      });
    }).on('error', error => reject(error));
  });
}
