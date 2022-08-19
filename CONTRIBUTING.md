## Adding a Code of Conduct Option


Include the following parameters in the addition. `label`, `detail`, `body`, and `description`.

- `label`: The name of the code of conduct.
- `detail`: The original URL of the code of conduct.
- `version`: The version of the code of conduct you're adding.
- `body`: the relative path to the markdown file containing the code of conduct.
- `description`: the description of the code of conduct.

If replacing an older version of the code of conduct, overwrite the existing record. 

### Requirements
- This project will only consider the latest version of an existing code of conduct.
- The code of conduct cannot be a duplicate of an existing code of conduct in the manifest.

### Example:
```json
{
    "label": "Contributor Covenant",
    "detail": "https://www.contributor-covenant.org",
    "version": "2.1",
    "body": "./codesOfConduct/covenant.md",
    "description": "General Code of Conduct"
}
``` 

### Add your Code of Conduct Template to the `CodesOfConduct` folder

Add a copy of the code of conduct to the `src/codesOfConduct` directory and use the relative path for the `body` section.

### Make sure the templates are formatted correctly

To ensure that the templates don't improperly interact with Markdown and feel as unique as possible, please make sure your template placeholders are formatted as follows:

- `{{ALL_CAPS_AND_UNDERSCORES}}`
- `{{DIFFERENT|OPTIONS|HERE}}`

Wrapped in double braces. All text in ALL CAPS with spaces as underscores.
Pipe (|) is also allowed.