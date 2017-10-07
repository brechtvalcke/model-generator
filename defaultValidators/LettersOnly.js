module.exports = {
    Name : 'LettersOnly',
    Validate : (value) => {
        const lettersOnlyRe = /^[A-Za-z]+$/;
        if (!lettersOnlyRe.test(value)) {
            throw Error('Property was not valid');
        }
        return true;
    }
}