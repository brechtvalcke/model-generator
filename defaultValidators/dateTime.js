module.exports = {
    Name : 'DateTime',
    Validate : (value) => {
        const dateTimeRe = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2})/;
        if (!dateTimeRe.test(value)) {
            throw Error('Property was not valid');
        }
        return true;
    }
}