import * as React from 'react';
import * as M from '@mui/material';
import * as Icons from '@mui/icons-material';
import axios from 'axios';
import {motion} from 'framer-motion';
import UnAllowed from '../components/unAllowed';
import Navigation from '../components/navigation';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import AddStudent from '../components/addStudent';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export default function Students(){
    var [loggedIn, setLoggedIn] = React.useState(false);
    if(localStorage.getItem('userInformation')){
        if(!loggedIn) setLoggedIn(true);
    }
    var [open, setOpen] = React.useState(false);
    var [error, setError] = React.useState(false);
    var [fetched, setFetched] = React.useState(false);
    var [userInformation, setUserInformation] = React.useState(JSON.parse(localStorage.getItem('userInformation')).user);
    var [addForm, setAddForm] = React.useState(false);
    var [students, setStudents] = React.useState(<M.Typography variant='h6' sx={{textAlign: "center"}}>جارٍ الاستيراد <M.CircularProgress color="inherit" size={25}/></M.Typography>);
    var [onEditStudent, setOnEditStudents] = React.useState({});
    var [newFullName, setNewFullName] = React.useState('');
    var [newSchool, setNewSchool] = React.useState('');
    var [newClass, setNewClass] = React.useState('');
    var [newPhoneNumber, setNewPhoneNumber] = React.useState('');
    if(!fetched){
        console.log(userInformation._id);
        axios.post('http://localhost:8000/students', {_id: userInformation._id})
    .then(result => {
        console.log(result);
        if(result.data.length) setStudents(result.data);
        else {setStudents(<M.Typography variant='h6' sx={{textAlign: "center"}}>لم تقم بإضافة أي طالب بعد</M.Typography>); setError(false)};
    })
    .catch(error => {
        console.log(error);
        setError(true);
        setStudents(<M.Typography variant="h6" sx={{textAlign: "center"}}>فشل</M.Typography>)
    })
    setFetched(true);
    }

    var handleEditStudent = () => {
        console.log(onEditStudent);
        axios.post('http://localhost:8000/modify-student', {_id: onEditStudent._id, newFullName, newClass, newPhoneNumber})
        .then(result => {setFetched(false); setOpen(false)})
        .catch(error => {console.log(error)})
    }
    return (
        <div>
            {loggedIn? <div>
                <Navigation />
                <M.Modal
                    open={open}
                    onClose={e => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <M.Box sx={style}>
                    <M.Typography id="modal-modal-title" variant="h6" component="h2">
                        تعديل بيانات الطالب
                    </M.Typography>
                    <M.TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="الاسم"
                        defaultValue={onEditStudent.fullName}
                        onChange={e => setNewFullName(e.target.value)}
                        sx={{marginBottom: "10px"}}
                    />
                    <div className='row'>
                        <div className='col-6'>
                            <M.TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="المدرسة"
                                defaultValue={onEditStudent.school}
                                onChange={e => setNewSchool(e.target.value)}
                                sx={{marginBottom: "10px"}}
                            />
                            
                        </div>
                        <div className='col-6'>
                        <M.TextField
                                fullWidth
                                required
                                id="outlined-required"
                                label="الصف"
                                defaultValue={onEditStudent.class}
                                onChange={e => setNewClass(e.target.value)}
                                sx={{marginBottom: "10px"}}
                            />
                        </div>
                    </div>
                    <M.TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="رقم الهاتف"
                        defaultValue={onEditStudent.phoneNumber}
                        onChange={e => setNewPhoneNumber(e.target.value)}
                        sx={{marginBottom: "10px"}}
                    />
                    <M.Button variant="contained" onClick={handleEditStudent}>حفظ</M.Button>
                    <M.Button variant="outlined" onClick={e => setOpen(false)}>إلغاء</M.Button>
                    </M.Box>
                    
                </M.Modal>
                {addForm? <AddStudent /> : ""}
                <M.Container>
                <M.Collapse in={error}>
                    <M.Alert color='error' sx={{width: "100%", margin: "auto"}}><M.Typography variant='strong'>حدث خطأ أثناء تحميل الطلاب</M.Typography></M.Alert>
                </M.Collapse>
                    <M.Paper>
                        <M.Typography variant='h6'>قائمة الطلاب:</M.Typography>
                        <M.Paper elevation={5} sx={{height: "fit-contant", padding: "5px"}}>
                        <div className='row'>
                            <div className='col-7'>
                                <M.Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <Icons.Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                    <M.TextField id="input-with-sx" fullWidth label="ابحث..." variant="standard" />
                                </M.Box>
                            </div>
                            <div className='col-5'>
                                <M.Button variant='contained' onClick={e => setAddForm(true)} sx={{marginTop: "5px"}}>إضافة طالب <Icons.Add /></M.Button>
                            </div>
                        </div>
                        {!students.length? students : 
                        students.map(e => 
                            <M.Card>
                            <M.CardContent>
                                <M.Typography variant="h5" component="div">
                                    {e.fullName}
                                </M.Typography>
                                <M.Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {e.class}
                                </M.Typography>
                                <M.Typography variant="body2">
                                     الرسائل المرسلة إلى هذا الطالب
                                </M.Typography>
                                </M.CardContent>
                                <M.Box sx={{paddingRight: "15px"}}>
                                    <M.Chip label="تعديل" clickable key={e} onClick={i => {setOnEditStudents(e); setOpen(true)}} size="small" color="warning" />
                                    <M.Chip label="حذف"  clickable size="small" color="error" />
                                </M.Box>
                                <M.CardActions>
                                <M.Button size="small">إرسال رسالة</M.Button>
                                </M.CardActions>
                            </M.Card>
                        )}
                        </M.Paper>
                    </M.Paper>
                </M.Container>
            </div> : <UnAllowed />}
        </div>
        
    )
}