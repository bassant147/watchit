#!/usr/bin/env node

const debounce = require('lodash.debounce');

// watch for changes with chokidar library
const chokidar = require('chokidar');

// automatic validation and handling of args that are passed into our program
// ALSO
// add help feature to our tool
const program = require('caporal');

const fs = require('fs');

const { spawn } = require('child_process');

const chalk = require('chalk');

program
  .version('0.0.1')
  .argument('[filename]', 'Name of a file to execute')
  .action(async( {filename} ) => {
    const name = filename || 'index.js';

    // to check if the file which the user entered its name, exists
    try{
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`Could not find the file ${name}`)
    }

    let proc;
    const start = debounce(() => {
      if (proc) {
        proc.kill();
      }
      console.log(chalk.red('>>> Starting process...'));
      // spawn(command[,args][,options])
      // stdio: 'inherit' means -> whenever we create this child process
      //                  whatever logs, errors or whatever get 
      //                  emitted, take that info and pass it through to our program's console log
      proc = spawn('node', [name], { stdio: 'inherit' });
    }, 150)
    
    chokidar.watch('.')
      .on('add', start)
      .on('change', start)
      .on('unlink', start); // file is deleted
  });

program.parse(process.argv);


