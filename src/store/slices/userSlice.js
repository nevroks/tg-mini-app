import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit'
import useTelegram from "../../hooks/useTelegram.js";
import {baseUrl} from "../../consts/appConsts.js";
import {HttpCode} from "../../consts/httpConsts.js";


export const fetchUser = createAsyncThunk(
    "user/fetchUser",
    async function (props, {rejectWithValue}) {
        try {
            const {tg, user} = useTelegram()

            const response = await fetch(baseUrl + "/red/api/users/auth", {
                method: "POST",
                headers: {
                    'X-T-Data': tg.initData,
                    "Content-type": "application/json",
                    'ngrok-skip-browser-warning': "any-value",
                },
                body: JSON.stringify({
                    "referralCode": `${tg.initDataUnsafe.start_param}`,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "firstName": user.first_name,
                        "lastName": user.last_name,
                        "isPremium": user.is_premium === undefined ? false : true
                    }

                })
            })
            if (response.status !== HttpCode.SUCCESS) {
                throw new Error(`Server answered with ${response.status}`)
            }
            return response.json()

        } catch (e) {
            return rejectWithValue(e.message)
        }

    }
)
const initialState = {
    user: {},
    status: null,
    error: null

}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, {payload}) => {
            state.user = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = "loading";
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, {payload}) => {
                state.status = "resolved"
                state.user = payload
            })
            .addCase(fetchUser.rejected, (state, {payload}) => {
                state.status = "rejected"
                state.error = payload
            })
    }
})

// Action creators are generated for each case reducer function
export const {setUser} = userSlice.actions

export default userSlice.reducer