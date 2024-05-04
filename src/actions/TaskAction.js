import HttpClient from '../services/HttpClient';

export const getTasks = () => {
    return new Promise((resolve, eject) => {
        HttpClient.get('/api/tareas').then(response => {
            resolve(response);
        });
    })
};