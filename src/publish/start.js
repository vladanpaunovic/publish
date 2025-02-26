exports.default = async function start({ context, github }) {
  const repoInfo = context.repo;
  const workflowInfo = (
    await github.rest.actions.getWorkflowRun({
      ...repoInfo,
      run_id: context.runId,
    })
  ).data;

  return github.rest.issues.createComment({
    ...repoInfo,
    issue_number: context.payload.issue.number,
    body: `Publishing: [run#${context.runId}](${workflowInfo.html_url})`,
  });
};
