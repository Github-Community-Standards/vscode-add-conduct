'use strict';
import * as vscode from 'vscode';
import manifest from './manifest';

import { existsSync, writeFileSync, readFileSync } from 'fs';
import { format, join } from 'path';
const { execSync } = require('child_process');

function getPlaceHolders(text: string) {
    let placeholders = [];
    let regex = /\[[A-Z_]+\](?!\()/g;
    let match = regex.exec(text);
    while (match != null) {
        placeholders.push(match[0]);
        match = regex.exec(text);
    }
    return new Set(placeholders);
}

async function replacePlaceHolder(placeholder: string, body: string) {
    // TODO: Add default values for placeholders
    console.log(placeholder);
    await vscode.window.showInputBox({
        prompt: `Enter ${placeholder} replacement`
        }).then((value) => {
        return body.replace(placeholder, value ? value: placeholder);
    })
}

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

        const template = await vscode.window.showQuickPick(manifest, {}).
            then((item) => {
                if (item) {
                var msg = item?.body ? readFileSync(join(__dirname, item.body), 'utf8') : console.log("No item selected")
                return msg;
            }
        });
        if (template) {
            const placeholders = getPlaceHolders(template);
            var newFile = template
            for (let placeholder of placeholders) {
                newFile = await replacePlaceHolder(placeholder, template)
            }

            writeFileSync(filePath, newFile, 'utf8');
               vscode.workspace.openTextDocument(vscode.Uri.file(filePath))
                   .then((doc) => {
                       vscode.window.showTextDocument(doc);
                   })
        }
    })

    context.subscriptions.push(add);
    }


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