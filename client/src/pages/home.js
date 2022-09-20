import * as React from 'react';
import * as M from '@mui/material';
import * as Icons from '@mui/icons-material';
import {motion} from 'framer-motion';
import Navigation from '../components/navigation';
import Welcome from '../components/welcome';

export default function Home() {
    var [loggedIn, setLoggedIn] = React.useState(true);
    if(localStorage.getItem('userInformation') && !loggedIn) setLoggedIn(true);

    return(
        <div>
            {loggedIn? <div>
                <Navigation />
                <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: -100, opacity: "0%"}}>
                    <M.Paper elevation={3} sx={{width:"95%", height:"300px", margin: "auto"}}>
                        <M.Typography variant='p'>آخر 5 رسائل أرسلتها</M.Typography>
                    </M.Paper>
                </motion.div>

            </div> : <Welcome />}
        </div>
    )
}