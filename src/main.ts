'use strict';
import * as vscode from 'vscode';
import manifest from './manifest';

import { existsSync, writeFileSync, readFileSync } from 'fs';
import { join } from 'path';
import { Agent } from 'http';
import { getPlaceHolders } from './getPlaceHolders';
import { Replacement } from './Replacement';
import { replacePlaceHolder } from './replacePlaceHolder';

const replacements:Replacement[] = [];

export async function activate(context: vscode.ExtensionContext) {
    console.log('Calling Add Code of Conduct');

    let add = vscode.commands.registerCommand('codeOfConduct.add', async () => {
        const rootPath = vscode.workspace.rootPath; // TODO: Update as workspace.rootPath is deprecated?
        if (!rootPath) {
            return;
        }

        const filePath = join(rootPath, 'CODE_OF_CONDUCT.md');
        
        if (existsSync(filePath)) {
            vscode.window.showWarningMessage("File 'CODE_OF_CONDUCT.md' already exists. Aborting!")
            return;
        }

        var template = await vscode.window.showQuickPick(manifest, {}).
            then((item) => {
                if (item) {
                var msg = item?.body ? readFileSync(join(__dirname, item.body), 'utf8') : console.log("No item selected")
                return msg;
            }
        });

        if (template) {
            const placeholders = getPlaceHolders(template);
            
            const replacements:Array<Replacement> = []

            for (let placeholder of placeholders) {
                // TODO: ADD Check Config for default values
                const defaultPlaceholders:Array<Replacement> = vscode.workspace.getConfiguration('codeOfConduct').get('defaultPlaceholders') ?? [];
                const defaultPlaceholder = defaultPlaceholders.find(p => p.placeholder === placeholder)?.replacement ?? placeholder
                await replacements.push(await replacePlaceHolder(placeholder, defaultPlaceholder))
            }
            
            for (let replacement of replacements) {
                const regValue:string = replacement.placeholder.replace(/\|/g, '\\|');
                const reg = new RegExp(regValue, 'g');
                template = template.replace(reg, replacement.replacement);
            }

            writeFileSync(filePath, template, 'utf8');
            vscode.workspace.openTextDocument(vscode.Uri.file(filePath))
                   .then((doc) => {
                       vscode.window.showTextDocument(doc);
                   })
                }
    })

    context.subscriptions.push(add);
    }

