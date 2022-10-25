import colors from "colors";
import {
    completeTask,
    createTask,
    deleteTask,
    inquirerMenu,
    pauseConsole,
} from "./helpers/inquirer.js";
import { loadData, saveData } from "./helpers/saveFile.js";
import Tasks from "./models/tasks.js";

const possibleSelects = {
    1: async (tasks = new Tasks()) => {
        await createTask(tasks, "Input a description for your task:");
    },
    2: (tasks = new Tasks()) => tasks.showAllTasks(),
    3: (tasks = new Tasks()) => tasks.showCompletedPendingTasks(true),
    4: (tasks = new Tasks()) => tasks.showCompletedPendingTasks(false),
    5: async (tasks = new Tasks()) => {
        await completeTask(tasks);
    },
    6: async (tasks = new Tasks()) => {
        await deleteTask(tasks);
    },
    0: () => console.log("Thanks for using this app! Have a nice day.".green),
};

const main = async () => {
    let selected;
    const loadedTasks = loadData();
    const tasks = new Tasks();
    if (loadedTasks) tasks.loadTasksFromArray(loadedTasks);

    do {
        selected = await inquirerMenu();
        await possibleSelects[selected](tasks);
        saveData(tasks.getTasksAsArray);
        await pauseConsole();
    } while (selected != 0);
};

main();
