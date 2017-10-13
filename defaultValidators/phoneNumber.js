module.exports = {
    Name : 'PhoneNumber',
    Validate : (value,propName) => {
        const PhoneNumberRe = /^[\-\(\)\.\/\s0-9]+$/;
        if (!PhoneNumberRe.test(value)) {
            throw Error(propName+' was not valid');
        }
        return true;
    }
}