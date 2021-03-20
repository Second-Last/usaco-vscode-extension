<p align="center">
<img src = "https://train.usaco.org/usaco/cowhead2.gif" alt = "USACO Cow Head Logo">
</p>

<p align = "center">
<a href="https://opensource.org/licenses/MIT"><img src="https://img.shields.io/badge/license-MIT-purple.svg" alt="License: MIT"></a>
<a href="https://marketplace.visualstudio.com/items?itemName=GZGavinZhao.usaco"><img src="https://img.shields.io/visual-studio-marketplace/d/GZGavinZhao.usaco" alt="Visual Studio Marketplace Downloads"></a>
</p>

# USACO VSCode Extension README

An extension that helps you simpify the process of writing required code for the USACO grading system to recognize your submission. Currently supports C++, but will include Java and Python in the future.

## Future Plans

* [ ] (Using a json file to) remember the user's ID
* [ ] Use `QuickPickItem` as the `item` parameter in `ShowQuickPick` instead of just strings to provide better descriptions/hints (specifically for choosing the `fstream` library)
* [ ] Add Java support
* [ ] Add Python support

### Exclusively for C++

* [ ] Neglect the `fstream` library part upon creating the template because we need to test our code using `iostream`; then the user can press a short-cut key or something like that, and the system will automatically add the `fstream` snippets if necessary and convert the resulting code into a txt file for submitting.

## Features

- Automatically creates the comments section, imports the necessary libraries, and conveniently generates a `main` function and `using namesapce std;`! All you have to do is to enter the task name (usually it is specified in the prompt: if the output format is `XXX.out`, then `XXX` is the task name), your USACO user ID, whether you need to use the `fstream` library (same as above), and where you want to store your brilliant code.

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

## Contributing

- Help finish our [Future Plans](#future-plans) mentioned at the top
- If you know some code in C++/Java/Python that you have to write everytime for a USACO submission, feel free to [open an issue](https://github.com/GZGavinZhao/usaco-vscode-extension/issues) on Github and I will add them to the extension! I don't know any Java/Python so this can really help!
- See [Known Issues](#known-issues) below

## Known Issues

As an absolute TS noob (bruh I don't even know how to use JS), there is definitely room for reducing some unnecessary code and warning messages. Even just scanning through the code and reducing clutter helps! I have made comments at suspicious sections and will pin [issues](https://github.com/GZGavinZhao/usaco-vscode-extension/issues) that I have discovered myself but have no idea how to deal with those bad boys.

## (Major) Release Notes

### 0.0.1

Initial release of the USACO extension! Supports only C++.
<p align = "center">
<img src = "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1858417866,1011124235&fm=11&gp=0.jpg" height = "100" alt = "thumsUpYeah">
</p>

## Disclaimer

This extension is not affiliated nor endorsed by the [USACO](httos://usaco.org) and the USACO staff. Use at your own risk! I'm not responsible for any effect this extension might have on your USACO submissions/grades. (Well theoretically there shouldn't be any, but just in case)
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
