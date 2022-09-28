import * as React from 'react';
import * as M from '@mui/material';
import * as Icons from '@mui/icons-material';
import axios from 'axios';
import {motion} from 'framer-motion';
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

export default function AddStudent() {
    var [open, setOpen] = React.useState(true);
    var [fullName, setFullName] = React.useState();
    var [phoneNumber, setPhoneNumber] = React.useState();
    var [school, setSchool] = React.useState();
    var [classs, setClasss] = React.useState();
    var [group, setGroup] = React.useState("");
    var [classify, setClassify] = React.useState();
    console.log(JSON.parse(localStorage.getItem("userInformation")).phoneNumber);
    var handleAddStudent = () => {
        
        axios.post('http://localhost:8000/new-student', {tPhoneNumber: JSON.parse(localStorage.getItem("userInformation")).user.phoneNumber, fullName, phoneNumber, classs, group, classify})
        .then(result => {
            setOpen(false);
        })
    .catch(error => {
        setOpen(false);
        console.log(error);
    })
}
    return(
        <div>
            <M.Modal
                    open={open}
                    onClose={e => setOpen(false)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <M.Box sx={style}>
                    <M.Typography id="modal-modal-title" variant="h6" component="h2">
                        إضافة طالب جديد
                    </M.Typography>
                    <M.TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="الاسم"
                        onChange={e => setFullName(e.target.value)}
                        sx={{marginBottom: "10px"}}
                    />
                    <M.TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="رقم الهاتف"
                        onChange={e => setPhoneNumber(e.target.value)}
                        sx={{marginBottom: "10px"}}
                    /> 
                    <M.TextField
                        fullWidth
                        required
                        id="outlined-required"
                        label="الصف"
                        onChange={e => setClasss(e.target.value)}
                        sx={{marginBottom: "10px"}}
                    />
                    <div className='row'>
                        <div className='col-6'>
                            <M.FormControl fullWidth>
                                <M.InputLabel id="demo-simple-select-label" >تصنيف الطالب</M.InputLabel>
                                <M.Select sx={{marginBottom: "10px"}}
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={classify}
                                label="تصنيف الطالب"
                                onChange={e => setClassify(e.target.value)}
                            >
                                    <M.MenuItem value={"منتظم"}>منتظم</M.MenuItem>
                                    <M.MenuItem value={"منتسب"}>منتسب</M.MenuItem>
                                    <M.MenuItem defaultChecked value={"صعوبات تعلم"}>صعوبات تعلم</M.MenuItem>
                                </M.Select>
                            </M.FormControl>
                        </div>
                        <div className='col-6'>
                            <M.FormControl fullWidth>
                                <M.InputLabel id="demo-simple-select-label" >الفصل</M.InputLabel>
                                <M.Select sx={{marginBottom: "10px"}}
                                fullWidth
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={group}
                                label="الفصل"
                                onChange={e => setGroup(e.target.value)}
                            >
                                    <M.MenuItem value={1}>1</M.MenuItem>
                                    <M.MenuItem value={2}>2</M.MenuItem>
                                    <M.MenuItem defaultChecked value={3}>3</M.MenuItem>
                                    <M.MenuItem value={4}>4</M.MenuItem>
                                    <M.MenuItem value={5}>5</M.MenuItem>
                                </M.Select>
                            </M.FormControl>
                        </div>
                    </div>
                    <M.Button variant="contained" onClick={handleAddStudent}>حفظ</M.Button>
                    <M.Button variant="outlined" onClick={e => {setOpen(false); window.location.reload()}}>إلغاء</M.Button>
                    </M.Box>
                    
                </M.Modal>
        </div>
    )
}