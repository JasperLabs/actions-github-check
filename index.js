const core = require("@actions/core");
const gitHub = require("@actions/github");

function run() {
	try {
		const [
			gitHubRepoOwner,
			gitHubRepoName,
		] = process.env.GITHUB_REPOSITORY.split("/");
		const gitHubSha = process.env.GITHUB_SHA;

		const gitHubToken = core.getInput("token", { required: true });
		const checkName = core.getInput("name", { required: true });
		const status = core.getInput("status") || "completed";
		const conclusion = core.getInput("conclusion") || "success";

		const octokit = new gitHub.GitHub(gitHubToken);

		octokit.checks.create({
			owner: gitHubRepoOwner,
			repo: gitHubRepoName,
			name: checkName,
			head_sha: gitHubSha,
			status,
			conclusion,
			output: {
				title: checkName,
				summary: `${checkName}: Check created for ${gitHubSha}`,
			},
		});
	} catch (error) {
		core.error(error);
		core.setFailed(error.message);
	}
}

run();
