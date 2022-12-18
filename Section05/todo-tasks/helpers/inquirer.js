import inquirer from "inquirer";
import colors from "colors";

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'What do you want to do?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Create task`
            },
            {
                value: '2',
                name: `${ '2.'.green } Task list`
            },
            {
                value: '3',
                name: `${ '3.'.green } Completed task list`
            },
            {
                value: '4',
                name: `${ '4.'.green } Pending task list`
            },
            {
                value: '5',
                name: `${ '5.'.green } Complete or pending tasks`
            },
            {
                value: '6',
                name: `${ '6.'.green } Delete task`
            },
            {
                value: '0',
                name: `${ '0.'.green } Quit`
            },
            
        ]
    }
];



export const inquirerMenu = async() => {

    console.clear();
    console.log('===================='.green);
    console.log('  Select an option'.white );
    console.log('====================\n'.green);

    const { opcion } = await inquirer.prompt(preguntas);

    return opcion;
}

export const pausa = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${ 'enter'.green } to continue`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

export const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Please enter a value';
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question);
    return desc;
}

export const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancel'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;
}

export const confirmar = async(message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}   

export const mostrarListadoChecklist = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {

        const idx = `${i + 1}.`.green;

        return {
            value: tarea.id,
            name:  `${ idx } ${ tarea.desc }`,
            checked: ( tarea.completadoEn ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selections',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}