## Adding a Code of Conduct Option

### Requirements
For a code of conduct to be considered it must be:

- The Original Source (unless the original cannot be produced) or a Modified Version that is deviates from the original enough to be unique.

- Licensed with a Creative Commons or Allowing License.

### Directions for Adding a Code of Conduct

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

If there is no version, use `0.0`.

Add a copy of the code of conduct to the `src/codesOfConduct` directory and use the relative path for the `body` section.

Update the CodeofConduct so that any references (except attribution) to the company/product/organization are replace with placeholders.

Placeholders use:
- ALL_CAPS
- SEPARATE_OPTIONS with the PIPE (|) character
- UNDERSCORES instead of spaces

Example:

```
{{COMMUNITY_NAME|ORGANIZATION_NAME}} is a {{COMMUNITY|ORGANIZATION}} based in {{LOCATION_CITY}},{{LOCATION_REGION|LOCATION_COUNTRY}}.
```

Add attribution to the original if one doesn't exist. Use the following text. 

```
## Attribution
This Code of Conduct has been adapted from the <CODE OF CONDUCT NAME>(<LINK TO ORIGINAL>) and is licensed under a [<LICENSE NAME AND VERSION>](<LINK TO LICENSE>)
```