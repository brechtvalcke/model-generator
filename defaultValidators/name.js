module.exports = {
    Name : 'Name',
    Validate : (value) => {
        const nameRe = /^(?:(?![×Þß÷þø])[-a-zA-ZÀ-ÿ])$/;
        if (!nameRe.test(value)) {
            throw Error('Property was not valid');
        }
        return true;
    }
}