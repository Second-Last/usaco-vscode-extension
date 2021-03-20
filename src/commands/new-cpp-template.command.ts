import * as _ from "lodash";
import * as mkdirp from "mkdirp";

import { commands, InputBoxOptions, OpenDialogOptions, QuickPick, QuickPickItem, QuickPickOptions, Uri, window } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import { getCppTemplate } from "../templates/cpp.template";

var octicons = require("@primer/octicons");

export const newCppTemplate = async (uri: Uri) => {
    const taskName = (await promptForTaskName());
    if (_.isNil(taskName) || taskName.trim() === "") {
        window.showErrorMessage("The task name must not be empty");
        return;
    }

    const iD = await promptForID();
    if (_.isNil(iD) || iD.trim() === "") {
        window.showErrorMessage("Your ID must not be empty");
        return;
    }

    const fStreamResult = await promptForfStream();
    var fStream;
    if (_.isNil(fStreamResult) || fStreamResult.trim() === "") {
        window.showErrorMessage("You must choose whether to use fstream or not");
        return;
    } else {
        fStream = fStreamResult === 'Yes' ? true : false;
    }

    let targetDirectory;
    if (_.isNil(_.get(uri, "fsPath")) || !lstatSync(uri.fsPath).isDirectory()) {
        targetDirectory = await promptForTargetDirectory();
        if (_.isNil(targetDirectory)) {
            window.showErrorMessage("Please select a valid directory");
            return;
        }
    } else {
        targetDirectory = uri.fsPath;
    }

    try {
        await generateCppCode(taskName, iD, fStream, targetDirectory);
        window.showInformationMessage("Successfully generated file(s)");
    } catch (error) {
        window.showErrorMessage(
            `Error:
              ${error instanceof Error ? error.message : JSON.stringify(error)}`
        );
    }

    // Below are all the functions
    function promptForTaskName(): Thenable<string | undefined> {
        const taskNamePromptOptions: InputBoxOptions = {
            prompt: "Task Name",
        };
        return window.showInputBox(taskNamePromptOptions);
    }

    function promptForID(): Thenable<string | undefined> {
        const iDPromptOptions: InputBoxOptions = {
            prompt: "Your USACO ID",
        };
        return window.showInputBox(iDPromptOptions);
    }

    function promptForfStream(): Thenable<string | undefined> {
        const fStreamPromptOptions: QuickPickOptions = {
            canPickMany: false,
            placeHolder: 'Use fstream? If the in/output format is XXX.in/XXX.out), choose Yes',
        };
        return window.showQuickPick(['$(check) Yes', '$(x) No',], fStreamPromptOptions);
    }

    async function promptForTargetDirectory(): Promise<string | undefined> {
        const options: OpenDialogOptions = {
            canSelectMany: false,
            openLabel: "Select a folder to create the file in",
            canSelectFolders: true,
            canSelectFiles: false,
        };

        return window.showOpenDialog(options).then((uri) => {
            if (_.isNil(uri) || _.isEmpty(uri)) {
                return undefined;
            }
            return uri[0].fsPath;
        });
    }

    async function generateCppCode(
        taskName: string,
        iD: string,
        usefStream: boolean,
        targetDirectory: string,
    ) {
        const correctedTaskName = taskName.toLowerCase();
        const directoryPath = `${targetDirectory}/${correctedTaskName}/`;
        if (!existsSync(directoryPath)) {
            console.log("Needs to create directory");
            await createDirectory(directoryPath);
        }

        console.log("Creating Cpp template");
        await createCppTemplate(correctedTaskName, iD, usefStream, directoryPath);
        console.log("Finished creating the C++ template");

        // Open the folder created
        let targetUri = Uri.parse(`${directoryPath}`);
        commands.executeCommand('vscode.openFolder', targetUri);
    }

    function createDirectory(targetDirectory: string): Promise<void> {
        return new Promise((resolve, reject) => {
            mkdirp(targetDirectory).then(made => {
                // Bruh is this if statement even necessary
                if (existsSync(targetDirectory)) {
                    console.log(`Successfully created directory at ${targetDirectory}`);
                    resolve();
                }
                else { reject(); }
            });
        });
    }
    /*
    TODO: should react to error, below is the original code:
    mkdirp(targetDirectory, (error) => {
                if (error) {
                    return reject(error);
                }
                resolve();
            });
    
    This code throws the problem:
        Argument of type '(error: any) => void' is not assignable to parameter of type 'Mode | Options'.
        Type '(error: any) => void' has no properties in common with type 'Options'.ts(2345)
    
    I know async from Dart, so I forced it to resolve, but I'm a TS noob so I don't know how to fix it. 
    Any help would be appreciated!
    */

    /*
    Gives warning:
    (node:3044) [DEP0005] DeprecationWarning: Buffer() is deprecated due to security and usability issues. Please use the Buffer.alloc(), Buffer.allocUnsafe(), or Buffer.from() methods instead.
    
    Not quite sure what triggered it and if it's a problem from my code
    */

    function createCppTemplate(
        taskName: string,
        iD: string,
        usefStream: boolean,
        targetDirectory: string,
    ) {
        const correctedTaskName = taskName.toLowerCase();
        const targetPath = `${targetDirectory}/${correctedTaskName}.cpp`;
        if (existsSync(targetPath)) {
            throw Error(`${correctedTaskName}.cpp already exists`);
        }
        console.log("Start writing file...");
        return new Promise<void>(async (resolve, reject) => {
            writeFile(
                targetPath,
                getCppTemplate(taskName, iD, usefStream),
                "utf8",
                (error) => {
                    if (error) {
                        reject(error);
                        return;
                    }
                    resolve();
                }
            );
        });
    }
};