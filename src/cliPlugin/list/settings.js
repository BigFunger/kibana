import { resolve } from 'path';

export function parse(options) {
  let settings = {
    silent: false,
    quiet: false
  };

  settings.pluginDir = options.pluginDir;
  if (settings.package) {
    settings.pluginPath = resolve(settings.pluginDir, settings.package);
  }

  return settings;
};
