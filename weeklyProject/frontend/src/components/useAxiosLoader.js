import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

const fileInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'multipart/form-data;'
    },
});

instance.interceptors.request.use(
    config => {
        // 요청을 보내기 전에 수행할 로직
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

instance.interceptors.response.use(
    config => {
        // 응답에 대한 로직
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject(error);
    }
)

export { instance, fileInstance };