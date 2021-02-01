const id = "YOUR_CLIENT_ID"
const sec = "YOUR_SECRET_ID"
const params = `?client_id=${id}&client_secret=${sec}`

function getErrorMsg (message, username) {
    if (message === 'Not Found') {
        return `${username} doesn't exist`
    }

    return message
}

function getProfile (username) {
    return fetch(`https://api.github.com/users/${username}${params}`)
        .then((res) => res.json())
        .then((profile) => {
            if (profile.message) {
                throw new Error(getErrorMsg(profile.message, username))
            }

            return profile
        })
}

function getRepos (username) {
    return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
        .then((res) => res.json())
        .then((repos) => {
            if (repos.message) {
                throw new Error(getErrorMsg(repos.message, username))
            }

            return repos
        })
}

function getStarCount (repos) {
    return repos.reduce((count, { stargazers_count }) => count + stargazers_count , 0)
}

function calculateScore (followers, repos) {
    return (followers * 3) + getStarCount(repos)
}

function getUserData (player) {
    return Promise.all([
        getProfile(player),
        getRepos(player)
    ]).then(([ profile, repos ]) => ({
        profile,
        score: calculateScore(profile.followers, repos)
    }))
}

function sortPlayers (players) {
    return players.sort((a, b) => b.score - a.score)
}

export function battle (players) {
    return Promise.all([
        getUserData(players[0]),
        getUserData(players[1])
    ]).then((results) => sortPlayers(results))
}

export function fetchPopularRepos (language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)

    return fetch(endpoint)
        .then((res) => res.json())
        .then((data) => {
            if (!data.items) {
                throw new Error(data.message)
            }

            // console.log( data.items)
            return data.items
        })
}

//what data.items looks like for each repo:
// archive_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/{archive_format}{/ref}"
// archived: false
// assignees_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/assignees{/user}"
// blobs_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/git/blobs{/sha}"
// branches_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/branches{/branch}"
// clone_url: "https://github.com/freeCodeCamp/freeCodeCamp.git"
// collaborators_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/collaborators{/collaborator}"
// comments_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/comments{/number}"
// commits_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/commits{/sha}"
// compare_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/compare/{base}...{head}"
// contents_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/contents/{+path}"
// contributors_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/contributors"
// created_at: "2014-12-24T17:49:19Z"
// default_branch: "master"
// deployments_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/deployments"
// description: "freeCodeCamp.org's open source codebase and curriculum. Learn to code at home."
// disabled: false
// downloads_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/downloads"
// events_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/events"
// fork: false
// forks: 25329
// forks_count: 25329
// forks_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/forks"
// full_name: "freeCodeCamp/freeCodeCamp"
// git_commits_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/git/commits{/sha}"
// git_refs_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/git/refs{/sha}"
// git_tags_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/git/tags{/sha}"
// git_url: "git://github.com/freeCodeCamp/freeCodeCamp.git"
// has_downloads: true
// has_issues: true
// has_pages: true
// has_projects: false
// has_wiki: false
// homepage: "https://contribute.freecodecamp.org"
// hooks_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/hooks"
// html_url: "https://github.com/freeCodeCamp/freeCodeCamp"
// id: 28457823
// issue_comment_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues/comments{/number}"
// issue_events_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues/events{/number}"
// issues_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/issues{/number}"
// keys_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/keys{/key_id}"
// labels_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/labels{/name}"
// language: "JavaScript"
// languages_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/languages"
// license: {key: "bsd-3-clause", name: "BSD 3-Clause "New" or "Revised" License", spdx_id: "BSD-3-Clause", url: "https://api.github.com/licenses/bsd-3-clause", node_id: "MDc6TGljZW5zZTU="}
// merges_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/merges"
// milestones_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/milestones{/number}"
// mirror_url: null
// name: "freeCodeCamp"
// node_id: "MDEwOlJlcG9zaXRvcnkyODQ1NzgyMw=="
// notifications_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/notifications{?since,all,participating}"
// open_issues: 284
// open_issues_count: 284
// owner: {login: "freeCodeCamp", id: 9892522, node_id: "MDEyOk9yZ2FuaXphdGlvbjk4OTI1MjI=", avatar_url: "https://avatars.githubusercontent.com/u/9892522?v=4", gravatar_id: "", …}
// private: false
// pulls_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/pulls{/number}"
// pushed_at: "2021-02-01T02:27:02Z"
// releases_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/releases{/id}"
// score: 1
// size: 174559
// ssh_url: "git@github.com:freeCodeCamp/freeCodeCamp.git"
// stargazers_count: 319163
// stargazers_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/stargazers"
// statuses_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/statuses/{sha}"
// subscribers_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/subscribers"
// subscription_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/subscription"
// svn_url: "https://github.com/freeCodeCamp/freeCodeCamp"
// tags_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/tags"
// teams_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/teams"
// trees_url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp/git/trees{/sha}"
// updated_at: "2021-02-01T03:06:20Z"
// url: "https://api.github.com/repos/freeCodeCamp/freeCodeCamp"
// watchers: 319163
// watchers_count: 319163

