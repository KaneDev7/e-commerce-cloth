
type DateUtc = string

export type UserDataLogin = {
    identifier: string,
    password: string
}

export type UserDataRgister = {
    username: string
    email: string
    password: string
    confirmPassword: string
}

export type User = {
    id: number
    username: string
    email: string
    blocked: boolean
    confirmed: boolean
    createdAt: DateUtc
    provider: string
    updatedAt: DateUtc
}

export type UserDataResponse = {
jwt : string,
user: User
}

