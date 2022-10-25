import colors from "colors";
import Task from "./task.js";

export default class Tasks {
    _list = {};

    constructor() {
        this._list = {};
    }

    get getTasksAsArray() {
        let newList = [];
        Object.keys(this._list).forEach((key) => {
            newList.push({
                id: this._list[key].id,
                description: this._list[key].description,
                completedAt: this._list[key].completedAt,
            });
        });
        return newList;
    }

    get getTasksAsChoices() {
        return this.getTasksAsArray.map(({ id, description }, index) => {
            return {
                value: id,
                name: `${`${index + 1}.`.cyan} ${description}`,
            };
        });
    }

    get getPendingTasksAsChoices() {
        const pendingTasks = this.getTasksAsArray.filter(({ completedAt }) => {
            return completedAt == null;
        });
        return pendingTasks.map(({ id, description }, index) => {
            return {
                value: id,
                name: `${`${index + 1}.`.cyan} ${description}`,
            };
        });
    }

    loadTasksFromArray(tasks = []) {
        this._list = {};
        tasks.forEach((task) => {
            this._list[task.id] = task;
        });
    }

    showAllTasks() {
        if (this.getTasksAsArray.length == 0) {
            console.log("There are no tasks.".red);
            return;
        }
        this.getTasksAsArray.forEach(({ description, completedAt }, index) => {
            let strCompleted;
            completedAt == null
                ? (strCompleted = "Pending".red)
                : (strCompleted = "Completed".green);
            console.log(
                `${index + 1}.`.cyan,
                `${description} :: ${strCompleted}`
            );
        });
    }

    showCompletedPendingTasks(completed = true) {
        let strCompleted;
        const newList = this.getTasksAsArray.filter(({ completedAt }) => {
            if (completed) {
                strCompleted = "Completed".green;
                return completedAt != null;
            } else {
                strCompleted = "Pending".red;
                return completedAt == null;
            }
        });
        if (newList.length == 0) {
            console.log("There are no tasks.".red);
            return;
        }
        newList.forEach(({ description }, index) => {
            console.log(
                `${index + 1}.`.cyan,
                `${description} :: ${strCompleted}`
            );
        });
    }

    createTask(description = "") {
        const task = new Task(description);
        this._list[task.id] = task;
        console.log("Task created successfully!".green);
    }

    completeTask(idTask) {
        if (this._list[idTask].completedAt == null) {
            this._list[idTask].completedAt = Date.now();
            console.log("Task completed successfully.".green);
        } else {
            console.log("That task has already been completed!".red);
        }
    }

    deleteTask(idTask) {
        if (idTask) {
            delete this._list[idTask];
            console.log("Task deleted successfully!".green);
        } else {
            console.log("That task has already been deleted!".red);
        }
    }
}
