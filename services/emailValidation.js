function isValidEmail(email) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!email || typeof email !== 'string') {
        return false; // Email is missing or not a string
    }

    if (!email.match(emailPattern)) {
        return false; // Email does not match the expected format
    }

    return true; // Email is valid
}


module.exports = { isValidEmail };