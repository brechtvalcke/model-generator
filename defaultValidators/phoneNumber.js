module.exports = {
    Name : 'PhoneNumber',
    Validate : (value) => {
        const PhoneNumberRe = /^[\-\(\)\.\/\s0-9]+$/;
        if (!PhoneNumberRe.test(value)) {
            throw Error('Property was not valid');
        }
        return true;
    }
}