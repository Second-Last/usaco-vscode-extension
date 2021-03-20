# USACO VSCode Extension README

An extension that helps you simpify the process of writing required code for the USACO grading system to recognize your submission. Currently supports C++, but will include Java and Python in the future.

## Future Plans

* [ ] (Using a json file to) remember the user's ID
* [ ] Add Java support
* [ ] Add Python support

### Exclusively for C++

* [ ] Neglect the `fstream` library part upon creating the template because we need to test our code using `iostream`; then the user can press a short-cut key or something like that, and the system will automatically add the `fstream` snippets if necessary and convert the resulting code into a txt file for submitting.

## Features

- Automatically creates the comments section, imports the necessary libraries, and conveniently generates a `main` function and `using namesapce std;`! All you have to do is to enter the task name (usually it is specified in the prompt: if the prompt wants you to output the results to a file called `XXX.out`, then `XXX` is the task name), your USACO user ID, and where you want to store your brilliant code.

<!-- Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow. -->

<!-- ## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something -->

## Known Issues

As an absolute TS noob (bruh I don't even know how to use JS), there is definitely room for reducing some unnecessary code and warning messages. Even just scanning through the code and reducing clutter helps! I have made comments at suspicious sections and will pin [issues](https://github.com/GZGavinZhao/usaco-vscode-extension/issues) that I have discovered myself but have no idea how to deal with those bad boys.

## Release Notes

### 1.0.0

Initial release of the USACO extension! Supports only C++.
<!-- 
-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!** -->
