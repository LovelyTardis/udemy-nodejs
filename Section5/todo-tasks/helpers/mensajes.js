import colors from "colors";


export const mostrarMenu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log('=========================='.green);
        console.log('  Seleccione una opción'.green);
        console.log('==========================\n'.green);

        console.log(`${ '1.'.green } Create task`);
        console.log(`${ '2.'.green } Task list`);
        console.log(`${ '3.'.green } Completed task list`);
        console.log(`${ '4.'.green } Pending task list`);
        console.log(`${ '5.'.green } Complete or pending tasks`);
        console.log(`${ '6.'.green } Delete task`);
        console.log(`${ '0.'.green } Quit \n`);

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question('Select an option: ', (opt) => {
            readline.close();
            resolve(opt);
        })

    });

    

}

export const pausa = () => {

    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\Press ${ 'ENTER'.green } to continue\n`, (opt) => {
            readline.close();
            resolve();
        })
    });
}