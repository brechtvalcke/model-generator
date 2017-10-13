module.exports = {
    Name : 'DateTime',
    Validate : (value,propName) => {
        const dateTimeRe = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        if (!dateTimeRe.test(value)) {
            throw Error(propName+' was not valid');
        }
        return true;
    }
}