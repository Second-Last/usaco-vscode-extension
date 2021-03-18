import * as _ from "lodash";
import * as mkdirp from "mkdirp";

import { commands, InputBoxOptions, OpenDialogOptions, Uri, window } from "vscode";
import { existsSync, lstatSync, writeFile } from "fs";
import { getCppTemplate } from "../templates/cpp.template";

export const newCppTemplate = async (uri: Uri) => {
    const taskName = await promptForTaskName();
    if (_.isNil(taskName) || taskName.trim() === "") {
        window.showErrorMessage("The task name must not be empty");
        return;
    }

    const iD = await promptForID();
    if (_.isNil(iD) || iD.trim() === "") {
        window.showErrorMessage("Your ID must not be empty");
        return;
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
        await generateCppCode(taskName, iD, true, targetDirectory);
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
        // TODO: should use ShowQuickPick
        const fStreamPromptOptions: InputBoxOptions = {
            prompt: "Does this program need to use the fstream library? (Y/n)"
        };
        return window.showInputBox(fStreamPromptOptions);
        // Check the cases before deciding
    }

    async function promptForTargetDirectory(): Promise<string | undefined> {
        const options: OpenDialogOptions = {
            canSelectMany: false,
            openLabel: "Select a folder to create the file in",
            canSelectFolders: true,
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
        const directoryPath = `${targetDirectory}/${taskName}`; // Needs "/" at the end?
        if (!existsSync(directoryPath)) {
            console.log("Needs to create directory");
            createDirectory(directoryPath); // Adding await, and the function will stop here. Why?
            console.log("Finished creating directory");
        }

        console.log("Creating Cpp template");
        await Promise.all([createCppTemplate(taskName, iD, usefStream, directoryPath)]); // Hmm... I don't need Promise.all() here, right?

        // Open the folder created
        let targetUri = Uri.parse(`${directoryPath}`);
        commands.executeCommand('vscode.openFolder', targetUri);
    }

    function createDirectory(targetDirectory: string): Promise<void> {
        return new Promise((resolve, reject) => {
            mkdirp(targetDirectory);
            console.log(`Successfully created directory at ${targetDirectory}`);
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

    Any help would be appreciated!
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