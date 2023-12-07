import { userData } from "./userData.js";
const host = 'https://parseapi.back4app.com';

async function request (method, url, data) {
    const options = {
        method,
        headers: {}
    };

    options.headers['Content-type'] = 'application/json';
    options.headers['X-Parse-Application-Id'] = '7oU3WQvpSA3WsfLkF1JNCsi7DGfbCndlUDiHY5fJ';
    options.headers['X-Parse-REST-API-Key'] = '12AvWF2OoXnXTEIODCK6InnGCENc7ESFd29FwUfK';
    
    if (data){
        options.body = JSON.stringify(data);
    }
    
    const userInfo = userData.getData();
    // if (userInfo){

    // }

    try {
        const response = await fetch(host + url,options);
        if(response.ok != true){
            const error = await response.json();
            throw new Error (error.message);
        }

        if (response.status == 204){
            return response
        } else {
            return response.json()
        }
    } catch (error) {
        alert (error.message);
        throw error
    }
}

// export const get = request.bind(null,'get');
// export const post = request.bind(null,'post');
// export const put = request.bind(null,'put');
// export const del = request.bind(null,'delete');

export function get(url){
    return request('GET', url);
}
export function post(url, data){
    return request('POST',url, data);
}
export function put(url, data){
    return request('PUT',url, data);
}
export function del(url){
    return request('DELETE',url);
}

window.api = {
    request
};

// import * as api from "./api.js";

// window.api = api;