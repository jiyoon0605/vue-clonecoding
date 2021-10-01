import client from '@/api/index';
import {SignInResponse, SubmitForm} from '@/models/SigninModel';
import {AxiosResponse} from 'axios';


export function authentication(data: SubmitForm): Promise<AxiosResponse<SignInResponse>> {
    return client.post(`/1.0/auth?language=${data.language}`, data)
}