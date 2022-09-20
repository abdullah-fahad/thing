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

const theme = createTheme({
  palette: {
    primary: {
      light: '#3d6bb3',
      main: '#0d47a1',
      dark: '#093170',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5a48a7',
      main: '#311b92',
      dark: '#221266',
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
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
