import { QuickPickItem } from "vscode";

interface CustomQuickPickItem extends QuickPickItem {
    body: string;
    version: string;
}

const manifest:CustomQuickPickItem[] = [
    {
        "label": "Contributor Covenant",
        "detail": "https://www.contributor-covenant.org",
        "version": "2.1",
        "body": "./codesOfConduct/covenant.md",
        "description": "General Code of Conduct"
    },
    {
        "label": "Citizen Code Of Conduct",
        "detail": "https://github.com/stumpsyn/policies/blob/master/citizen_code_of_conduct.md",
        "version": "2.3",
        "body": "./codesOfConduct/citizen.md",
        "description": "Code of Conduct for Communities or Events"
    },
    {
        "label": "Plone Code Of Conduct",
        "detail": "http://plone.org/foundation/materials/foundation-resolutions/code-of-conduct",
        "version": "0.0",
        "body": "./codesOfConduct/plone.md",
        "description": "Plone Foundation Code of Conduct"
    }
]

export default manifest