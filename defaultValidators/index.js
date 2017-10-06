let glob = require("glob");
let DefaultValidators = [];

glob.sync('defaultValidators/!(index).js').forEach((route) => {
        let Validator = require("../"+route);
        DefaultValidators[Validator.Name] = Validator;
});

module.exports = DefaultValidators;