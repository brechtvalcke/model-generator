module.exports = {
    Name : 'String',
    Validate : (value) => {
        const stringRe = /^(?:(?![×Þß÷þø])[-a-zA-ZÀ-ÿ.])$/;
        if (!stringRe.test(value)) {
            throw Error('Property was not valid');
        }
        return true;
    }
}