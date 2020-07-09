import axios from 'axios';
const baseUrl = 'http://localhost:5000';

//writing function to handle all types of requests
export default async function axiosRequest (
    requestType, 
    requestUrl,
    requiresAuthentication = null,
    credentials = null,
    body = null,
) {    
    let options = {
        method: requestType,
        url: baseUrl + requestUrl,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
    };

    //if authentication is required, encode credentials and add them to the Authorization header
    if(requiresAuthentication) {
        const encodedCredentials = btoa(`${credentials.email}:${credentials.password}`);
        options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    //if body is not empty, then stringify it in json format and add content header
    if(body !== null) {
        options.data = JSON.stringify(body);
    };
    
    console.log('axios request will be sent now with the following options: ', options);

    return axios(options);
};