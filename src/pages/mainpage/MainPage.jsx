import React, {useState} from 'react';
import classes from "./style.module.css";
import coinsImg from "./../../assets/coinImg.svg"
import BigRedButton from "../../components/bigredbutton/BigRedButton.jsx";
import cn from "classnames";

import Button from "../../components/ui/button/Button.jsx";
import {botUrl} from "../../consts/appConsts.js";
import useTelegram from "../../hooks/useTelegram.js";
import {useSelector} from "react-redux";
import CountUp from "react-countup";

const MainPage = () => {
    const {user} = useSelector(state => state.user)
    const {tg} = useTelegram()

    const [countOfCoins, setCountOfCoins] = useState(user.balance)
    const [dayStreak, setDayStreak] = useState(user.dailyStreak)
    const [invites, setInvites] = useState(user.referralsCount)

    const [isRefLinkCopied, setIsRefLinkCopied] = useState(false)

    const handleCopy = async () => {
        setIsRefLinkCopied(true)
        if (tg.platform==="weba"){
            tg.openTelegramLink(`https://t.me/share/${botUrl}&text=Press or lose ‼️🧨 Earn $RED 🔴
            
            ${botUrl}?startapp=${user.referralCode}`)
            return
        }
        if (tg.platform==="tdesktop"){
            await navigator.clipboard.writeText(`
        Press or lose ‼️🧨 Earn $RED 🔴
        
        ${botUrl}?startapp=${user.referralCode}`);
            return
        }
        /// если мобилка и не важно какая
        tg.openTelegramLink("https://t.me/share/url?url=https://t.me/my_bot&text=hello_world")
        tg.HapticFeedback.notificationOccurred('success')
        /// если мобилка и не важно какая
        await navigator.clipboard.writeText(`
        Press or lose ‼️🧨 Earn $RED 🔴
        
        (${botUrl}?startapp=${user.referralCode})`);

        setTimeout(() => {
            setIsRefLinkCopied(false)
        }, 10000)
    }
    const [counterElement, setCounterElement] = useState({})
    return (
        <div className={classes['page']}>
            <div className={classes['coin-count-container']}>
                <img src={coinsImg} alt=""/>
                <CountUp
                    start={Number(countOfCoins)}
                    separator=" ">
                    {({countUpRef, start}) => {
                        setCounterElement(countUpRef)
                        return (
                            <div>
                                <p className={classes["coin-count-container__text"]} ref={countUpRef}></p>
                            </div>
                        )
                    }}
                </CountUp>
            </div>
            <div className={classes['button-area']}>
                <BigRedButton counterElement={counterElement} setDayStreak={setDayStreak}
                              setCountOfCoins={setCountOfCoins}/>
            </div>
            <div className={classes['statistics']}>
                <div className={classes['statistics__window']}>
                    <p className={classes['statistics__window-header']}>
                        Streak <span>+({Number(user.clickReward).toLocaleString('ru')} $RED)</span>
                    </p>
                    <p className={classes['statistics__window__stat']}>{dayStreak} 🧨</p>
                </div>
                <div className={classes['statistics__window']}>
                    <p className={cn(classes['statistics__window-header'], `${classes['statistics__window-header__invites']}`)}>
                        Invite <span>({invites})</span>
                    </p>
                    <Button
                        disabled={isRefLinkCopied}
                        onClick={handleCopy}
                        className={classes['statistics__window__btn']}>
                        {isRefLinkCopied ?
                            <p className={classes["statistics__window__btn--disabled"]}>Copied</p>
                            :
                            <>(+{Number(user.referralReward).toLocaleString('ru')} $RED)</>}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default MainPage;