module.exports = {
    Name : 'NumbersOnly',
    Validate : (value,propName) => {
        const numbersOnlyRe = /^[0-9\.\,]+$/;
        if (!numbersOnlyRe.test(value)) {
            throw Error(propName+' was not valid');
        }
        return true;
    }
}