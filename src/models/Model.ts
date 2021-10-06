export interface SignInSubmitForm {
    language: string,
    userId: string,
    password: string
}

export interface FindPasswordSubmitForm {
    language: string,
    email: string,
}

export interface ApiResponse {
    data: any,
    success: boolean,
    errCode: number,
    errorDetails: string,
    errMsg: string,
    userKey: number
}

export interface Sponsor {
    sponsorKey: number,
    sponsorName: string,
    meddraLang: string
}

export interface Sender {
    deleted: boolean,
    SENDER_KEY: number,
    SND_ORGAN: string,
    SND_TYPE: string,
}

export interface SenderResponse {
    data: {
        senders: Sender[]
    },
    elapsedTime: number,
    responseAppendix: string

}