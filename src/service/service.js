import useTelegram from "../hooks/useTelegram.js";
import {baseUrl} from "../consts/appConsts.js";
import {HttpCode} from "../consts/httpConsts.js";


export const apiService = {
    handleClick: async () => {
        const {tg, user} = useTelegram()

        const response = await fetch(baseUrl + "/red/api/orders", {
            method: "POST",
            headers: {
                'X-T-Data': tg.initData,
                "Content-type": "application/json",
                'ngrok-skip-browser-warning': "any-value",
            },
            body: JSON.stringify({
                "type": "click"
            })
        })
        if (response.status !== HttpCode.SUCCESS) {
            throw new Error(`Server answered with ${response.status}`)
        }
        return response.json()
    }
}