module.exports = {
    Name : 'Base64',
    Validate : (value,propName) => {
        const base64Re = /^[a-zA-z0-9-_]*$/;
        if (!base64Re.test(value)) {
            throw Error(propName+' was not valid');
        }
        return true;
    }
}