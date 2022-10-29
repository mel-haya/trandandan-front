import axios from 'axios';
import Cookies from 'js-cookie';

let $token:string = Cookies.get('accessToken') === undefined ? '' : Cookies.get('accessToken')!;

function updateToken(){
    $token = Cookies.get('accessToken')!
    $api = axios.create({
        baseURL: `http://${process.env.VUE_APP_APP_NAME}:${process.env.VUE_APP_HOST_PORT}`,
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + $token
        }
    });
}

let $api = axios.create({
    baseURL: `http://${process.env.VUE_APP_APP_NAME}:${process.env.VUE_APP_HOST_PORT}`,
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + $token
    }
});

export {$api, $token, updateToken};