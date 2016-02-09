const utils = require('requirefrom')('src/utils');
const fromRoot = utils('fromRoot');
import pluginLogger from '../lib/plugin_logger';
import { parseMilliseconds } from './settings';

export default function pluginList(program) {
  function processCommand(command, options) {
    console.log(command);
    console.log(options);
  }

  program
  .command('remove <plugin>')
  .option('-q, --quiet', 'Disable all process messaging except errors')
  .option('-s, --silent', 'Disable all process messaging')
  .option(
    '-c, --config <path>',
    'Path to the config file',
    fromRoot('config/kibana.yml')
  )
  .option(
    '-d, --plugin-dir <path>',
    'The path to the directory where plugins are stored',
    fromRoot('installedPlugins')
  )
  .description('Remove a plugin',
`Common examples:
  remove xpack`)
  .action(processCommand);
};
