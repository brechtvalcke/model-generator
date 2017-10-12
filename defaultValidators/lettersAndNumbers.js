module.exports = {
    Name : 'LettersAndNumbersOnly',
    Validate : (value) => {
        const LANRe = /^([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)$/;
        if (!LANRe.test(value)) {
            throw Error('Property was not valid');
        }
        return true;
    }
}