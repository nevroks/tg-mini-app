import {createAsyncThunk, createSlice,} from '@reduxjs/toolkit'
import {baseUrl} from "../../consts/appConsts.js";
import {HttpCode} from "../../consts/httpConsts.js";


export const fetchConfig = createAsyncThunk(
    "user/fetchConfig",
    async function (props, {rejectWithValue}) {
        try {
            const response = await fetch(baseUrl + "/red/api/common/configs", {
                method: "GET",
                headers: {
                    "Content-type": "application/json",
                    'ngrok-skip-browser-warning': "any-value",
                }
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
    config: {},
    status: null,
    error: null

}
export const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setConfig: (state, {payload}) => {
            state.config = payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConfig.pending, (state) => {
                state.status = "loading";
                state.error = null
            })
            .addCase(fetchConfig.fulfilled, (state, {payload}) => {
                state.status = "resolved"
                state.config = payload
            })
            .addCase(fetchConfig.rejected, (state, {payload}) => {
                state.status = "rejected"
                state.error = payload
            })
    }
})

// Action creators are generated for each case reducer function
export const {setConfig} = configSlice.actions

export default configSlice.reducer