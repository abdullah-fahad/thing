import * as React from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.rtl.min.css';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {ThemeProvider, createTheme, } from '@mui/material/';
import Navigation from './components/navigation';
import Welcome from './components/welcome';
import Login from './pages/login';
import Home from './pages/home';
import MessagesHistory from './pages/messagesHistory';
import Students from './pages/students';

const theme = createTheme({
  palette: {
    primary: {
      light: '#33ab9f',
      main: '#009688',
      dark: '#00695f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#4aedc4',
      main: '#1de9b6',
      dark: '#14a37f',
      contrastText: '#000',
    },
    mode: "dark"
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});



function App() {

  var [docs, setDocs] = React.useState(["سجلات الطلاب", "سجلات المعلمين"]);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Login />}/>
          <Route path='/history' exact element={<MessagesHistory />}/>
          <Route path='/students' exact element={<Students />}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
