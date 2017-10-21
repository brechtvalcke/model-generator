module.exports = {
    Name : 'Text',
    Validate : (value,propName) => {
        const TextRe = /(?![`'"<>]).+|^/;
        if (!TextRe.test(value)) {
            throw Error(propName+' was not valid');
        }
        return true;
    }
}