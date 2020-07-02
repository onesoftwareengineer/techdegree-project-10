import axios from 'axios';
const baseUrl = 'http://localhost:5000/';

//writing function to handle all types of requests
export default async function axiosRequest (
    requestType, 
    requestUrl,
    requiresAuthentication = null,
    credentials = null,
    body = null
) {

    let options = {
        method: requestType,
        url: baseUrl + requestUrl,
    };

    //if authentication is required, encode credentials and add them to the Authorization header
    if(requiresAuthentication) {
        const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    //if body is not empty, then stringify it in json format
    if(!body) {
        options.body = JSON.stringify(body);
    };

    return axios(options);
};