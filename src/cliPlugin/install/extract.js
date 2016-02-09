import zipExtract from './extractors/zip';
import { ZIP } from './file_type';

export default function extract(settings, logger, archiveType) {
  switch (archiveType) {
    case ZIP:
      return zipExtract(settings, logger);
      break;
    default:
      throw new Error('Unsupported archive format.');
  }
};
