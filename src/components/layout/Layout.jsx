import React, {Suspense} from 'react';
import {Outlet} from "react-router-dom";
import classes from "./style.module.css";

import Loader from "./Loader.jsx";

const Layout = () => {
    return (
        <div className={classes['layoutS']}>
            {/*<NavBar/>*/}
            <div className={classes["page_wrapper"]}>
                {/*<Header/>*/}
                <div className={classes["page"]}>
                    <Suspense fallback={<Loader/>}>
                        <Outlet/>
                    </Suspense>
                </div>
                {/*<Footer/>*/}
            </div>

        </div>
    );
};

export default Layout;