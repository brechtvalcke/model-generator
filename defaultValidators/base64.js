module.exports = {
    Name : 'Base64',
    Validate : (value) => {
        const base64Re = /smt/;
        if (!base64Re.test(value)) {
            throw Error('Property was not valid');
        }
        return true;
    }
}