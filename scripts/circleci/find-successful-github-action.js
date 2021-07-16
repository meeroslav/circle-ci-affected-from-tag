const core = require("@actions/core");
const github = require("@actions/github");

const GITHUB_TOKEN = process.argv[2];

// const octokit = github.getOctokit(core.getInput("github_token"));
console.log('CORE', core.getInput('github_token'));
console.log(process.argv);
