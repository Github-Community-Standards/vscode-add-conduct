'use strict';
import * as vscode from 'vscode';
import {existsSync, writeFileSync} from 'fs';
import { join } from 'path';
import code_of_conduct from './codeOfConduct';
const { execSync } = require('child_process');

export function activate(context: vscode.ExtensionContext) {

    let create = vscode.commands.registerCommand('conduct.create', () => {
        const rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            return;
        }
        const email = execSync("git config --global user.email").toString().trim();
        vscode.window.showInputBox({
            ignoreFocusOut: true,
            placeHolder: "Enter your email address",
            prompt: "Enter your email address ✉️",
            value: email
        })
            .then(email => {
                if (!email) {
                    return;
                }
                // FIXME: noticed by admin @ 2017-10-22 01:08:36
                // validate the email
                let code = code_of_conduct;
                code = code.replace('[INSERT EMAIL ADDRESS]', email);
                // write it to the current root path
                const filePath = join(rootPath, 'code_of_conduct.md');
                if (existsSync(filePath)) {
                    vscode.window.showWarningMessage("File 'code_of_conduct.md' already exists. Aborting!")
                    return;
                }
                writeFileSync(filePath, code, 'utf8');
                vscode.workspace.openTextDocument(vscode.Uri.file(filePath))
                    .then((doc) => {
                        vscode.window.showTextDocument(doc);
                    })
            });
    });

    context.subscriptions.push(create);
}
