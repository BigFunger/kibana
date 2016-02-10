import _ from 'lodash';
import DecompressZip from '@bigfunger/decompress-zip';
import { sep } from 'path';

async function extractArchive(settings) {
  await new Promise((resolve, reject) => {
    const unzipper = new DecompressZip(settings.tempArchiveFile);

    unzipper.on('error', reject);

    unzipper.extract({
      path: settings.workingPath,
      strip: 2,
      filter(file) {
        let extract = false;
        const pathFilters = [ `kibana/${settings.plugin}` ];

        pathFilters.forEach((pathFilter) => {
          const regExString = pathFilter + '($|/)';
          const regex = new RegExp(regExString, 'i');
          if ((file.parent.match(regex)) && file.type !== 'SymbolicLink') {
            extract = true;
          }
        });

        return extract;
      }
    });

    unzipper.on('extract', resolve);
  });
}

export async function examineArchive(settings) {
  const plugins = await new Promise((resolve, reject) => {
    const lister = new DecompressZip(settings.tempArchiveFile);

    lister.on('list', (files) => {
      files = files.map(file => file.replace(/\\/g, '/'));

      for (var file of files) {
        var regExp = new RegExp('kibana/([^/]+)');
        var matches = file.match(regExp);
        if (matches) {
          resolve(matches[1]);
        }
      }

      reject('No plugins found');
    });

    lister.list();
  });

  return plugins;
}


export async function getPluginNames(settings, logger) {
  try {
    logger.log('Retrieving metadata from plugin archive');

    const pluginNames = await examineArchive(settings);

    logger.log(`Retrieval complete - "${pluginNames}"`);

    return pluginNames;
  } catch (err) {
    logger.error(err);
    throw new Error('Error retrieving metadata from plugin archive');
  }
}

export default async function extractZip(settings, logger) {
  try {
    logger.log('Extracting plugin archive');

    await extractArchive(settings);

    logger.log('Extraction complete');
  } catch (err) {
    logger.error(err);
    throw new Error('Error extracting plugin archive');
  }
};
