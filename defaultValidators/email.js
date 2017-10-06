module.exports = {
    Name : 'Email',
    Validate : (value) => {
        const emailRe = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailRe.test(value)) {
            throw Error('Property has to be a valid email');
        }
        return true;
    }

}