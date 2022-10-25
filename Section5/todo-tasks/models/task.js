import { v4 as uuid } from "uuid";

export default class Task {
    id = "";
    description = "";
    completedAt = null;

    constructor(description) {
        this.id = uuid();
        this.description = description;
    }
}
