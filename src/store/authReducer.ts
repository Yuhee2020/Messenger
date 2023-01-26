import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {setAppError, setLoading} from "./appReducer";
import {appApi, AuthDataType, LoginResponseType} from "../api/app-api";
import {setMessages} from "./messagesReducer";


export const loginTC = createAsyncThunk("auth/login", async (params: AuthDataType, {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res = await appApi.login(params)
        if (res.status === 200) {
            localStorage.setItem("token", res.data.token)
            localStorage.setItem("userName", res.data.user.username)
            dispatch(setIsLogin(true))
            return res.data
        }
    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const logoutTC = createAsyncThunk("auth/logout", async (params, {dispatch}) => {
    dispatch(setLoading(true))
    try {
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
        dispatch(setIsLogin(false))
        dispatch(setMessages())

    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})

export const getUsersNamesTC = createAsyncThunk("auth/getNames", async (params, {dispatch}) => {
    dispatch(setLoading(true))
    try {
        const res = await appApi.getUsersNames()
        return res.data
    } catch (err: any) {
        dispatch(setAppError(err.response.data.message))
    } finally {
        dispatch(setLoading(false))
    }
})


export const slice = createSlice({
    name: "auth",
    initialState: {
        isLogin: false,
        user: null as null | LoginResponseType,
        usersNames:[] as string[]
    },
    reducers: {
        setIsLogin(state, action: PayloadAction<boolean>) {
            state.isLogin = action.payload
        },
        setUser(state, action: PayloadAction<LoginResponseType>) {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginTC.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload
            }
        })
        builder.addCase(getUsersNamesTC.fulfilled,(state,action)=>{
            if (action.payload) {
            state.usersNames=action.payload}
        })
    }
})

export const authReducer = slice.reducer
export const {setIsLogin, setUser} = slice.actions