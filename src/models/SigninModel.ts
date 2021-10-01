export interface SubmitForm {
    language: string,
    userId: string,
    password: string
}

export interface SignInResponse {
    data: any;
    success: boolean;
    errCode: number;
    errorDetails: string;
    errMsg: string;
}
