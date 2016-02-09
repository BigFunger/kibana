import { extractZip, getPluginName } from '../extractors/zip';

describe('kibana cli', function () {

  describe('zip', function () {

    it('do something', function () {
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
        workingPath: 'C:/Users/Jim/Desktop/New Folder/temp',
        plugin: 'xpack'
      };
      //return extractZip(settings, logger);
      return getPluginName(settings)
      .then(console.log);
    });

  });

});
