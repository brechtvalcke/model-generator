module.exports = {
    Name : 'Text',
    Validate : (value) => {
        const TextRe = /(?![`'"<>]).+/;
        if (!TextRe.test(value)) {
            throw Error('Property was not valid');
        }
        return true;
    }
}