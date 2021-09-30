import {SignupFormData, SignupResult, UserPurposeResponse} from '@/models/SignupModel';


export default class SignupApi {

    public static checkId(id: string): Promise<null> {
        return new Promise((res, rej) => {
            id === 'qwer' ? rej() : res(null);
        })
    }

    public static getUserPurpose(): Promise<UserPurposeResponse> {
        return new Promise<UserPurposeResponse>((res) => {
            const data: UserPurposeResponse = {
                purposes: ['학습', '교육', '취미']
            }
            res(data);
        })
    }

    public static signUp(data: SignupFormData): Promise<SignupResult> {
        return new Promise<SignupResult>((res, rej) => {
            for (const key in data) {
                console.log(key, !data[key], data[key]);
                (!(typeof data[key] === 'boolean') && !data[key]) && rej({
                                                                             result: 'failure',
                                                                             message: `${key} is required`
                                                                         })
            }
            res({
                    result: 'success',
                    message: `Welcome ${data.username}!`
                });
        })
    }

}