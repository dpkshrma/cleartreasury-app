# Payments Platform Web App

This is the repository for the Clear Treasury Payments Platform.

## Getting Started

### Pre-requisites:

In order to install the
[Design System](https://github.com/clear-treasury/design-system), you'll need to
set up a GitHub Personal Access Token. Follow these steps to do so:

1.  Set up a GitHub Personal Access Token
    1. Go to the
       [New personal access token](https://github.com/settings/tokens/new)
       settings page
    2. Give it a descriptive name in the note field (e.g.
       `CT Private GitHub Packages`)
    3. Make sure the `repo` and `read:packages` scopes are checked
    4. Hit the "Generate token" button and copy the token value
2.  Configure your local npm environment 1. In your terminal, run
    `npm login --scope=@clear-treasury --registry=https://npm.pkg.github.com` 2.
    When prompted, enter your GitHub username 3. For your password, enter the
    Personal Access Token from step 1 4. Then enter the email address that's
    associated with your GitHub account Npm will now be configured to intall
    packages to pull from GitHub private repositories

### Running the app locally

3.  Clone this repo
4.  Run `npm install`
5.  Run `npm run dev`
6.  Open [localhost:3000](http://localhost:3000) in your browser
