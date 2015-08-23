validate-npm-package-license
============================

Give me a string and I'll tell you if it's a valid npm package license string.

```javascript
var valid = require('validate-npm-package-license');
var assert = require('assert');

var noWarnings = {
  validForNewPackages: true,
  validForOldPackages: true
};

// SPDX license identifier for common open-source licenses
assert.deepEqual(valid('MIT'), noWarnings);
assert.deepEqual(valid('BSD-2-Clause'), noWarnings);
assert.deepEqual(valid('Apache-2.0'), noWarnings);
assert.deepEqual(valid('ISC'), noWarnings);

// Simple SPDX license expression for dual licensing
assert.deepEqual(valid('(GPL-3.0 OR BSD-2-Clause)'), noWarnings);

// Refer to a non-standard license found in the package
assert.deepEqual(valid('SEE LICENSE IN LICENSE.txt'), noWarnings);
assert.deepEqual(valid('SEE LICENSE IN license.md'), noWarnings);

// No license
assert.deepEqual(valid('UNLICENSED'), noWarnings);
assert.deepEqual(valid('UNLICENCED'), noWarnings);

var warningsWithSuggestion = {
  validForOldPackages: false,
  validForNewPackages: false,
  warnings: [
    'license should be ' +
    'a valid SPDX license expression (without "LicenseRef"), ' +
    '"UNLICENSED", or ' +
    '"SEE LICENSE IN <filename>"',
    'license is similar to the valid expression "Apache-2.0"'
  ]
};

// Almost a valid SPDX license identifier
assert.deepEqual(valid('Apache 2.0'), warningsWithSuggestion);

var warningAboutLicenseRef = {
  validForOldPackages: false,
  validForNewPackages: false,
  warnings: [
    'license should be ' +
    'a valid SPDX license expression (without "LicenseRef"), ' +
    '"UNLICENSED", or ' +
    '"SEE LICENSE IN <filename>"',
  ]
};

// LicenseRef-* identifiers are valid SPDX expressions,
// but not valid in package.json
assert.deepEqual(valid('LicenseRef-Made-Up'), warningAboutLicenseRef);
assert.deepEqual(valid('(MIT OR LicenseRef-Made-Up)'), warningAboutLicenseRef);
```
