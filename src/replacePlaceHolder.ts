'use strict';
import * as vscode from 'vscode';
import { Replacement } from './Replacement';

export async function replacePlaceHolder(placeholder: string, replaceValue: string): Promise<Replacement> {
    const replacement = await vscode.window.showInputBox({
        prompt: `Enter ${placeholder} replacement`,
        value: replaceValue
    }).then((value) => {
        if (value) {
            return {
                placeholder: placeholder,
                replacement: value
            };
        }
        return { placeholder: placeholder, replacement: "" };
    });
    return replacement;
}
