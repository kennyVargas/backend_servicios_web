import {restaurarEnlaces} from './myTask.js';

const cronJobs = {
  startAll() {
    console.log('🕒 Iniciando tareas programadas...');
    restaurarEnlaces.start();
  }
};

export default cronJobs;
