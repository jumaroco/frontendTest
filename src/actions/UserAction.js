import HttpClient from '../services/HttpClient';

export const loginUser = user => {
    return new Promise((resolve, eject) => {
        HttpClient.post('/api/account/login', user).then(response => {
            resolve(response);
        })
        .catch(error => {
            resolve(error.response);
        });
    })
}