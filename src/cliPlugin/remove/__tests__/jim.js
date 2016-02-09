import extractZip from '../extractors/zip';

describe('kibana cli', function () {

  describe('zip', function () {

    it('throw an error when passed an unknown archive type', function () {
      const logger = {
        log: function (message) {
          console.log(message);
        },
        error: function (message) {
          console.error(message);
        }
      };

      const settings = {
        tempArchiveFile: 'C:/Users/Jim/Desktop/NewFolder/xpack-5.0.0.zip',
        workingPath: 'C:/Users/Jim/Desktop/NewFolder/temp',
        archivePathFilters: [ 'kibana/xpack-32', 'kibana/xpack' ]
      };
      return extractZip(settings, logger);

    });

  });

});
