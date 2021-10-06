import client from '@/api/index';
import {SenderResponse} from '@/models/Model';
import {AxiosResponse} from 'axios';


export function getSenderList(): Promise<AxiosResponse<SenderResponse>> {
    const userKey = sessionStorage.getItem('userKey');
    return client.get(`/1.1/sponsors/1/users/${userKey}/senders?pageNo=1&rowCount=10`)
}

