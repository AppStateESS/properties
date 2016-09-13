class CheckValues {
    static isEmpty(value) {
        return value === '' || value === null;
    }

    static isEmail(value) {
        return value.match(/^[\w.%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i);
    }

    static isPhone(value) {
        return (value.replace(/[^\d]/, '').length >= 7);
    }

    static randomId() {
        return (Math.random().toString(36) + '00000000000000000').slice(2,
            10);
    }
}

export default CheckValues;
