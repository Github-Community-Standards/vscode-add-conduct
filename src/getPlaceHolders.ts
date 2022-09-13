'use strict';
// TODO: #15 Test matching variables
export function getPlaceHolders(text: string) {
    let placeholders = [];
    let regex = /\{\{[A-Z\|\_]+\}\}/g;
    let match = regex.exec(text);
    while (match != null) {
        placeholders.push(match[0]);
        match = regex.exec(text);
    }
    return new Set(placeholders);
}
