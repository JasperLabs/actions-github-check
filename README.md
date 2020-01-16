# GitHub commit status check action

This action creates a status check on the commit this action is run for.

## Inputs / Outputs

See [`actions.yml`](/actions.yml) for more information on inputs & outputs

## Example usage

First, copy this repo into the target repo, where you want to use this action - in the example below it has been copied into `.github/actions/actions-github-check`.

Then add steps as below:

```yml
name: Deploy
on: deployment
jobs:
  deployed-to-production:
    name: Indicate deploy to production was successful
    runs-on: ubuntu-latest
    steps:
      # Check out code so that the following steps can reference the action definition
      - name: Checkout code
        uses: actions/checkout@v1
      - name: Add status check
        uses: ./.github/actions/actions-github-check
        with:
          name: 'deployed-to-production'
          token: ${{ github.token }}
```