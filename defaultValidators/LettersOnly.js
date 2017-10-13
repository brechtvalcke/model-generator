module.exports = {
    Name : 'LettersOnly',
    Validate : (value,propName) => {
        const lettersOnlyRe = /^[A-Za-z]+$/;
        if (!lettersOnlyRe.test(value)) {
            throw Error(propName+' was not valid');
        }
        return true;
    }
}