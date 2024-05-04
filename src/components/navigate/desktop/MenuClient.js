import { Button , Icon, Avatar, Menu, MenuItem, ListItemIcon, ListItemText} from "@material-ui/core";
import React from "react";
import useStyles from "../../../theme/useStyles";
import { Link } from "react-router-dom";

const MenuClient = () => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const classes = useStyles();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <div>
                <Button color="inherit" className={classes.buttonIcon} onClick={handleClick}>
                    <div className={classes.linkAppBarDesktop}>
                    <Avatar 
                    alt="mi imagen"
                    className={classes.avatarPerfilAppBar}
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                    />
                    Julio Rodriguez
                    <Icon>keyboard_arrow_down</Icon>
                    </div>
                </Button>
                <Menu
                elevation={2}
                anchorEl={anchorEl}
                getContentAnchorEl={null}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                transformOrigin={{vertical: "top", horizontal: "center"}}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                    <MenuItem className={classes.ListItem} onClick={handleClose}>
                        <Link to="/logout" className={classes.linkAppBarMobile}>
                            <ListItemIcon className={classes.ListItemIcon}>
                                <Icon>exit_to_app</Icon>
                            </ListItemIcon>
                            <ListItemText>Logout</ListItemText>
                        </Link>
                    </MenuItem>

                </Menu>
            </div>
        </>
    );
}

export default MenuClient;