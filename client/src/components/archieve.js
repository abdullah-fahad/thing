import * as React from 'react';
import * as M from '@mui/material';
import * as Icons from '@mui/icons-material';
import {motion} from 'framer-motion';
import axios from 'axios';

export default function Archieve() {

    var [open, setOpen] = React.useState(false);
    var [studentsArc, setStudentsArc] = React.useState(<M.Typography sx={{textAlign: "center"}}>جارٍ الاستيراد <M.CircularProgress color="inherit" size={18}/></M.Typography>);
    var [teachersArc, setTeachersArc] = React.useState(<M.Typography sx={{textAlign: "center"}}>جارٍ الاستيراد <M.CircularProgress color="inherit" size={18}/></M.Typography>);
    var [studentsRequestSent, setStudentsRequestSent] = React.useState(false);
    var [teachersRequestSent, setTeachersRequestSent] = React.useState(false);
    var userInfo = localStorage.getItem('userInformation');

    if(localStorage.getItem('userInformation')){
        if(!studentsRequestSent){
            axios.get('http://localhost:8000/get-messages', {senderId: userInfo._id, recieverRole: "students"})
        .then(result => {
            console.log(result.data.length);
            if(result.data.length > 0){
                console.log("اثغ");
                var studentsList = result.data.map(e => 
                    <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: -100, opacity: "0%"}}>
                        <M.List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <M.ListItem>
                                <M.ListItemText sx={{textAlign: "right"}}
                                    primary={e.title}
                                    secondary={
                                        <M.Typography fontSize={0.1}>من {e.name} الى <M.Link href='#'>محمد علي مستور</M.Link></M.Typography>
                                    }
                                />   
                            </M.ListItem>
                        </M.List>
                    </motion.div>
                    )
                    setStudentsArc([studentsList[studentsList.length-1]],[studentsList[studentsList.length-2]],[studentsList[studentsList.length-3]],[studentsList[studentsList.length-4]],[studentsList[studentsList.length-5]]);
            }
            else if (studentsArc !== 
                    <div className='fit'>
                        <M.Typography >لم ترسل رسالة لأي طالب بعد</M.Typography>
                        <M.Button size="small">إرسال أول رسالة +</M.Button>
                    </div>){
                setStudentsArc(
                    <div className='fit'>
                        <M.Typography >لم ترسل رسالة لأي طالب بعد</M.Typography>
                        <M.Button size="small">إرسال أول رسالة +</M.Button>
                    </div>
                    );
            }
        })
        .catch(error => {
            console.log(error)
            setOpen(true);
            setStudentsArc("فشل");
        }); 
        setStudentsRequestSent(true);
        }
        if(!teachersRequestSent){
            axios.get('http://localhost:8000/get-messages', {senderId: userInfo._id, recieverRole: "teachers"})
        .then(result => {
            console.log(result.data.length);
            if(result.data.length > 0){
                console.log("اثغ");
                var teachersList = result.data.map(e => 
                    <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: -100, opacity: "0%"}}>
                        <M.List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <M.ListItem>
                                <M.ListItemText sx={{textAlign: "right"}}
                                    primary={e.title}
                                    secondary={
                                        <M.Typography fontSize={0.1}>من {e.name} الى <M.Link href='#'>محمد علي مستور</M.Link></M.Typography>
                                    }
                                />   
                            </M.ListItem>
                        </M.List>
                    </motion.div>
                    )
                    setTeachersArc([teachersList[teachersList.length-1], teachersList[teachersList.length-2], teachersList[teachersList.length-3], teachersList[teachersList.length-4], teachersList[teachersList.length-5]]);
            }
            else if (teachersArc !== 
                    <div className='fit'>
                        <M.Typography >لم ترسل رسالة لأي معلم بعد</M.Typography>
                        <M.Button size="small">إرسال أول رسالة +</M.Button>
                    </div>){
                setTeachersArc(
                    <div className='fit'>
                        <M.Typography >لم ترسل رسالة لأي معلم بعد</M.Typography>
                        <M.Button size="small">إرسال أول رسالة +</M.Button>
                    </div>
                    );
            }
        })
        .catch(error => {
            console.log(error)
            setOpen(true);
            setTeachersArc("فشل");
        }); 
        }
    }
    return <div>
        <motion.div animate={{y: 0, opacity: "100%"}} initial={{y: -100, opacity: "0%"}}>
                    <M.Collapse in={open}>
                        <M.Alert color='error' sx={{width: "95%", margin: "auto"}}><M.Typography variant='strong'>حدث خطأ أثناء تحميل الأرشيف</M.Typography></M.Alert>
                    </M.Collapse>
                    
                    <M.Paper elevation={3} sx={{width:"95%", height:"300px", margin: "auto", padding: "10px"}}>
                        <M.Typography sx={{textAlign: "center", width: "100%"}}>آخر 5 رسائل أرسلتها</M.Typography>
                        <hr />
                        <div className='row'>
                            <div className='col-6'><strong>للطلاب:</strong>{studentsArc}</div>
                            <div className='col-6'><strong>للمعلمين:</strong>{teachersArc}</div>
                        </div>
                    </M.Paper>
                </motion.div>
    </div>
}