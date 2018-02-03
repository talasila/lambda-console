const defaultState = {
    userid: "",
    password: "",
    role: "",
    save: false
};

const login = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                awsExpirationDate: action.awsExpirationDate,
                awsAccessKeyId: action.awsAccessKeyId,
                awsSecretKey: action.awsSecretKey,
                awsSessionToken: action.awsSessionToken,
                userid: action.save ? action.userid : "",
                password: action.save ? action.password : "",
                role: action.save ? action.role : "",
                save: action.save
            }

        default:
            return state;
    }
}

export default login;