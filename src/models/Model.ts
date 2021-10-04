export interface SignInSubmitForm {
    language: string,
    userId: string,
    password: string
}
export interface FindPasswordSubmitForm{
    language: string,
    email:string,
}

export interface ApiResponse {
    data: any;
    success: boolean;
    errCode: number;
    errorDetails: string;
    errMsg: string;
}
