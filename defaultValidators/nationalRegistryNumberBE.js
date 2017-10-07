module.exports = {
    Name : 'NationalRegistryNumberBE',
    Validate : (value) => {
        const NRNRe = /([0-9]{2}\.?){3}\-?[0-9]{3}\.?[0-9]{2}/;
        if (!NRNRe.test(value)) {
            throw Error('Property was not valid');
        }
        return true;
    }
}