import axios from "axios";
import { isLoggedIn } from "./Utils";

const hostAPI = axios.create({
    baseURL: process.env.REACT_APP_API_HOST,
});

export const removeItem = async (id) => {
    hostAPI.defaults.headers.common['Authorization'] =
        localStorage.getItem('tokenType') + ' ' + localStorage.getItem('token');
    
    const response = await hostAPI.delete(process.env.REACT_APP_REMOVE_TRADE + id);
    return response.data;
};

export const removeAll = async () => {
    hostAPI.defaults.headers.common['Authorization'] = 
        localStorage.getItem('tokenType') + ' ' + localStorage.getItem('token');
    
    const response = await hostAPI.delete(process.env.REACT_APP_REMOVE_ALL_TRADES);
    return response.data;
};

export const fetchSummary = async (summaryRequest) => {
    if(!isLoggedIn()) {
        return {};
    }

    const authHeader = localStorage.getItem('tokenType') + ' ' + localStorage.getItem('token');
    hostAPI.defaults.headers.common['Authorization'] = authHeader;
        
    const response = await hostAPI.post(process.env.REACT_APP_FETCH_CURRENCY_TRADES, summaryRequest, {
        headers: {
            'Authorization': authHeader
        }
    });
    if(response.status === 200) {
        return response.data;
    }

    return {};
};

export const fetchAllTradeData = async () => {

    if(!localStorage.getItem('token')) {
        return [];
    }

    const authHeader = localStorage.getItem('tokenType') + ' ' + localStorage.getItem('token');

    hostAPI.defaults.headers.common['Authorization'] = authHeader;
        
    const response = await hostAPI.post(process.env.REACT_APP_FETCH_ALL_TRADES, {}, {
    // const response = await axios.post("http://localhost:8080/api/retrieve-data/get-all", {}, {
        headers: {
            'Authorization': authHeader
        }
    });
    if(response.status === 200) {
        return response.data;
    }

    return [];
};


export const doUploadCsv = async (file, inputValues, spinnerRef) => {
    const formsData = new FormData();
    formsData.append('file', file);
    formsData.append('skipHeadder', inputValues.skipHeadder);
    formsData.append('overrideSimilarRecords', inputValues.overrideSimilarRecords);
    hostAPI.defaults.headers.common['Authorization'] = 
        localStorage.getItem('tokenType') + ' ' + localStorage.getItem('token');
    
    hostAPI.interceptors.request.use((config) => {
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

    hostAPI.interceptors.response.use((response) => {
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

    const response = await hostAPI.post(process.env.REACT_APP_EXTRACT_UPLOAD, formsData);

    return response.data;
};


// eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhbmphbmExIiwiaWF0IjoxNjc3ODU4MjIxLCJleHAiOjE2Nzc5NDQ2MjEsIm5iZiI6MTY3Nzg1ODIyMn0.nwK9ycLlEVw4hn1oFc1jY--1ScDWqfuomIjgIsDhbfkbNwKc31en1Z9vhLAh0o09YN8kPQymjIZghSsguNfFYA
