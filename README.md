validate-npm-package-license
============================

Give me a string and I'll tell you if it's a valid npm package license string.

<!-- js var valid = require('./'); -->

```js
var validResult = {
  validForNewPackages: true,
  validForOldPackages: true
};

// SPDX license identifier for a common license
valid('Apache-2.0'); // => validResult

// Simple SPDX license expression for dual licensing
valid('(GPL-3.0 OR BSD-2-Clause)'); // => validResult

// Refer to a non-standard license found in the package
valid('SEE LICENSE IN LICENSE.txt'); // => validResult
valid('SEE LICENSE IN license.md'); // => validResult

// No license
valid('UNLICENSED'); // => validResult
valid('UNLICENCED'); // => validResult

var warnWithSuggestion = {
  validForOldPackages: false,
  validForNewPackages: false,
  warnings: [
    'license should be ' +
    'a valid SPDX license expression without "LicenseRef", ' + 
    '"UNLICENSED", or ' +
    '"SEE LICENSE IN <filename>"',
    'license is similar to the valid expression "Apache-2.0"'
  ]
};

// Almost a valid SPDX license identifier
valid('Apache 2.0'); // => warnWithSuggestion

var warnAboutLicenseRef = {
  validForOldPackages: false,
  validForNewPackages: false,
  warnings: [
    'license should be ' +
    'a valid SPDX license expression without "LicenseRef", ' + 
    '"UNLICENSED", or ' +
    '"SEE LICENSE IN <filename>"',
  ]
};

// LicenseRef-* identifiers are valid SPDX expressions,
// but not valid in package.json
valid('LicenseRef-Made-Up'); // => warnAboutLicenseRef
valid('(MIT OR LicenseRef-Made-Up)'); // => warnAboutLicenseRef
```
