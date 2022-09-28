import * as React from 'react';
import * as M from '@mui/material';
import * as Icons from '@mui/icons-material';
import {motion} from 'framer-motion';
import { display } from '@mui/system';

export default function UnAllowed(){
    return(
        <motion.div animate={{opacity: "100%"}} initial={{opacity: "0%"}}>
            <M.Paper elevation={5} sx={{width: "100%", height: "300px"}}>
                <M.Typography variant='h3' sx={{textAlign: "center", marginTop: "5%", paddingTop: "5%"}}>انت لست مصرح لعرض هذه الصفحة</M.Typography>
                <br />
                <M.Typography sx={{textAlign: "center"}} variant="h6">الرجاء {<M.Button href="/login">تسجيل الدخول</M.Button>} أو {<M.Button href="/">إنشاء حساب</M.Button>}</M.Typography>
            </M.Paper>
        </motion.div>
    );
}