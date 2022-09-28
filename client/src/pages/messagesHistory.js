import * as React from 'react';
import * as M from '@mui/material';
import * as Icons from '@mui/icons-material';
import axios from 'axios';
import motion from 'framer-motion';
import UnAllowed from '../components/unAllowed';
import Navigation from '../components/navigation';

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

export default function MessagesHistory(){

    var [loggedIn, setLoggedIn] = React.useState(false);
    if(localStorage.getItem('userInformation')){
        if(!loggedIn) setLoggedIn(true);
    }
    var [age, setAge] = React.useState('');
    var [disableDelete, setDisableDelete] = React.useState(true);
    var [messages, setMessages] = React.useState(<M.Typography variant='h6' sx={{textAlign: "center"}}>جارٍ الاستيراد <M.CircularProgress color="inherit" size={25}/></M.Typography>);
    var [selected, setSelected] = React.useState([]);
    var [teachers, setTeachers] = React.useState(false);
    var [students, setStudents] = React.useState(false);
    var [open, setOpen] = React.useState(false);
    var [error, setError] = React.useState(false);
    var [success, setSuccess] = React.useState(false);

    axios.get('http://localhost:8000/get-messages', {senderId: localStorage.getItem('userInformation')._id, teachers, students})
    .then(result => {
        if (result.data.length) setMessages(result.data);
        else setMessages(<M.Typography variant='h6' sx={{textAlign: "center"}}>لم تقم بإرسال أي رسائل بعد</M.Typography>);
    })
    .catch(error => {
        console.log(error);
        setError(true);
        setMessages(<M.Typography variant='h6' sx={{textAlign: "center"}}>فشل الاستيراد</M.Typography>);
    })

    var handleSelect = (event) => {
        if(selected.indexOf(event.target.value) > -1){
            selected.pop(selected.indexOf(event.target.value, 1));
            if(!selected.length) setDisableDelete(true);
            console.log(selected);
        }
        else {
            selected.push(event.target.value);
            if(disableDelete) setDisableDelete(false);
            console.log(selected);
        }
    }
    var openModal = () => {
        setOpen(true);
    }
    var handleClick = () => {
        for(var i = 0; i < selected.length; i++){
            axios.post('http://localhost:8000/remove-messages', {_id: selected[i]})
            .then(result => selected.shift())
            .catch(error => console.log(error));
        }
        if(selected.length === null){
            setSuccess(true);
        }
    }
    return(
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
                        هل انت متأكد من الحذف؟
                    </M.Typography>
                    <M.Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        سيتم حذف {selected.length}  من عناصر سجل الرسائل لديك.
                    </M.Typography>
                    <br />
                    <M.Button variant="contained" onClick={handleClick}>تأكيد</M.Button>
                    <M.Button variant="outlined" onClick={e => setOpen(false)}>إلغاء</M.Button>
                    </M.Box>
                </M.Modal>
                <M.Collapse in={success}>
                    <M.Alert color='success' sx={{width: "99.5%"}}><M.Typography variant='strong'>تم حذف جميع العناصر بنجاح</M.Typography></M.Alert>
                </M.Collapse>
                <M.Collapse in={error}>
                    <M.Alert color='error' sx={{width: "99.5%"}}><M.Typography variant='strong'>حدث خطأ أثناء تحميل السجل</M.Typography></M.Alert>
                </M.Collapse>
                <M.Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-center"
                
                spacing={0}
                >
                    <M.Paper elevation={1} sx={{width: "99.5%", height: "fit-content", padding: "3px", paddingTop: "10px"}}>
                        <div className='row'>
                            <div className='col-4'><strong>سجل الرسائل</strong></div>
                            <div className='col-5'>
                            <M.FormControl fullWidth>
                                <M.InputLabel id="demo-simple-select-label" >الفئة</M.InputLabel>
                                <M.Select sx={{height: "30px"}}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="الفئة"
                                    onChange={e => setAge(e.target.value)}
                                >
                                    <M.MenuItem value={10}>معلمين</M.MenuItem>
                                    <M.MenuItem value={20}>طلاب</M.MenuItem>
                                    <M.MenuItem defaultChecked value={30}>الكل</M.MenuItem>
                                </M.Select>
                            </M.FormControl>
                            </div>
                            <div className='col-3'>
                            <M.Button onClick={openModal} variant="outlined" color='error' disabled={disableDelete} sx={{height: "30px", paddingRight: "5px", paddingLeft: "5px"}}>
                                <Icons.Delete sx={{marginLeft: "5px", fontSize: "19px"}} /> حذف
                            </M.Button>
                            </div>
                        </div> 
                        <br />
                        <div className='row contentGrid'>
                            <div className='col-1'><M.Checkbox sx={{padding: "0px"}} /></div>
                            <div className='col-3'><strong>العنوان</strong></div>
                            <div className='col-5'><strong>المحتوى</strong></div>
                            <div className='col-3'><strong>المستقبِل</strong></div>
                        </div>
                    </M.Paper>
                    <div>
                        {!messages.length? messages : 
                        messages.map(i => 
                            <M.Paper elevation={5} sx={{width: "100%", height: "fit-content", padding: "3px"}}>
                                <div className='row contentGrid'>
                                    <div className='col-1'><M.Checkbox sx={{padding: "0px"}} value={i._id} onClick={handleSelect}/></div>
                                    <div className='col-3'><M.Typography  sx={{height: "50px", overflow: "hidden", fontSize: "10%"}}>{i.title}</M.Typography></div>
                                    <div className='col-5'><M.Typography  sx={{height: "50px", overflow: "hidden", fontSize: "7%"}}>{i.content}</M.Typography></div>
                                    <div className='col-3'><M.Typography  sx={{height: "50px", overflow: "hidden", fontSize: "70%"}}>{i.to}</M.Typography></div>
                                </div>
                            </M.Paper>
                                )
                        }
                    </div>
                    
                </M.Stack>

            </div> : <UnAllowed />}
        </div>
    )
}