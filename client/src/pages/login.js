import * as React from 'react';
import * as M from '@mui/material';
import * as Icons from '@mui/icons-material';
import axios from 'axios';
import {motion} from 'framer-motion';


export default function Login(){

    var [phoneNumber, setPhoneNumber] = React.useState(null);
    var [password, setPassword] = React.useState(null);
    var [error, setError] = React.useState();
    var handleLogin = async() =>{
        console.log(password, phoneNumber)
        await axios.post('http://localhost:8000/login', {phoneNumber, password})
        .then(result => {
            localStorage.setItem("userInformation", result);
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
            setError(
                <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: 100, opacity: "0%"}}>
                    <M.Alert severity="error">
                        <M.AlertTitle>خطأ</M.AlertTitle>
                            {error.response.data}
                    </M.Alert>
                </motion.div>
            )
        })
    }

    return (
        <motion.div animate={{opacity: "100%"}} initial={{opacity: "0%"}}>
            <M.Paper sx={{width: "100%", height: "400px", padding: "5%", marginTop: "9%"}}>
                <M.Typography>
                    <M.Typography variant='h6' sx={{textAlign: "center", marginTop: "10px"}}>
                        تسجيل الدخول
                    </M.Typography>
                    <br />
                    <M.Box sx={{ display: 'flex', alignItems: 'flex-end', width: "70%", margin: "auto" }}>
                        <Icons.AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: "20px" }} />
                        <M.TextField onChange={e => setPhoneNumber(e.target.value)} size="small" fullWidth id="input-with-sx" label="رقم الهاتف" variant="standard" />
                    </M.Box>
                    <M.Box sx={{ display: 'flex', alignItems: 'flex-end', width: "70%", margin: "auto"  }}>
                        <Icons.Key sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: "20px" }} />
                        <M.TextField type="password" onChange={e => setPassword(e.target.value)} size="small" fullWidth id="input-with-sx" label="كلمة المرور" variant="standard" />
                    </M.Box>
                    <br />
                    <M.Button onClick={handleLogin} size='small' sx={{marginTop: "10px"}} variant="contained" startIcon={<Icons.Send sx={{marginLeft: "5px"}} />}>
                        دخول
                    </M.Button>
                    <br />
                    <M.Link sx={{margin: "5px"}} href="/" color="inherit">
                        ليس لدي حساب
                    </M.Link>
                    {error}
                </M.Typography>
            </M.Paper>
        </motion.div>
    )
}