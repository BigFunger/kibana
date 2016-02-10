import { extractZip, getPluginNames } from '../extractors/zip';
import { sep } from 'path';
console.log(sep);

describe('kibana cli', function () {

  describe('zip', function () {

    it ('fdssdfsd', function () {
      const logger = {
        log: function (message) {
          console.log(message);
        },
        error: function (message) {
          console.error(message);
        }
      };

      const settings = {
        tempArchiveFile: 'C:/Users/Jim/Desktop/New Folder/xpack-5.0.0.zip',
        workingPath: 'C:/Users/Jim/Desktop/New Folder/temp'
      };

      return getPluginNames(settings, logger)
      .then((result) => {
        console.log(result);
      });

    });

    // it('do something', async function () {
    //   const logger = {
    //     log: function (message) {
    //       console.log(message);
    //     },
    //     error: function (message) {
    //       console.error(message);
    //     }
    //   };

    //   const settings = {
    //     tempArchiveFile: 'C:/Users/Jim/Desktop/New Folder/xpack-5.0.0.zip',
    //     workingPath: 'C:/Users/Jim/Desktop/New Folder/temp',
    //     plugin: 'xpack'
    //   };
    //   //return extractZip(settings, logger);
    //   const pluginName = await getPluginName(settings);
    //   console.log(pluginName);
    // });

  });

});
