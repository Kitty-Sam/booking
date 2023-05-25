import { useState } from 'react';
import styles from '@styles/Menu.module.css';
import { AppBar, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { menuItems } from '@constants/menuItems';
import { themeColors } from '@constants/themeColors';

export const Menu = () => {
    const [open, setOpen] = useState(false);

    const toggleDrawer = (isOpen: boolean) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOpen(isOpen);
    };

    return (
        <div className={styles.root}>
            <AppBar position="static" style={{ backgroundColor: themeColors.violet }}>
                <IconButton color="inherit" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
            </AppBar>
            <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
                <div className={styles.drawer}>
                    <Typography variant="h4" className={styles.title}>
                        Menu
                    </Typography>
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem button key={index} component="a" href={item.link}>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>
        </div>
    );
};
