let glob = require("glob");
let DefaultValidators = [];
let Validator;
       
Validator = require('./base64');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./dateTime');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./defaultPassword');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./email');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./lettersAndNumbers');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./LettersOnly');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./nationalRegistryNumberBE');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./numbersOnly');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./phoneNumber');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./required');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./string');
DefaultValidators[Validator.Name] = Validator;
Validator = require('./text');
DefaultValidators[Validator.Name] = Validator;




module.exports = DefaultValidators;