import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import {MenuItem, Menu, Fade} from '@mui/material'
import * as M from '@mui/material';
import * as Icons from '@mui/icons-material';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

export default function Navigation() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openTabs = Boolean(anchorEl);
  var handleSignout = () => {
    localStorage.removeItem('userInformation');
    window.location.reload();
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            منصة إرشاد
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem disablePadding>
              <ListItemButton href="/">
                <ListItemIcon>
                  <Icons.Archive />
                </ListItemIcon>
                <ListItemText primary={"الأرشيف"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href="/students">
                <ListItemIcon>
                  <Icons.Group />
                </ListItemIcon>
                <ListItemText primary={"الطلاب"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
              <ListItemIcon>
                  <Icons.Group />
                </ListItemIcon>
                <ListItemText primary={"المعلمين"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton href="/history">
                <ListItemIcon>
                  <Icons.History />
                </ListItemIcon>
                <ListItemText primary={"سجل الرسائل"} />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <Icons.AccountCircle />
                </ListItemIcon>
                <ListItemText primary={"حسابك"} onClick={handleClick}/>
              </ListItemButton>
              <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={openTabs}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem onClick={handleClose}>الإعدادات</MenuItem>
              <MenuItem onClick={handleSignout}>تسجيل الخروج</MenuItem>
            </Menu>
            </ListItem>
            <ListItem disablePadding>
            <M.Accordion sx={{width: "100%"}}>
              <M.AccordionSummary
                expandIcon={<Icons.ExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>المستندات</Typography>
              </M.AccordionSummary>
              <M.AccordionDetails>
                <List>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary={"إنشاء مستند جديد +"} />
                  </ListItemButton>
                </ListItem>
                </List>
              </M.AccordionDetails>
            </M.Accordion>
            </ListItem>
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
