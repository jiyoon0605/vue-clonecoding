enum Gender {
    Non, Male, FeMale
}

export interface SignupFormData {
    [index: string]: any,

    username: string,
    id: string,
    password: string,
    isStudent: boolean,
    admissionDay: Date,
    graduatedDay: Date,
    purposes: string[],
    gender: Gender,
}


export interface UserPurposeResponse {
    purposes: string[];
}

export interface SignupResult {
    result: "success" | "failure",
    message: string
}

export interface WarningMessageData {
    keyName: string,
    visible: boolean,
    message: string,
    closed: boolean,
}