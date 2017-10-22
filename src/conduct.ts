'use strict';
import * as vscode from 'vscode';
import {existsSync, writeFileSync} from 'fs';
import { join } from 'path';
import code_of_conduct from './codeOfConduct';
const { execSync } = require('child_process');

const validateEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function activate(context: vscode.ExtensionContext) {

    let add = vscode.commands.registerCommand('conduct.add', () => {
        const rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            return;
        }
        const filePath = join(rootPath, 'CODE_OF_CONDUCT.md');        
        if (existsSync(filePath)) {
            vscode.window.showWarningMessage("File 'CODE_OF_CONDUCT.md' already exists. Aborting!")
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
                if(!validateEmail(email)){
                    vscode.window.showWarningMessage("Not a valid email address. Aborting!")
                    return;
                }
                let conduct = code_of_conduct;
                conduct = conduct.replace('[INSERT EMAIL ADDRESS]', email);
                writeFileSync(filePath, conduct, 'utf8');
                vscode.workspace.openTextDocument(vscode.Uri.file(filePath))
                    .then((doc) => {
                        vscode.window.showTextDocument(doc);
                    })
            });
    });

    context.subscriptions.push(add);
}
