## Adding a Code of Conduct Option

## Requirements
Requirements for a code of conduct to be added to the list of options:

- An Option by GitHub through their [API](https://api.github.com/codes_of_conduct)

Include the following parameters in the addition. `name`, `url`, `body`, and `version`.

If replacing an older version of the code of conduct, overwrite the existing record. 

```json
{
"name": "Contributor Covenant",
"url": "https://www.contributor-covenant.org",
"version": "2.1",
"body": "src/codesOfConduct/covenant.md"
}
``` 

Add a copy of the code of conduct to the `src/codesOfConduct` directory and use the relative path for the `body` section.

> **Note:** While we use GitHub to be the indicator, this many change in the future as more knowledge around CoC options is gathered.

