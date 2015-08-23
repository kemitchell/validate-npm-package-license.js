validate-npm-package-license
============================

Give me a string and I'll tell you if it's a valid npm package license string.

```javascript
var valid = require('validate-npm-package-license');
var assert = require('assert');

var validSPDXExpression = {
  validForNewPackages: true,
  validForOldPackages: true,
  spdx: true
};

// SPDX license identifier for common open-source licenses
assert.deepEqual(valid('MIT'), validSPDXExpression);
assert.deepEqual(valid('BSD-2-Clause'), validSPDXExpression);
assert.deepEqual(valid('Apache-2.0'), validSPDXExpression);
assert.deepEqual(valid('ISC'), validSPDXExpression);

// Simple SPDX license expression for dual licensing
assert.deepEqual(
  valid('(GPL-3.0 OR BSD-2-Clause)'),
  validSPDXExpression
);

// Refer to a non-standard license found in the package

assert.deepEqual(
  valid('SEE LICENSE IN LICENSE.txt'),
  {
    validForNewPackages: true,
    validForOldPackages: true,
    inFile: 'LICENSE.txt'
  }
);

assert.deepEqual(
  valid('SEE LICENSE IN license.md'),
  {
    validForNewPackages: true,
    validForOldPackages: true,
    inFile: 'license.md'
  }
);

// No license
var unlicensed = {
  validForNewPackages: true,
  validForOldPackages: true,
  unlicensed: true
};
assert.deepEqual(valid('UNLICENSED'), unlicensed);
assert.deepEqual(valid('UNLICENCED'), unlicensed);

// Almost a valid SPDX license identifier
assert.deepEqual(
  valid('Apache 2.0'),
  {
    validForOldPackages: false,
    validForNewPackages: false,
    warnings: [
      'license should be ' +
      'a valid SPDX license expression (without "LicenseRef"), ' +
      '"UNLICENSED", or ' +
      '"SEE LICENSE IN <filename>"',
      'license is similar to the valid expression "Apache-2.0"'
    ]
  }
);

var warningAboutLicenseRef = {
  validForOldPackages: false,
  validForNewPackages: false,
  spdx: true,
  warnings: [
    'license should be ' +
    'a valid SPDX license expression (without "LicenseRef"), ' +
    '"UNLICENSED", or ' +
    '"SEE LICENSE IN <filename>"',
  ]
};

// LicenseRef-* identifiers are valid SPDX expressions,
// but not valid in package.json
assert.deepEqual(
  valid('LicenseRef-Made-Up'),
  warningAboutLicenseRef
);
assert.deepEqual(
  valid('(MIT OR LicenseRef-Made-Up)'),
  warningAboutLicenseRef
);
```
