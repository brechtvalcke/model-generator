module.exports = {
    Name : 'String',
    Validate : (value,propName) => {
        const stringRe = /^(?:(?![×Þß÷þø])[-a-zA-ZÀ-ÿ.]|^)$/;
        if (!stringRe.test(value)) {
            throw Error(propName+' was not valid');
        }
        return true;
    }
}
