import axios from "axios";

const authAPI = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});

export const doSignup = async (inputValues) => {
    const response = await authAPI.post(process.env.REACT_APP_AUTH_SIGNUP, inputValues);
    return response.data;
}

export const doLogin = async (inputValues, spinnerRef) => {
    authAPI.interceptors.request.use((config) => {
        if(spinnerRef && spinnerRef.current) {
            spinnerRef.current.style.display = "inline-block";
        }
        
        return config;
    }, (error) => {
        if(spinnerRef && spinnerRef.current) {
            spinnerRef.current.style.display = "none";
        }

        return Promise.reject(error);
    });

    authAPI.interceptors.response.use((response) => {
        if(spinnerRef && spinnerRef.current) {
            spinnerRef.current.style.display = "none";
        }

        return response;
    }, (error) => {
        if(spinnerRef && spinnerRef.current) {
            spinnerRef.current.style.display = "none";
        }
        
        return Promise.reject(error);
    });   

    const response = await authAPI.post(process.env.REACT_APP_AUTH_LOGIN, inputValues);
    return response.data;
}
