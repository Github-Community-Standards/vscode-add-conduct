> **Note**
> The [original Repo](https://github.com/cg-cnu/vscode-add-conduct) is the starting point for the project. Ultimately, the goal is to add more features that distinguish the project from the original.
> We will give back to the original Repo where it makes sense, but as updates have not happened in several year we have to assume the project is no longer maintained.


![Code of Conduct Icon](/icons/vscode-add-coc.png)

# VS Code Add Code of Conduct

## Code of Conduct
A Code of Conduct is a set of rules for a group of people to follow when they interact with each other on behalf of a project, community, or event. Adding a Code of Conduct to your repo is a great way to show inclusivity for all contributors and provide clear guidelines for how to behave and how the rules will be enforced.

As development continues and other options for Codes of Conduct are discovered, additional options may be provided.

## How to Add a Code of Conduct to Your Repo
- Activate the Command Pallet
- Select the `Add Code of Conduct` Command

## Settings

### Setting Default Placeholders
You can set default values for a given placeholder by adding the value into your vscode settings. You must edit the settings file directly.

```json
{
    "codeOfConduct.defaultPlaceholders": [
  {
    "placeholder": "{{INSERT_CONTACT_METHOD}}",
    "replacement": "kjaymiller@gmail.com"
  }
  ]
}
```

`codeOfConduct.defaultPlaceholders` is an array of objects with the properties `placeholder` and `replacement`. The `placeholder` property is the placeholder AS IT APPEARS IN THE TEMPLATE (BRACES INCLUDED).  `replacement` is the value that will be offered as a default in the template.

## Templates
A list of the templates can be found in </src/codesofConduct> or you can view the list in </src/manifests.ts>. The templates are as-written with the exception of organizational specifics being generalized and being replaced and Attributtion being given to the original source.Placeholders being wrapped with double braces to conform to the extension's formatting.


## Inspiration:
* [original project](https://github.com/cg-cnu/vscode-add-conduct) by [@cg_cnu](https://github.com/cg-cnu) 
