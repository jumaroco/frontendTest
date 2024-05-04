import { Button, Card, Container, Grid, TextField,MenuItem,  Typography, TableContainer, Paper, Table, TableHead , TableRow, TableCell, TableBody, Dialog, DialogTitle, DialogContent } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import useStyles from "../../theme/useStyles";
import { addTask, deleteTask, getTaskKey, listTasks, updateTask } from "../../components/data/tasks";
import { getTasks } from "../../actions/TaskAction";

const Task = () => {

    const [tareas, setTareas] = useState({
        data: []
    });

    useEffect(() => {
        const getListaTareas = async () => {
            const response = await getTasks();
            setTareas(response);
        }
        getListaTareas();
    }, []);

    const limpiarTarea = {
        estado: "",
        descripcion: "",
        fecha: ""
    }

    const [tarea , setTarea] = useState({
        estado: "",
        descripcion: "",
        fecha: ""
    })

    const handleChange = (e) => {
        const {name, value} = e.target;
        setTarea(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const guardarTarea = () => {
        addTask(tarea);
        setTarea(limpiarTarea);
    }

    const [tareasArray, setTareasArray] = useState([]);

    const listarDataTareas = () => {
        const data = listTasks();
        setTareasArray(data);
    }

    useEffect(() => {
        listarDataTareas();
    }, [tareasArray.length])



    const eliminarData = (data) =>{
        const listnewTasks = deleteTask(data);
        setTareasArray(listnewTasks);
        console.log("Eliminar data");
    }

    const [tareaEditar, setTareaEditar] = useState({
        key: 0,
        estadoE: "",
        descripcionE: "",
        fechaE: ""
    })

    const handleChangeEditar = (e) => {
        const {name, value} = e.target;
        setTareaEditar(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const editarTarea = () => {
        console.log("Editando tarea", tareaEditar.descripcionE);
        const newData = updateTask(tareaEditar);
        console.log("Editando tarea", newData);
        closeDialog();
    }

    const [open, setOpen] = useState(false);

    const closeDialog = () => {
        setOpen(false);
    }

    const openDialog = (key) => {
        setOpen(true);
        const dataTask = getTaskKey(key);
        setTareaEditar({
            key: key,
            estadoE: dataTask.estado,
            descripcionE: dataTask.descripcion,
            fechaE: dataTask.fecha
        });

        console.log("Data tarea", dataTask);
    }

    const classes = useStyles();

    if(!tareas.data){
        console.log("No hay datos", tareas.data);
        return null;
    }
    return (
        <Container className={classes.containermt}>
            <Grid container justify="center">
                <Grid item lg={7} md={8}>
                    <Card className={classes.card} align="center">
                        <Typography variant="h4">Tareas</Typography>
                        <form className={classes.form} onSubmit={(e) => e.preventDefault()}>
                            <Grid container spacing={2}>
                            <Grid item md={12} xs={12} className={classes.gridmb}>
                                    <TextField
                                    select
                                    label="Estado"
                                    variant="outlined"
                                    fullWidth
                                    align="left"
                                    name="estado"
                                    value={tarea.estado}
                                    onChange={handleChange}
                                    >
                                        <MenuItem value="Pendiente">Pendiente</MenuItem>                                            
                                        <MenuItem value="Completado">Completado</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Descripción"
                                    variant="outlined"
                                    fullWidth
                                    align="left"
                                    name="descripcion"
                                    value={tarea.descripcion}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={6} xs={12} className={classes.gridmb}>
                                    <TextField 
                                    label="Fecha"
                                    variant="outlined"
                                    fullWidth
                                    align="left"
                                    name="fecha"
                                    value={tarea.fecha}
                                    onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12} className={classes.gridmb}>
                                   <Button 
                                   variant="contained"
                                      color="primary"
                                        fullWidth
                                        type="submit"
                                        onClick={guardarTarea}
                                   >
                                        Guardar
                                   </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </Grid>
            </Grid>
            <TableContainer component={Paper} className={classes.containermt}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Estado</TableCell>
                            <TableCell>Descripción</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell align="center" colSpan={2}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tareas.data.map((tareaObj) => (
                            <TableRow key={tareaObj.id}>
                            <TableCell>{tareaObj.estado}</TableCell>
                            <TableCell>{tareaObj.descripcion}</TableCell>
                            <TableCell>{tareaObj.fecha}</TableCell>
                            <TableCell>
                                <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>openDialog(tareaObj.key)}
                                >
                                    Editar
                                </Button>
                            </TableCell>
                            <TableCell>
                                <Button
                                variant="contained"
                                color="secondary"
                                onClick={() =>eliminarData(tareaObj)}
                                >
                                    Eliminar
                                </Button>
                            </TableCell>
                        </TableRow>
                        ) )}
                        
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={open} onClose={closeDialog} maxWidth="xs"
            fullWidth align="center">
                <DialogTitle>Editar Tarea</DialogTitle>
                <DialogContent>
                    <form onSubmit={(e) => e.preventDefault()}>
                    <TextField
                     select
                     label="Estado"
                     variant="outlined"
                     fullWidth
                     align="left"
                     name="estadoE"
                     className={classes.gridmb}
                     value={tareaEditar.estadoE}
                     onChange={handleChangeEditar}
                     >
                         <MenuItem value="Pendiente">Pendiente</MenuItem>                                            
                         <MenuItem value="Completado">Completado</MenuItem>
                    </TextField>

                    <TextField 
                    className={classes.gridmb}
                    label="Descripción"
                    variant="outlined"
                    fullWidth
                    align="left"
                    name="descripcionE"
                    value={tareaEditar.descripcionE}
                    onChange={handleChangeEditar}
                    />
                    <TextField 
                    className={classes.gridmb}
                    label="Fecha"
                    variant="outlined"
                    fullWidth
                    align="left"
                    name="fechaE"
                    value={tareaEditar.fechaE}
                    onChange={handleChangeEditar}
                    />
                    <Button
                    className={classes.gridmb}
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    onClick={editarTarea}>
                        Editar
                    </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Task;