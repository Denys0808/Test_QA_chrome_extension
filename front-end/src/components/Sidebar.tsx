import { styled } from '@mui/material/styles';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useNavigate, useLocation } from 'react-router-dom';

import LogoIcon from "../assets/images/logo.png"
import { ReactComponent as ProfileIcon } from "../assets/images/🦆 icon _profile circle_.svg"
import { ReactComponent as BookIcon } from "../assets/images/🦆 icon _book 1_.svg"
import { ReactComponent as MoneyIcon } from "../assets/images/🦆 icon _money send_.svg"

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const links = [
    { text: "My Account", href: "/account", icon: <ProfileIcon style={{ fill: "#413B53" }} />, iconActive: <ProfileIcon fill="#FFF" /> },
    { text: "Free Credits", href: "/freecredit", icon: <MoneyIcon fill="#413B53" />, iconActive: <MoneyIcon fill="#FFF" /> },
    { text: "Upgrade", href: "/upgrade", icon: <BookIcon fill="#413B53" />, iconActive: <BookIcon fill="#FFF" /> }
]

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundImage: "linear-gradient(90deg, #08010F 0%, #05050A 100%)",
                    borderRight: "1px solid",
                    borderImage: "linear-gradient(269deg, rgba(103, 58, 183, 0.50) 0%, rgba(233, 30, 99, 0.50) 100%) 1"
                },
            }}
            variant="persistent"
            anchor="left"
            open={true}
        >
            <DrawerHeader sx={{ justifyContent: "center", mt: 1 }}>
                <img src={LogoIcon} alt="Logo" />
            </DrawerHeader>
            <List>
                {links.map((link, index) => (
                    <ListItem key={`link_item_${index}`} disablePadding sx={{ px: 2 }} onClick={() => { navigate(link.href) }}>
                        {link.href === location.pathname ? <ListItemButton sx={{
                            backgroundImage: "linear-gradient(90deg, #6C13B6 0%, #6166C5 100%);",
                            '& .MuiListItemText-primary': {
                                color: "#FFF"
                            }, '& .MuiSvgIcon-root': {
                                color: "#FFF"
                            },
                            borderRadius: 2,
                        }}>
                            <ListItemIcon >
                                {link.iconActive}
                            </ListItemIcon>
                            <ListItemText sx={{
                                '& .MuiListItemText-primary': {
                                    color: "#413B53"
                                },
                            }} primary={link.text} />
                        </ListItemButton>
                            : <ListItemButton sx={{
                                ':hover': {
                                    backgroundImage: "linear-gradient(90deg, #6C13B6 0%, #6166C5 100%);",
                                    '& .MuiListItemText-primary': {
                                        color: "#FFF"
                                    }, '& .MuiSvgIcon-root': {
                                        color: "#FFF"
                                    }
                                },
                                borderRadius: 2,
                            }}>
                                <ListItemIcon >
                                    {link.icon}
                                </ListItemIcon>
                                <ListItemText sx={{
                                    '& .MuiListItemText-primary': {
                                        color: "#413B53"
                                    },
                                }} primary={link.text} />
                            </ListItemButton>}
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}

export default Sidebar