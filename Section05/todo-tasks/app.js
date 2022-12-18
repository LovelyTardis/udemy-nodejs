import colors from "colors"
import { guardarDB, leerDB } from "./helpers/guardarArchivo.js";
import {
    inquirerMenu, 
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} from "./helpers/inquirer.js";

import Tareas from "./models/tareas.js";

const main = async() => {

    let opt = '';
    const tareas = new Tareas();
    const tareasDB = leerDB();

    if ( tareasDB ) { // load tasks
        tareas.cargarTareasFromArray( tareasDB );
    }

    do {
        // print menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                // crear opcion
                const desc = await leerInput('Description:');
                tareas.crearTarea( desc );
                break;

            case '2':
                tareas.listadoCompleto();
                break;
            
            case '3': // completed tasks list
                tareas.listarPendientesCompletadas(true);
                break;

            case '4': // pending tasks list
                tareas.listarPendientesCompletadas(false);
                break;

            case '5': // complete or pending selection
                const ids = await mostrarListadoChecklist( tareas.listadoArr );
                tareas.toggleCompletadas( ids );
                break;
                       
            case '6': // delete
                const id = await listadoTareasBorrar( tareas.listadoArr );
                if ( id !== '0' ) {
                    const ok = await confirmar('Are you sure?');
                    if ( ok ) {
                        tareas.borrarTarea( id );
                        console.log('Task deleted');
                    }
                }
                break;
        }
        guardarDB( tareas.listadoArr );
        await pausa();
    } while( opt !== '0' );
}


main();

