# titanium-boilerplates

> Boilerplate projects for your favorite development tools used together with Axway Titanium

> :warning: **WORK IN PROGRESS**. We are currently collecting ideas and work on the first templates. Check back soon for more examples!

## Getting started

Clone this repo, navigate to the project you want to try and run it!

For example:

```bash
cd templates/
titanium build -p [ios|android]
```

Some projects may user other commands, please check the individual README files in each template.

## Used tools

See the list below to see for which tools this repo already contains examples and which tools are planned for.

- [x] TypeScript
- [ ] Webpack
- [ ] Karma
- [ ] Appium

For a quick overview about the individual templates, what tools they use and what they do in general check the following listing:

| Name | Tools | Descriptions | Readme |
| --- | --- | --- | --- |
| [typescript-alloy-app](templates/typescript-app) | TypeScript | Use TypeScript to develop your Alloy based Titanium app | [README](templates/typescript-alloy-app/README.md) |
| [typescript-classic-app](templates/typescript-app) | TypeScript | Use TypeScript to develop your classic Titanium app | [README](templates/typescript-classic-app/README.md) |

## Contributing

Open source contributions are greatly appreciated! If you have a bugfix, improvement or other tools you use in your Titanium development, please create [an issue](https://github.com/appcelerator/titanium-boilerplates/issues/new) first and submit a [pull request](https://github.com/appcelerator/titanium-boilerplates/pulls/new) against master.

Before you contribute read through the following guidelines.

* Your commit messages should follow the [Conventional Commits Specification](https://conventionalcommits.org/) so that changelogs and version bumps can be automatically generated. If you are not familiar with the commit message convention, you can use `npm run commit` instead of git commit, which provides an interactive CLI for generating proper commit messages.
* We will let GitHub automatically squash your PR before merging, so don't worry about making multiple small commits.

## Getting Help

If you have questions about these templates, feel free to reach out on Stackoverflow or the `#helpme` channel on [TiSlack](http://tislack.org). In case you find a bug create a [new issue](/issues/new) or open a [new JIRA ticket](https://jira.appcelerator.org).

## License

Apache License. Version 2.0