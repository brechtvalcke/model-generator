module.exports = {
    Name : 'NumbersOnly',
    Validate : (value) => {
        const numbersOnlyRe = /^[0-9]+$/;
        if (!numbersOnlyRe.test(value)) {
            throw Error('Property was not valid');
        }
        return true;
    }
}