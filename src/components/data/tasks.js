let taskArray = [];
let key = 0;

export const addTask = (task) => {
    let taskJson = task;
    key++;
    taskJson.key = key;
    taskArray.push(taskJson);

    console.log("data", taskArray);
}

export const listTasks = () => {
    return taskArray;
}

export const getTaskKey = (key) => {
   const objTask = taskArray.find(task =>{ return task.key === key});
    return objTask;
}


export const updateTask = (dataTask) => {
    taskArray.forEach(task => {
        if(dataTask.key === task.key) {
            task.fecha = dataTask.estadoE;
            task.descripcion = dataTask.descripcionE;
            task.estado = dataTask.estadoE;
        }
    })
    return taskArray;
}

export const deleteTask = (dataTask) => {
    taskArray = taskArray.filter(objTask => {return objTask.key !== dataTask.key})
    const newDataTasks = listTasks();

    return newDataTasks;
}