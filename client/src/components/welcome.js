import * as React from 'react';
import * as Icons from "@mui/icons-material";
import * as M from '@mui/material';
import { authentication } from '../firbase-config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import axios from 'axios';
import {motion} from 'framer-motion'

export default function Welcome (){

    var [otpSent, setOtpSent] = React.useState(false);
    var [fullName, setFullName] = React.useState(null);
    var [phoneNumber, setPhoneNumber] = React.useState(null);
    var [password, setPassword] = React.useState(null);
    var [schoolName, setSchoolName] = React.useState(null);
    var [level, setLevel] = React.useState(null);
    var [address, setAddress] = React.useState(null);
    var [otp, setOtp] = React.useState(null);
    var [userInformation, setUserInformation] = React.useState(null);
    var [error, setError] = React.useState();
    var [submitButton, setSubmitButton] = React.useState(null);

    var generateRecaptchaVerifier = () => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha', {
            'size': 'invisible',
            'callback': response => {

            }
        }, authentication)
    }

    var handleNext = async() => {
        if(fullName === null || fullName === ""){
            setError(
                <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: 100, opacity: "0%"}}>
                    <M.Alert severity="error">
                        <M.AlertTitle>خطأ</M.AlertTitle>
                            يجب عدم ترك الاسم فارغًا
                    </M.Alert>
                </motion.div>
            );
        }
        else if(phoneNumber === null || phoneNumber === ""){
            setError(
                <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: 100, opacity: "0%"}}>
                    <M.Alert severity="error">
                        <M.AlertTitle>خطأ</M.AlertTitle>
                            يجب عدم ترك رقم الهاتف فارغًا
                    </M.Alert>
                </motion.div>
            );
        }
        else if(password === null || password === ""){
            setError(
                <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: 100, opacity: "0%"}}>
                    <M.Alert severity="error">
                        <M.AlertTitle>خطأ</M.AlertTitle>
                            يجب عدم ترك كلمة المرور فارغةً
                    </M.Alert>
                </motion.div>
            );
        }
        else if(schoolName === null || schoolName === ""){
            setError(
                <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: 100, opacity: "0%"}}>
                    <M.Alert severity="error">
                        <M.AlertTitle>خطأ</M.AlertTitle>
                            يجب عدم ترك اسم المدرسة فارغًا
                    </M.Alert>
                </motion.div>
            );
        }
        else if(level === null || level === ""){
            setError(
                <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: 100, opacity: "0%"}}>
                    <M.Alert severity="error">
                        <M.AlertTitle>خطأ</M.AlertTitle>
                            يجب عدم ترك المرحلة فارغةً
                    </M.Alert>
                </motion.div>
            );
        }
        else if(address === null || address === ""){
            setError(
                <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: 100, opacity: "0%"}}>
                    <M.Alert severity="error">
                        <M.AlertTitle>خطأ</M.AlertTitle>
                            يجب عدم ترك موقع المدرسة فارغًا
                    </M.Alert>
                </motion.div>
            );
        }
        await axios.post('http://localhost:8000/signup', {fullName, phoneNumber, password, school: {name: schoolName, level, address}})
        .then(userInformation => {
            setOtpSent(true);
            generateRecaptchaVerifier();
            var appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(authentication,phoneNumber,appVerifier)
            .then(result => {
                setUserInformation(userInformation);
                window.result = result;
            })
            .catch(error => {
                console.log(error)
            })
        })
        .catch(error => {
            console.log(error);
            setError(
                <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: 100, opacity: "0%"}}>
                    <M.Alert severity="error">
                        <M.AlertTitle>خطأ</M.AlertTitle>
                            Hey
                    </M.Alert>
                </motion.div>
            );
        })
    
    }

    var handleVerify = () => {
        console.log("hey");
        var result = window.result;
        console.log(otp);
        result.confirm(otp).then(result => {
            localStorage.setItem("userInformation", JSON.stringify(userInformation));
            window.location.reload();
        })
        .catch(error => {
            console.log(error);
            setError(
                <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: 100, opacity: "0%"}}>
                    <M.Alert severity="error">
                        <M.AlertTitle>خطأ</M.AlertTitle>
                            رمز التحقق المدخل غير صحيح
                    </M.Alert>
                </motion.div>
            )
        })
    }

    var form1 = (
        <>
        <M.Typography variant='h6' sx={{textAlign: "center", marginTop: "10px"}}>
                            إنشاء حساب
                        </M.Typography>
                        <br />
                        <M.Accordion>
                            <M.AccordionSummary
                                expandIcon={<Icons.ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <M.Typography>معلوماتك</M.Typography>
                            </M.AccordionSummary>
                            <M.AccordionDetails>
                                <M.Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Icons.AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: "20px" }} />
                                    <M.TextField onChange={e => {setFullName(e.target.value); setError(<></>)}} size="small" fullWidth id="input-with-sx" label="الإسم" variant="standard" />
                                </M.Box>
                                <M.Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Icons.Phone sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: "20px" }} />
                                    <M.TextField onChange={e => {setPhoneNumber(e.target.value); setError(<></>)}} fullWidth placeholder="563456789" size="small" id="input-with-sx" label="رقم الهاتف" variant="standard" />
                                </M.Box>
                                <M.Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Icons.Key sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: "20px" }} />
                                    <M.TextField onChange={e => {
                                        setPassword(e.target.value); setError(<></>)}} fullWidth type={"password"} size="small" id="input-with-sx" label="كلمة المرور" variant="standard" />
                                </M.Box>
                            </M.AccordionDetails>
                        </M.Accordion>
                        <M.Accordion>
                            <M.AccordionSummary
                                expandIcon={<Icons.ExpandMore />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <M.Typography>معلومات مدرستك</M.Typography>
                            </M.AccordionSummary>
                            <M.AccordionDetails>
                                <M.Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Icons.FileCopy sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: "20px" }} />
                                    <M.TextField onChange={e => {setSchoolName(e.target.value); setError(<></>)}} size="small" fullWidth id="input-with-sx" label="اسم المدرسة" variant="standard" />
                                </M.Box>
                                <M.Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Icons.Grade sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: "20px" }} />
                                    <M.TextField onChange={e => {setLevel(e.target.value); setError(<></>)}} fullWidth placeholder="مثال: ثانوي" size="small" id="input-with-sx" label="المرحلة الدراسية" variant="standard" />
                                </M.Box>
                                <M.Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Icons.LocationOn sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: "20px" }} />
                                    <M.TextField onChange={e => {
                                        setAddress(e.target.value); setError(<></>)}} fullWidth size="small" id="input-with-sx" label="موقع المدرسة" placeholder='مثال: الباحة, مدينة الباحة' variant="standard" />
                                </M.Box>
                            </M.AccordionDetails>
                        </M.Accordion>
                        <M.Button onClick={handleNext} size='small' sx={{marginTop: "10px"}} variant="contained" startIcon={<Icons.Send sx={{marginLeft: "5px"}} />}>
                            التالي
                        </M.Button>
                        <br />
                        <M.Link sx={{margin: "5px"}} href="/login" color="inherit">
                            لدي حساب
                        </M.Link>
        </>
    )
    var form2 = (
        <>
        <M.Typography>
        <M.Typography variant='h6' sx={{textAlign: "center", marginTop: "10px"}}>
            إدخال رمز التحقق
        </M.Typography>
        <M.Typography variant='p' sx={{textAlign: "center", marginTop: "10px"}}>
            قم بإدخال رمز التحقق المكون من اربع أرقام الذي تم إرساله إلى رقم هاتفك 
        </M.Typography>
        <M.Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Icons.AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5, fontSize: "20px" }} />
                <M.TextField onChange={e => setOtp("" + e.target.value)} type="number" size="small" fullWidth id="input-with-sx" label="رمز التحقق" variant="standard" />
        </M.Box>
        <M.Button disabled={submitButton} onClick={handleVerify} size='small' sx={{marginTop: "10px"}} variant="contained" startIcon={<Icons.Send sx={{marginLeft: "5px"}} />}>
            إنشاء حساب
        </M.Button>
        <br />
        </M.Typography>
        </>
    )

    return(
        <motion.div animate={{opacity: "100%"}} initial={{opacity: "0%"}}>
            <M.Paper sx={{width: "100%", height: "400px", padding: "3%"}}>
                        <M.Typography sx={{fontSize: "150%", textAlign: "center"}}>
                            منصة إرشاد
                        </M.Typography>
                        <M.Typography sx={{fontSize: "100%", textAlign: "center", marginTop: "10px"}}>
                            آفاق جديدة لامكانيات المرشد الطلابي
                        </M.Typography>
                        <M.Typography sx={{fontSize: "80%", height: "auto",textAlign: "center", marginTop: "10px", marginBottom: "40px"}}>
                            مع العديد من الأدوات والامكانيات الجديدة, تتسح منصة الإرشاد الطلابي تطوير وتحسين عملية الإرشاد في المدارس, فهي تسهل على المرشد فرز وإدارة الجداول والسجلات, وتحسن عملية التواصل مع الطالب أو ولي أمره
                        </M.Typography>
                        <motion.div animate={{y: 0}} initial={{y: 200}}>
                        <M.Paper elevation={6} sx={{width: "80%", height: "fit-content", padding: "3%", margin: "auto"}}>
                            {otpSent? form2 : form1}
                            <br />
                            <br />
                            
                            {error}
                        </M.Paper>
                        </motion.div>
                    </M.Paper>
            
                    <div id="recaptcha">

                    </div>
        </motion.div>
    )
}