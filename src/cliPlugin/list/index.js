const utils = require('requirefrom')('src/utils');
const fromRoot = utils('fromRoot');
import { parse } from './settings';
import lister from './plugin_lister';

export default function pluginList(program) {
  function processCommand(command, options) {
    let settings;
    try {
      settings = parse(command, options);
    } catch (ex) {
      //The logger has not yet been initialized.
      console.error(ex.message);
      process.exit(64); // eslint-disable-line no-process-exit
    }

    console.log(settings);
  }

  program
    .command('list')
    .description('List installed plugins')
    .option(
      '-d, --plugin-dir <path>',
      'The path to the directory where plugins are stored',
      fromRoot('installedPlugins')
    )
    .action(processCommand);
};
