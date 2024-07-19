/* eslint-disable no-undef */
import shell from 'shelljs'; // = require("shelljs");
import inquirer from 'inquirer'; // = require("inquirer");
import chalk from 'chalk'; // = require("chalk");
import fuzzy from 'fuzzy'; // = require("fuzzy");
import inquirerAutoComplete from 'inquirer-autocomplete-prompt'; // = require("inquirer-autocomplete-prompt");

// Registrar el tipo de prompt "autocomplete"
inquirer.registerPrompt('autocomplete', inquirerAutoComplete);

async function mainMenu() {
   // Mostrar encabezado
   console.clear();
   console.log(chalk.red.bold('================================'));
   console.log(chalk.blue.bold('   GIT TOOL v0.3 by JoeCode™   '));
   console.log(chalk.gray.dim('        totpes version   '));
   console.log(chalk.red.bold('================================'));
   console.log('');
   const choices = ['Hacer commit', 'Hacer merge', 'Salir'];

   const { action } = await inquirer.prompt([
      {
         type: 'list',
         name: 'action',
         message: '¿Qué quieres hacer?\n',
         choices,
         prefix: '',
      },
   ]);

   switch (action) {
      case 'Hacer commit':
         await handleCommit();
         break;
      case 'Hacer merge':
         await handleMerge();
         break;
      case 'Salir':
         process.exit();
         break;

      default:
         throw new Error('NO han entrado en el switch');
   }

   mainMenu();
}

async function handleCommit() {
   const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.trim();
   const { message } = await inquirer.prompt([
      {
         type: 'input',
         name: 'message',
         message: `Introduce el mensaje del commit para (${currentBranch}):`,
      },
   ]);

   shell.exec(`git add . && git commit -m "${currentBranch}: ${message}."`);

   const { shouldPush } = await inquirer.prompt([
      {
         type: 'confirm',
         name: 'shouldPush',
         message: '¿Quieres subir los cambios? ✨',
         default: true,
      },
   ]);

   if (shouldPush) {
      let loadingMessage = 'Subiendo cambios';
      let interval = setInterval(() => {
         process.stdout.clearLine();
         process.stdout.cursorTo(0);
         process.stdout.write(loadingMessage);
         loadingMessage += '.';
         if (loadingMessage.length > 'Subiendo cambios...'.length) {
            loadingMessage = 'Subiendo cambios';
         }
      }, 100); // Actualizará el mensaje cada 100 ms

      const result = shell.exec('git push', { silent: true });

      clearInterval(interval); // Detener la animación de carga
      process.stdout.clearLine();
      process.stdout.cursorTo(0);

      if (result.code !== 0) {
         console.log(chalk.red('❌ Ha habido un error al subir los cambios.'));
      } else {
         console.log(chalk.green('✅ Cambios subidos con éxito.'));
      }
   }
}

async function handleMerge() {
   const branches = shell
      .exec('git branch --all', { silent: true })
      .stdout.split('\n')
      .map((b) => b.trim());

   const { branchToMerge } = await inquirer.prompt([
      {
         type: 'autocomplete',
         name: 'branchToMerge',
         message: 'Selecciona la rama desde la que quieres hacer el merge:',
         default: 'test',
         source: function (answers, input) {
            input = input || '';
            return new Promise(function (resolve) {
               const fuzzyResult = fuzzy.filter(input, branches);
               resolve(fuzzyResult.map((el) => el.original));
            });
         },
      },
   ]);

   const changes = shell.exec('git status --porcelain', { silent: true }).stdout.trim();

   if (changes) {
      const { saveChanges } = await inquirer.prompt([
         {
            type: 'confirm',
            name: 'saveChanges',
            message: 'Tienes cambios sin guardar, ¿quieres guardarlos? 💾',
            default: true,
         },
      ]);

      if (saveChanges) {
         await handleCommit();
      }
   }

   const mergeResult = shell.exec(
      `git pull && git checkout ${branchToMerge} && git pull && git checkout - && git merge ${branchToMerge}`,
   );

   if (mergeResult.code !== 0) {
      console.log(chalk.yellow('⚠️  Detectados conflictos de merge. Abriendo archivos conflictivos en VS Code...'));

      // Obtener la lista de archivos con conflictos
      const conflictedFiles = shell.exec('git diff --name-only --diff-filter=U', { silent: true }).stdout.trim().split('\n');

      if (conflictedFiles.length > 0) {
         // Abrir cada archivo conflictivo en VS Code
         conflictedFiles.forEach((file) => {
            shell.exec(`code --goto ${file}`);
         });
      }

      const { resolved } = await inquirer.prompt([
         {
            type: 'confirm',
            name: 'resolved',
            message: '¿Has resuelto todos los conflictos? (asegúrate de haber hecho commit de las resoluciones)',
            default: false,
         },
      ]);

      if (!resolved) {
         console.log(chalk.red('❌ Resolución de conflictos cancelada o incompleta. Abortando merge.'));
         shell.exec('git merge --abort');
         return;
      }

      console.log(chalk.green('✅ Conflictos resueltos y merge completado.'));
   } else {
      console.log(chalk.green('✅ Merge realizado con éxito.'));
   }
}

mainMenu();
