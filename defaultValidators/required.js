module.exports = {
    Name : 'Required',
    Validate : (value,propName) => {
        if (value === undefined || value === null) {
            throw Error(propName+' is required but is not set');
        }
        return true;
    }

}