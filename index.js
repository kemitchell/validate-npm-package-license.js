var spdx = require('spdx');
var correct = require('spdx-correct');

var validResult = {
  validForNewPackages: true,
  validForOldPackages: true
};

var fileReferenceRE = /^SEE LICEN[CS]E IN (.+)$/;

module.exports = function(argument) {
  if (spdx.valid(argument)) {
    return validResult;
  } else if (
    argument === 'UNLICENSED' ||
    argument === 'UNLICENCED' ||
    fileReferenceRE.test(argument)
  ) {
    return validResult;
  } else {
    var warnings = [
      'license should be a valid SPDX license expression, ' + 
      '"UNLICENSED", or ' +
      '"SEE LICENSE IN <filename>"',
    ];
    var corrected = correct(argument);
    if (corrected) {
      warnings.push(
        'license is similar to the valid expression "' + corrected + '"'
      );
    }
    return {
      validForOldPackages: false,
      validForNewPackages: false,
      warnings: warnings
    };
  }
};
