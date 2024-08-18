import {Route, Routes} from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import {lazy, useEffect} from "react";
import useTelegram from "./hooks/useTelegram.js";
import {useDispatch, useSelector} from "react-redux";
import {fetchUser} from "./store/slices/userSlice.js";
import {fetchConfig} from "./store/slices/configSlice.js";
import Loader from "./components/layout/Loader.jsx";

const MainPage = lazy(() => import("./pages/mainpage/MainPage.jsx"))

function App() {
    const {tg,user} = useTelegram()
    const dispatch = useDispatch()
    // user
    const {status, error} = useSelector(state => state.user)
    // user
    const configStatus = useSelector(state => state.status)
    useEffect(() => {
        tg.setHeaderColor("rgb(22, 26, 51)")
        tg.setBackgroundColor("rgb(22, 26, 51)")
        tg.expand()

        dispatch(fetchUser())
        dispatch(fetchConfig())
    }, [])
    // Обработчик ошибки пользователя
    // if (error){
    //     return <h1>{error}</h1>
    // }
    // Обработчик ошибки конфига
    // if (configStatus==="rejected"){
    //
    // }
    if (configStatus === "loading" || status === "loading") {
        return <Loader/>
    }
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<MainPage/>}/>
            </Route>
        </Routes>
    )
}

export default App
