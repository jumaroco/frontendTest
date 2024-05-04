import { Avatar,Button,Card, Container, Grid, Icon, TextField, Typography } from "@material-ui/core";
import useStyles  from "../../theme/useStyles";
import React, {  useState } from "react";
import { loginUser } from "../../actions/UserAction";

const clearUser = {
    email: '',
    password: ''
}

const Login = () => {
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUsuario(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const loginEventoUsuario = () => {
        loginUser(usuario).then(response => {
            if(response.status === 200){
                window.localStorage.setItem("token_seguridad", response.data.token);
                console.log("Usuario correcto", response.data.token);
            }else{
                console.log("Usuario o contraseña incorrecta",response.data);
            }
        });
    };

    const classes = useStyles();
    return (
        <Container className={classes.containermt}>
            <Grid container justify="center">
                <Grid item lg={5} md={6}>
                    <Card className={classes.card} align="center">
                        <Avatar className={classes.avatar}>
                            <Icon className={classes.icon}>person</Icon>
                        </Avatar>
                        <Typography color="primary" variant="h5"></Typography>
                        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
                            <Grid container spacing={2}>
                            <Grid item xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    type="email"
                                    name="email"
                                    value={usuario.email}
                                    onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password"
                                    name="password"
                                    value={usuario.password}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                {/* <Grid item xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    type="email" 
                                    placeholder="Email"
                                    value={usuario.email}
                                    onChange={handleChange}
                                    />
                                </Grid>

                                <Grid item xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Password"
                                    variant="outlined"
                                    fullWidth
                                    type="password" 
                                    placeholder="Password" 
                                    value={usuario.password}
                                    onChange={handleChange}
                                    />
                                </Grid> */}

                                <Grid item xs={12} className={classes.gridmb}>
                                    <Button 
                                    variant="contained" 
                                    color="primary" 
                                    fullWidth
                                    type="submit"
                                    onClick={loginEventoUsuario}
                                    >
                                        Ingresar
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;