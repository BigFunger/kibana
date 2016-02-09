import { resolve } from 'path';

export function parse(options) {
  let settings = {
    silent: false,
    quiet: false
  };

  if (options.parent && options.parent.quiet) {
    settings.quiet = options.parent.quiet;
  }

  if (options.silent) {
    settings.silent = options.silent;
  }

  if (options.config) {
    settings.config = options.config;
  }

  settings.pluginDir = options.pluginDir;

  if (settings.package) {
    settings.pluginPath = resolve(settings.pluginDir, settings.package);
  }

  return settings;
};
