import _ from 'lodash';
import downloadHttpFile from './downloaders/http';
import downloadLocalFile from './downloaders/file';
import { parse } from 'url';

export default function createPluginDownloader(settings, logger) {
  //Attempts to download each url in turn until one is successful
  function download() {
    const urls = settings.urls.slice(0);

    function tryNext() {
      const sourceUrl = urls.shift();
      if (!sourceUrl) {
        throw new Error('No valid url specified.');
      }

      logger.log(`Attempting to transfer from ${sourceUrl}`);

      return downloadSingle(sourceUrl)
      .catch((err) => {
        if (err.message === 'ENOTFOUND') {
          return tryNext();
        }
        throw (err);
      });
    }

    return tryNext();
  }

  function downloadSingle(sourceUrl) {
    const urlInfo = parse(sourceUrl);
    let downloadPromise;

    if (/^file/.test(urlInfo.protocol)) {
      console.log(`yep. It's a local file url. "${urlInfo.path}", "${decodeURI(urlInfo.path)}"`);
      downloadPromise = downloadLocalFile(logger, decodeURI(urlInfo.path), settings.tempArchiveFile);
    } else {
      console.log(`yep. It's a http url.`);
      downloadPromise = downloadHttpFile(logger, sourceUrl, settings.tempArchiveFile, settings.timeout);
    }

    return downloadPromise;
  }

  return {
    download: download,
    _downloadSingle: downloadSingle
  };
};
