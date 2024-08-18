import React, {useEffect, useState} from 'react';
import unPressedBtn from "./../../assets/button/ButtonUnPressed.svg"
import pressedBtn from "./../../assets/button/ButtonPressed.svg"
import Button from "../ui/button/Button.jsx";
import classes from "./style.module.css";
import {apiService} from "../../service/service.js";
import {useSelector} from "react-redux";
import {useCountUp} from "react-countup";
import useTelegram from "../../hooks/useTelegram.js";
import audio from "./../../assets/audios/redButtonClickAudio.mp3"
import useSound from 'use-sound';

const BigRedButton = ({setCountOfCoins, setDayStreak, counterElement}) => {
    const [play] = useSound(audio);
    const {tg}=useTelegram()

    const {user} = useSelector(state => state.user)

    const [isBtnPressed, setIsBtnPressed] = useState(!user.isClickAvailable)
    const [wordsShown, setWordsShown] = useState(0)


    const showText = () => {
        setWordsShown(prevState => prevState + 1)
        let timerId = setInterval(() => setWordsShown(prevState => prevState + 1), 300);
        setTimeout(() => {
            clearInterval(timerId);
        }, 1800);
    }
    const {start} = useCountUp({
        ref: counterElement,
        start: Number(user.balance),
        end: Number(user.balance) + Number(user.clickReward),
        duration: 5,
        separator: " ",
        onEnd: () => {
            setCountOfCoins(Number(user.balance) + Number(user.clickReward))
        }
    });
    const addCoins = () => {
        start()
    }

    const clickHandler = () => {
        setIsBtnPressed(prevState => !prevState)
        showText()
        setDayStreak(prev => prev + 1)
        addCoins()
        apiService.handleClick()
        tg.HapticFeedback.notificationOccurred('success')
        play()

    }
    useEffect(() => {
        if (isBtnPressed) {
            setWordsShown(6)
        }
    }, []);

    return (
        <div className={classes["bigRedButton_wrapper"]}>
            {isBtnPressed &&
                <p className={classes["bigRedButton_text"]}>
                    <span style={{color: "rgb(139, 141, 153)", opacity: wordsShown >= 1 ? "1" : "0"}}>Press </span>
                    <span style={{opacity: wordsShown >= 2 ? "1" : "0"}}>tomorrow </span>
                    <span style={{color: "var(--red-color)", opacity: wordsShown >= 3 ? "1" : "0"}}>or</span>
                    <span style={{color: "var(--red-color)", opacity: wordsShown >= 4 ? "1" : "0"}}> lose </span>
                    <span style={{color: "rgb(139, 141, 153)", opacity: wordsShown >= 5 ? "1" : "0"}}>all </span>
                    <span style={{color: "rgb(139, 141, 153)", opacity: wordsShown >= 6 ? "1" : "0"}}>$RED</span>
                </p>}
            <Button className={classes['bigRedButton-button']} disabled={isBtnPressed} onClick={clickHandler}>
                <div className={classes['bigRedButton_img']}>
                    {!isBtnPressed && <img src={unPressedBtn} alt=""/>}
                    <img style={isBtnPressed ? {opacity: "1"} : {opacity: "0"}} src={pressedBtn} alt=""/>
                </div>
            </Button>
        </div>
    );
};

export default BigRedButton;