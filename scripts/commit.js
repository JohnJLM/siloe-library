/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { exec } = require('child_process');
const readline = require('readline');
//colors
const Reset = '\x1b[0m';
const greenColor = '\x1b[32m';
const Bright = '\x1b[1m';
const FgYellow = '\x1b[33m';

// Función para ejecutar comandos de terminal
function runCommand(command) {
   return new Promise((resolve, reject) => {
      exec(command, (error, stdout) => {
         if (error) {
            reject(error);
            return;
         }
         resolve(stdout.trim());
      });
   });
}

// Obtener la rama actual
async function getCurrentBranch() {
   try {
      const branch = await runCommand('git rev-parse --abbrev-ref HEAD');
      return branch;
   } catch (error) {
      console.error('Error obteniendo la rama actual:', error);
      return null;
   }
}

// Función para realizar el commit
async function commitChanges(branch, message) {
   try {
      await runCommand('git add .');
      console.log(`${greenColor}[+] Cambios añadidos ✅${Reset}`);
      const commitMessage = `${branch} ${message}.`;
      await runCommand(`git commit -m "${commitMessage}"`);
      console.log(`${greenColor}[+] Commit Realizado ✅${Reset}`);

      const pushChoice = await askForPushChoice();
      if (pushChoice.toLowerCase() === 's' || pushChoice.toLowerCase() === '') {
         await pushChanges(branch);
      }
   } catch (error) {
      console.error('Error al hacer commit:', error);
   }
}

// Función para realizar el push
async function pushChanges(branch) {
   try {
      console.log(`${FgYellow}[-] Subiendo Cambios...${Reset}`);
      await runCommand(`git push origin ${branch}`);
      console.log(`${greenColor}[+] Cambios enviados al repositorio remoto.✅${Reset}`);
   } catch (error) {
      console.error('Error al hacer push:', error);
   }
}

// Función para preguntar si se desea hacer push
function askForPushChoice() {
   return new Promise((resolve) => {
      const rl = readline.createInterface({
         input: process.stdin,
         output: process.stdout,
      });

      rl.question(`${Bright}¿Deseas hacer push? (S/n):${Reset} `, (choice) => {
         rl.close();
         resolve(choice.trim() === '' ? 's' : choice.toLowerCase());
      });
   });
}

// Ejecutar el script
(async () => {
   const currentBranch = await getCurrentBranch();

   if (currentBranch) {
      const rl = readline.createInterface({
         input: process.stdin,
         output: process.stdout,
      });

      rl.question(`${Bright}Introduce el mensaje del commit (${currentBranch}): ${Reset}`, async (message) => {
         await commitChanges(currentBranch, message);
         rl.close();
      });
   }
})();
