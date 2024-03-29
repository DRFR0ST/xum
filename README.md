# Extremely Universal Manager (xum)

A cli app that unifies all Node package managers.
The command line application automatically detects and maps commands for most popular Node package managers.

The app aims to make life easier for developers who work on multiple projects using different package managers. Remembering which project uses which PM or checking it every time becomes labor work at some point.

⚠️ The app is still in alpha stage. Breaking changes might get introduced and the API is also prone to changes.

## Installation

The package is available on npmjs CDN. Install `xum` globally using your preferred PM:

### NPM

`npm i -g @drfrost/xum`

### Yarn

`yarn global add @drfrost/xum`

To verify that the app was successfuly installed, run `xum --version`.

## Supported PM’s

The app uses a modified `preferred-pm` package internally which essentially detects following package managers:

- npm
- yarn
- pnpm
- bun

## Usage

XUM takes the best from both npm and yarn. The following commands are currently implemented:

## Commands

| Command                | Description                                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| xum info               | Display information about preferred package managers for current directory/workspace.                                                                           |
| xum install            | Install dependencies                                                                                                                                            |
| xum run <command>      | Run a script found in package.json.                                                                                                                             |
| xum add <packages>     | Add specified dependencies.                                                                                                                                     |
| xum upgrade <packages> | Update specified dependencies.                                                                                                                                  |
| xum list <packages>    | List project dependencies.                                                                                                                                      |
| xum remove <packages>  | Remove specified dependencies.                                                                                                                                  |
| xum dev add <packages> | Add specified dev dependencies.                                                                                                                                 |
| xum init               | Initialize new package. Prompt will ask for preferred PM if not provided with the `--manager` flag.                                                             |
| xum <command>          | Run a wildcard command. Use with caution since your command won't be validated. Use with the `--manager` flag to make sure you run commands for the correct PM. |
| xum help               | Display help.                                                                                                                                                   |

ℹ️ We will gradually implement more commands and eventually we hope to deprecate the `wild` command.

⚠️ Global dependencies are not being handled by the application and support was not planned yet.

## Flags

Most commands accept the `--manager <npm|yarn|pnpm|bun>` flag which will force using the specified package manager.

## FAQ

**How to run an unsupported command?**

In order to run an unsupported command, use the `xum <command>` command. e.g. `xum audit` which in a yarn workspace will execute `yarn list`. Since `1.0.0-alpha.6` you can omit the `wild` part and simply pass the actual command. However same as with the wild command, it will not be validated and it's advised to append the `--manager <npm|yarn|pnpm|bun>` flag. The warning prompt can be skipped by passing the `--skip-prompt` flag.
