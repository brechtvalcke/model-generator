module.exports = {
    Name : 'Required',
    Validate : (value) => {
        if (value === undefined || value === null) {
            throw Error('Property is required but is not set');
        }
        return true;
    }

}