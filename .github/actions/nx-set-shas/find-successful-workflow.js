const { Octokit } = require("@octokit/action");
const { execSync } = require('child_process');

const workflow_id = process.argv[3];
const branch = process.argv[4];
const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

(async () => {
  try {
    const octokit = new Octokit();
    // fetch all workflow runs on a given repo/branch/workflow with push and success
    const { workflow_runs } = await octokit.request(`GET /repos/${owner}/${repo}/actions/workflows/${workflow_id}/runs`, {
      owner,
      repo,
      branch,
      workflow_id,
      event: 'push',
      status: 'completed',
      conclusion: 'success'
    });
    console.log(workflow_runs);

    // octokit.actions.listWorkflowRuns({
    //   owner,
    //   repo,
    //   branch,
    //   workflow_id,
    //   event: 'push',
    //   status: 'success'
    // }).then(({ data }) => {
    //   console.log(data);

    //   const sha = data.workflow_runs
    //     .map(run => run.head_sha)
    //     .find(commitSha => commitExists(commitSha));

    //   console.log(sha);
    // });
  } catch {
    // we don't want to report anything here just silently break
  }
})();

/**
 * Check if given commit is valid
 * @param {string} commitSha
 * @returns
 */
function commitExists(commitSha) {
  try {
    execSync(`git cat-file -e ${commitSha} 2> /dev/null`);
    return true;
  } catch {
    return false;
  }
}
