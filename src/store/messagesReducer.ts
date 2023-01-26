import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {setAppError, setLoading, setSuccessMessage} from "./appReducer";
import {appApi, MessageType} from "../api/app-api";
import {FormikValuesType} from "../pages/messenger/sendingMesseges/SendingMessages";
import {StateType} from "./Store";


export const sendMessageTC = createAsyncThunk("messages/send", async (params: FormikValuesType, {
    dispatch,
}) => {
    dispatch(setLoading(true))
    try {
        const userName = localStorage.getItem("userName")
        if (userName) {
            const message = {...params, sender: userName}
            const res = await appApi.sendMessage(message)
            dispatch(setSuccessMessage(res.data.status))
        }
    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const getOutgoingMessagesTC = createAsyncThunk("messages/getOutgoingMessages", async (params, {
    dispatch,
}) => {
    try {
        const userName = localStorage.getItem("userName")
        if (userName) {
            const res = await appApi.getOutgoingMessages(userName)
            return res.data
        }
    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    }
})

export const getIncomingMessagesTC = createAsyncThunk("messages/getIncomingMessages", async (params, {
    dispatch,
}) => {
    try {
        const userName = localStorage.getItem("userName")
        const res = await appApi.getIncomingMessages(userName)
        return res.data
    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    }
})

export const getInMessIntervTC = createAsyncThunk("messages/getInMessInterv", async (params, {
    dispatch,
    getState
}) => {
    try {
        const userName = localStorage.getItem("userName")
        const res = await appApi.getIncomingMessages(userName)
        const state = getState() as StateType
        const messages = state.messages.incomingMess
        if (messages.length < res.data.incomingMess.length) {
            dispatch(setIsNewMessage(true))
        }
        return res.data

    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    }
})

export const slice = createSlice({
    name: "messages",
    initialState: {
        incomingMess: [] as MessageType[],
        outgoingMess: [] as MessageType[],
        isNewMessage: false
    },
    reducers: {
        setMessages(state) {
            state.incomingMess = []
            state.outgoingMess = []
        },
        setIsNewMessage(state, action) {
            state.isNewMessage = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getIncomingMessagesTC.fulfilled, (state, action) => {
            if (action.payload) state.incomingMess = action.payload.incomingMess
        })
        builder.addCase(getOutgoingMessagesTC.fulfilled, (state, action) => {
            if (action.payload) state.outgoingMess = action.payload.outgoingMess
        })
        builder.addCase(getInMessIntervTC.fulfilled, (state, action) => {
            if (action.payload) state.incomingMess = action.payload.incomingMess
        })
    }
})
export const {setMessages, setIsNewMessage} = slice.actions
export const messagesReducer = slice.reducer
