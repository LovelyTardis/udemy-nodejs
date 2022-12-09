import inquirer from "inquirer";
import colors from "colors";

const questions = [
  {
    type: "list",
    name: "option",
    message: "What do you want to do?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Search city`,
      },
      {
        value: 2,
        name: `${"2.".green} History`,
      },
      {
        value: 0,
        name: `${"0.".green} Quit`,
      },
    ],
  },
];

export const inquirerMenu = async () => {
  console.clear();
  console.log("====================".green);
  console.log("  Select an option".white);
  console.log("====================\n".green);

  const { option } = await inquirer.prompt(questions);

  return option;
};

export const pause = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Press ${"enter".green} to continue`,
    },
  ];

  console.log("\n");
  await inquirer.prompt(question);
};

export const readInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "city",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Please enter a value";
        }
        return true;
      },
    },
  ];

  const { city } = await inquirer.prompt(question);
  return city;
};

export const locationList = async (locations = []) => {
  const choices = locations.map((location, i) => {
    const idx = `${i + 1}.`.green;
    console.log(location.id);
    return {
      value: location.id,
      name: `${idx} ${location.name}`,
    };
  });

  choices.push({
    value: "0",
    name: "0.".green + " Cancel",
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "Select location:",
      choices,
    },
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
};

export const confirm = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message,
    },
  ];

  const { ok } = await inquirer.prompt(question);
  return ok;
};

export const mostrarListadoChecklist = async (tareas = []) => {
  const choices = tareas.map((tarea, i) => {
    const idx = `${i + 1}.`.green;

    return {
      value: tarea.id,
      name: `${idx} ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false,
    };
  });

  const pregunta = [
    {
      type: "checkbox",
      name: "ids",
      message: "Selections",
      choices,
    },
  ];

  const { ids } = await inquirer.prompt(pregunta);
  return ids;
};
