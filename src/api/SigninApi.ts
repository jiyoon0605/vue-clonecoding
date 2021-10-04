import client from '@/api/index';
import {ApiResponse, SignInSubmitForm} from '@/models/Model';
import {AxiosResponse} from 'axios';


export function authentication(data: SignInSubmitForm): Promise<AxiosResponse<ApiResponse>> {
    return client.post(`/1.0/auth?language=${data.language}`, data)
}