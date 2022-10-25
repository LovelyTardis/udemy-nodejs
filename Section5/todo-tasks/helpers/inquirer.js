import colors from "colors";
import inquirer from "inquirer";

const menuListPrompt = [
    {
        type: "list",
        name: "option",
        message: "What do you want to do?",
        choices: [
            {
                value: "1",
                name: `${"1.".cyan} Create task`,
            },
            {
                value: "2",
                name: `${"2.".cyan} Task list`,
            },
            {
                value: "3",
                name: `${"3.".cyan} Completed task list`,
            },
            {
                value: "4",
                name: `${"4.".cyan} Pending task list`,
            },
            {
                value: "5",
                name: `${"5.".cyan} Complete task(s)`,
            },
            {
                value: "6",
                name: `${"6.".cyan} Delete task`,
            },
            {
                value: "0",
                name: `${"0.".cyan} Exit`,
            },
        ],
    },
];
const pauseInputPrompt = {
    type: "input",
    name: "enter",
    message: "Press ENTER to continue".green,
};
const promptQuestion = {
    type: "input",
    name: "input",
    message: "",
    validate(value) {
        if (value.length === 0) return "Please, input a value".bgRed.black;
        return true;
    },
};
const completePrompt = {
    type: "list",
    name: "taskToComplete",
    message: "Which task do you want to complete?",
    choices: [],
};
const deletePrompt = {
    type: "list",
    name: "taskToDelete",
    message: "Which task do you want to delete?",
    choices: [],
};

export const inquirerMenu = async () => {
    console.clear();
    console.log("================".green);
    console.log(`${"Select an option".white}`);
    console.log("================".green);
    const { option } = await inquirer.prompt(menuListPrompt);
    return parseInt(option);
};

export const pauseConsole = async () => {
    console.log("\n");
    await inquirer.prompt(pauseInputPrompt);
};

const getInput = async (messageToDisplay) => {
    promptQuestion["message"] = messageToDisplay;
    const { input } = await inquirer.prompt(promptQuestion);
    return input;
};

export const createTask = async (tasks, messageToDisplay) => {
    const description = await getInput(messageToDisplay);
    tasks.createTask(description);
};

export const completeTask = async (tasks) => {
    const pendingTasksAsChoices = tasks.getPendingTasksAsChoices;
    if (pendingTasksAsChoices.length == 0) {
        console.log("There are no pending tasks to complete.".red);
        return;
    }
    completePrompt["choices"] = pendingTasksAsChoices;
    const { taskToComplete } = await inquirer.prompt(completePrompt);
    tasks.completeTask(taskToComplete);
};

export const deleteTask = async (tasks) => {
    const tasksAsChoices = tasks.getTasksAsChoices;
    if (tasksAsChoices.length == 0) {
        console.log("There are no tasks to delete.".red);
        return;
    }
    deletePrompt["choices"] = tasksAsChoices;
    const { taskToDelete } = await inquirer.prompt(deletePrompt);
    tasks.deleteTask(taskToDelete);
};
