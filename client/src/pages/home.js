import * as React from 'react';
import * as M from '@mui/material';
import * as Icons from '@mui/icons-material';
import {motion} from 'framer-motion';
import Navigation from '../components/navigation';
import Welcome from '../components/welcome';
import axios from 'axios';
import Archieve from '../components/archieve';

export default function Home() {
    var [loggedIn, setLoggedIn] = React.useState(false);
    if(localStorage.getItem('userInformation') && !loggedIn) setLoggedIn(true);
    return(
        <div>
            {loggedIn? <div>
                <Navigation />
                <Archieve />
            </div> : <Welcome />}
        </div>
    )
}