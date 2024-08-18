import React, {useEffect, useState} from 'react';
import classes from "./style.module.css";

const Loader = () => {
    const [stage, setStage] = useState(0)

    const startLoader = () => {
        let timerId = setInterval(() => {
            setStage(prevState => prevState + 1)
        }, 300);
        setTimeout(() => {
            clearInterval(timerId);
        }, 10000);

    }
    if (stage > 3) {
        setStage(0)
    }
    useEffect(() => {
        startLoader()
    }, []);


    return (
        <div className={classes['loader']}>
            <p className={classes["loader--text"]}>
                <span style={stage === 1 ? {opacity: "1"} : {opacity: "0.25"}}>R</span>
                <span style={stage === 2 ? {opacity: "1"} : {opacity: "0.25"}}>E</span>
                <span style={stage === 3 ? {opacity: "1"} : {opacity: "0.25"}}>D</span>
            </p>
        </div>
    );
};

export default Loader;