validate-npm-package-license
============================

Give me a string and I'll tell you if it's a valid npm package license string.

<!-- js var valid = require('./'); -->

```js
var validResult = {
  validForNewPackages: true,
  validForOldPackages: true
};

valid('Apache-2.0'); // => validResult
valid('(GPL-3.0 OR BSD-2-Clause)'); // => validResult

valid('UNLICENSED'); // => validResult
valid('UNLICENCED'); // => validResult

valid('SEE LICENSE IN LICENSE.txt'); // => validResult

var invalidResult = {
  validForOldPackages: false,
  validForNewPackages: false,
  warnings: [
    'license should be a valid SPDX license expression, "UNLICENSED", or "SEE LICENSE IN <filename>"',
	'license is similar to the valid expression "Apache-2.0"'
  ]
};

valid('Apache 2.0'); // => invalidResult
```
