import client from '@/api/index';
import {ApiResponse, FindPasswordSubmitForm} from '@/models/Model';
import {AxiosResponse} from 'axios';


export function findPassword(data: FindPasswordSubmitForm): Promise<AxiosResponse<ApiResponse>> {
    return client.get(`/1.0/users/${data.email}/password?language=${data.language}/`);
}