export const login = (userid, password, role, save) => {
    return {
        type: "LOGIN",
        userid,
        password,
        role,
        save,
        awsExpirationData: "",
        awsAccessKeyId: "",
        awsSecretKey: "",
        awsSessionToken: ""
    };
}