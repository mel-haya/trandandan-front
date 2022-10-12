import axios from 'axios';
import Cookies from 'js-cookie';

const $token:string = Cookies.get('accessToken') === undefined ? '' : Cookies.get('accessToken')!;

const $api = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + $token
    }
});

export {$api, $token};