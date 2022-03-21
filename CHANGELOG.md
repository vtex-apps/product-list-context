# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Fixed
- When the same product appeared on two different product lists, only the impression event related to the first product list would get sent, as that product would be added to the `sentIds` map as soon as the first event was triggered.

## [0.4.0] - 2021-06-08
### Fixed
- Concurrency when calculating impression position of a list of products

## [0.3.1] - 2020-12-17
### Fixed
- Persist and increment impression position.

## [0.3.0] - 2020-02-27
### Added
- `listName` prop to the ProductListContext.

## [0.2.0] - 2020-01-10
### Added
- `useProductImpression` hook.

### Changed
-  The context's state props' names and dispatch actions.

## [0.1.1] - 2020-01-03
### Changed
- Improved `README.md`.

## [0.1.0] - 2019-12-30
### Added
- Initial release.
