# Node.js boilerplate

This API handles X

## Getting Started

* Install dependencies: `yarn`
* Boot PostgreSQL: `docker-compose up`
* Update your `.env file` with the required keys
* Migrate your local DB: `knex migrate:latest --env development`
* Seed your local DB: `knex seed:run --env development`
* Ensure all tests pass: `yarn test`
* Start the development server: `yarn run start:development`

### Prerequisites

* `NodeJS`
* `yarn`
* `Docker`

## Running the tests

Our test suite is divided into four different yarn scripts:

* `yarn lint`: this will lint the codebase
* `yarn test:integration`: this will run all integration tests
* `yarn test`: this will lint the codebase, run all tests

## Deployment

See [this environments list](https://icapps.atlassian.net/wiki/spaces/TX/pages/218234888/Environments)
for all Jenkins jobs.

Every stage (`develop`, `staging`, `production`) has a
corresponding deployment branch (`develop`, `staging` and `master`).

On each production deploy, the version should also be bumped (see Versioning below).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

This is achieved using `npm version`.

Example usage: `npm version patch`

This will:

* Bump the version in `package.json`
* Create a new git tag
* Create a new commit

Afterwards, push the tag to BitBucket as well: `git push --tags`.

## Authors

* **Anthony Madhvani** - *Initial work* - [anthony.madhvani@icapps.com](mailto:anthony.madhvani@icapps.com)
* **Robin Houdmeyers** - *Initial work* - [robin.houdmeyers@icapps.com](mailto:robin.houdmeyers@icapps.com)

