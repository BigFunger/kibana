import expiry from 'expiry-js';
import { intersection } from 'lodash';
import { resolve } from 'path';
import pkg from '../../utils/packageJson';

function generateUrls(settings) {
  const { version, plugin } = settings;
  return [ plugin, `https://download.elastic.co/packs/${plugin}/${plugin}-${version}.zip` ];
}

export function parseMilliseconds(val) {
  let result;

  try {
    let timeVal = expiry(val);
    result = timeVal.asMilliseconds();
  } catch (ex) {
    result = 0;
  }

  return result;
};

export function parse(command, options) {
  const settings = {
    timeout: options.timeout ? options.timeout : 0,
    quiet: options.quiet ? options.quiet : false,
    silent: options.silent ? options.silent : false,
    config: options.config ? options.config : '',
    plugin: command,
    version: pkg.version,
  };

  settings.urls = generateUrls(settings);
  settings.pluginDir = options.pluginDir;
  settings.workingPath = resolve(settings.pluginDir, '.plugin.installing');
  settings.tempArchiveFile = resolve(settings.workingPath, 'archive.part');

  return settings;
};
