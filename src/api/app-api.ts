import axios, {AxiosResponse} from "axios";


export const instance = axios.create({
    baseURL: "https://t6-back.vercel.app"
})


export const appApi = {
    login(data: AuthDataType) {
        return instance.post<AuthDataType, AxiosResponse<LoginResponseType>>('/login', data)
    },
    getUsersNames() {
        return instance.get<string[]>('/getUsersNames')
    },
    sendMessage(data: MessageType) {
        return instance.post<MessageType, AxiosResponse<any>>('/send', data)
    },
    getIncomingMessages(username: string | null) {
        return instance.get<getIncomingMessagesResponseType>(`/getIncomingMess/${username}`)
    },
    getOutgoingMessages(username: string) {
        return instance.get<getOutgoingMessagesResponseType>(`/getOutgoingMess/${username}`)
    }
}

export type AuthDataType = {
    username: string
}

export type LoginResponseType = {
    token: string;
    user: UserType;
}
export type UserType = {
    _id: string;
    username: string;
    incomingMess: string[];
    outgoingMess: string[];
    __v: number;
}

export type MessageType={
    sender: string
    recipient: string
    subject: string
    message: string
    date?: string;
    _id?: string;
}

type getOutgoingMessagesResponseType = {
	outgoingMess: MessageType[];
}

type getIncomingMessagesResponseType = {
    incomingMess: MessageType[];
}






