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

export async function getPluginName(settings) {
  function getPackNameFromFiles(files) {
    const fileParts = files.map((file) => {
      return file.toLowerCase().split(sep);
    });
    const filePart = _.find(fileParts, (parts) => {
      return (parts[0] === 'kibana' && parts[1]);
    });
    return filePart ? filePart[1] : undefined;
  };

  await new Promise((resolve, reject) => {
    const unzipper = new DecompressZip(settings.tempArchiveFile);

    unzipper.on('list', (files) => {
      console.log(files);
      resolve(getPackNameFromFiles(files));
    });

    unzipper.list();
  });
}

export default async function extractZip(settings, logger) {
  //try {
    logger.log('Extracting plugin archive');

    await extractArchive(settings);

    logger.log('Extraction complete');
  // } catch (err) {
  //   logger.error(err);
  //   throw new Error('Error extracting plugin archive');
  // }
};
