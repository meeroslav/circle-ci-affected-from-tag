#!/usr/bin/env node
const https = require('https');

const INPUTS_MAIN_BRANCH_NAME = process.argv[0];
const INPUTS_PROJECT = process.argv[1];

let PAGE;

// const URL = `https://circleci.com/api/v2/project/gh/CircleCI-Public/api-preview-docs/pipeline?branch=${INPUTS_MAIN_BRANCH_NAME}&page-token=${PAGE}`;
const URL = `https://circleci.com/api/v2/project/gh/nrwl/nx/pipeline?branch=${INPUTS_MAIN_BRANCH_NAME}&page-token=${PAGE}`;

const pipelines = await getHttp(URL);
console.log(pipelines);

/**
 * Helper function to wrap Https.get as an async call
 * @param {string} url
 * @returns
 */
async function getHttp(url) {
  return await new Promise((resolve, reject) => {
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
