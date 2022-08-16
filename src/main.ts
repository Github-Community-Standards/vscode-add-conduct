'use strict';
import * as vscode from 'vscode';
import manifest from './manifest';

import {existsSync, writeFileSync, readFileSync} from 'fs';
import { join } from 'path';
const { execSync } = require('child_process');

const regexFinder:RegExp = /\[[A-Z_ ]+\](?!\(http)/g;

function getPlaceHolders (text:string) : Set<string> {
    let placeholders = [];
    let match = text.match(regexFinder);
    if (match){
        for (let m of match){
            placeholders.push(m);
        }
    }
    return new Set(placeholders);
}

export function showInputBox(placeholder:string, fileText:any) {
    let prompt = placeholder.replace('[', '').replace(']', '');
    return vscode.window.showInputBox({
		value: placeholder,
		placeHolder: prompt,
	}).then((item) => {
        if (item) {
        let swap = new RegExp(item, 'g')
        fileText.replace(swap, fileText);
        }
    })}

export async function activate(context: vscode.ExtensionContext) {
    console.log('Calling Add Code of Conduct');

    let add = vscode.commands.registerCommand('codeOfConduct.add', async () => {
        const rootPath = vscode.workspace.rootPath;
        if (!rootPath) {
            return;
        }

        const filePath = join(rootPath, 'CODE_OF_CONDUCT.md');        
        if (existsSync(filePath)) {
            vscode.window.showWarningMessage("File 'CODE_OF_CONDUCT.md' already exists. Aborting!")
            return;
        }

        const msg = await vscode.window.showQuickPick(manifest, {}).then((item) => {
                return item?.body? readFileSync(join(__dirname, item.body), 'utf8'):console.log("No item selected")
            });  
        
        if (msg) {
        const placeholders = getPlaceHolders(msg)
                console.log(placeholders)
                placeholders?.forEach(
                    (p) => {
                        showInputBox(p, msg)
                        vscode.window.showInformationMessage("File 'CODE_OF_CONDUCT.md' created successfully!")
                        });
                    }
            });
 /*       const email = execSync("git config --global user.email").toString().trim();
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

                let conduct = code_of_conduct;
                conduct = conduct.replace('[INSERT EMAIL ADDRESS]', email);
                writeFileSync(filePath, conduct, 'utf8');
                vscode.workspace.openTextDocument(vscode.Uri.file(filePath))
                    .then((doc) => {
                        vscode.window.showTextDocument(doc);
                    })
            });
    });
*/
    context.subscriptions.push(add);
}
