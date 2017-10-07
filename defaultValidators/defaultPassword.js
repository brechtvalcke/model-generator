module.exports = {
    Name : 'DefaultPassword',
    Validate : (value) => {
        const passRe = /^(?=.{8,128})((?=.*\d)(?=.*[a-z])(?=.*[A-Z])|(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_])|(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])).*$/;
        if (!passRe.test(value)) {
            throw Error('Property has to be a valid password');
        }
        return true;
    }
}