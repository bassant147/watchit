#!/usr/bin/env node

const debounce = require('lodash.debounce');
// watch for changes with chokidar library
const chokidar = require('chokidar');

const start = debounce(() => {
  console.log('STARTING USER\'S PROGRAM');
}, 100)

chokidar.watch('.')
  .on('add', start)
  .on('change', () => console.log('FILE CHANGED'))
  .on('unlink', () => console.log('FILE UNLINKED')); // file is deleted