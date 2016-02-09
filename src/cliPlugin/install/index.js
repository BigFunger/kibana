import fromRoot from '../../utils/fromRoot';
import pkg from '../../utils/packageJson';
import install from './install';
import pluginLogger from '../lib/plugin_logger';
import { parse, parseMilliseconds } from './settings';

export default function pluginInstall(program) {
  function processCommand(command, options) {
    let settings;
    try {
      settings = parse(command, options);
    } catch (ex) {
      //The logger has not yet been initialized.
      console.error(ex.message);
      process.exit(64); // eslint-disable-line no-process-exit
    }

    const logger = pluginLogger(settings);
    install(settings, logger);
  }

  program
  .command('install <plugin/url>')
  .option('-q, --quiet', 'Disable all process messaging except errors')
  .option('-s, --silent', 'Disable all process messaging')
  .option(
    '-c, --config <path>',
    'Path to the config file',
    fromRoot('config/kibana.yml')
  )
  .option(
    '-t, --timeout <duration>',
    'Length of time before failing; 0 for never fail',
    parseMilliseconds
  )
  .option(
    '-d, --plugin-dir <path>',
    'The path to the directory where plugins are stored',
    fromRoot('installedPlugins')
  )
  .description('Install a plugin',
`Common examples:
  install xpack
  install file:///Path/to/my/xpack.zip
  install https://path.to/my/xpack.zip`)
  .action(processCommand);
};
