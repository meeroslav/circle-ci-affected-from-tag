#!/usr/bin/env node
const https = require('https');

const INPUTS_MAIN_BRANCH_NAME = process.argv[0];
// inputs should be in form of: master << pipeline.project.type >> $CIRCLE_PROJECT_USERNAME $CIRCLE_PROJECT_REPONAME>>
const PROJECT_SLUG = process.argv[1];
console.log(PROJECT_SLUG);

let PAGE;
// const URL = `https://circleci.com/api/v2/project/${PROJECT_SLUG}/pipeline?branch=${INPUTS_MAIN_BRANCH_NAME}&page-token=${PAGE}`;

const URL = `https://circleci.com/api/v2/project/${PROJECT_SLUG}/pipeline?branch=${INPUTS_MAIN_BRANCH_NAME}`;

(async () => {
  const pipelines = await getHttp(URL);
  console.log(pipelines);
})();

/**
 * Helper function to wrap Https.get as an async call
 * @param {string} url
 * @returns
 */
async function getHttp(url) {
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let data = [];

      res.on('data', chunk => {
        data.push(chunk);
      });

      res.on('end', () => {
        const response = Buffer.concat(data).toString();
        resolve(response);
      });
    }).on('error', error => reject(error));
  });
}
