 export const validateRequiredField = (value, label ="field") => {
    let error;
    if (!value) {
        error = `${label}Required`;
    }
    return error;
}

export const validateEmail = (value, label ="Email") => {
    let error;
    if (!value) {
        error = `${label}Required`;
    } else if (!isEmail(value)) {
        error = `${label}Invalid`;
    }
    return error;
}