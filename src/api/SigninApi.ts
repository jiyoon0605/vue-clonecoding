import client from '@/api/index';
import {submitForm} from '@/models/SigninModel';


export function authentication(data: submitForm) {
    client.post(`/1.0/auth?language=${data.language}`, data).then(() => alert("success"))
}