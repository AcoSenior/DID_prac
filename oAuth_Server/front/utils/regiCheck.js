
export const pwdCheck = (pwd) => {
    const pwdCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$/
    if(!pwdCheck.test(pwd)) {
        return false
    }
    return true;
}

export const phoneCheck = (phoneNum) => {
    const phoneCheck = /^[0-9]+/g;
    if(!phoneCheck.test(phoneNum)) {
        return false
    }
    return true
}