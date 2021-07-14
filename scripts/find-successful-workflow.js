#!/usr/bin/env node
const https = require('https');

// first two argument params are node and script
const INPUTS_MAIN_BRANCH_NAME = process.argv[2];
const PROJECT_SLUG = process.argv[3];

let PAGE;
// const URL = `https://circleci.com/api/v2/project/${PROJECT_SLUG}/pipeline?branch=${INPUTS_MAIN_BRANCH_NAME}&page-token=${PAGE}`;

const URL = `https://circleci.com/api/v2/project/${PROJECT_SLUG}/pipeline?branch=${INPUTS_MAIN_BRANCH_NAME}`;

// return
return getHttp(URL).then(pipelines => {
  const { next_page_token, items } = JSON.parse(pipelines);
  const pipeline = items.find(async ({ id, errors }) => {
    return errors.length === 0 && await isWorkflowSuccessful(id);
  });
  if (pipeline) {
    console.log(1, pipeline.vsc.revision);
    process.stdout.write(`2, ${pipeline.vsc.revision}`);
  }
});

async function isWorkflowSuccessful(pipelineId) {
  return getHttp(`https://circleci.com/api/v2/pipeline/${pipelineId}/workflow`)
    .then(({ items }) => items.some(item => item.status === 'success'));
}

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
