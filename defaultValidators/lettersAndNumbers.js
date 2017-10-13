module.exports = {
    Name : 'LettersAndNumbersOnly',
    Validate : (value,propName) => {
        const LANRe = /^([a-zA-Z]+[0-9]+|[0-9]+[a-zA-Z]+)$/;
        if (!LANRe.test(value)) {
            throw Error(propName+' was not valid');
        }
        return true;
    }
}