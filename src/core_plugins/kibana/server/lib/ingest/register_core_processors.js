import registerAppend from './processors/append';
import registerConvert from './processors/convert';
import registerDate from './processors/date';
import registerDateIndexName from './processors/date_index_name';
import registerFail from './processors/fail';
import registerForEach from './processors/foreach';
import registerGrok from './processors/grok';
import registerGsub from './processors/gsub';
import registerJoin from './processors/join';
import registerLowercase from './processors/lowercase';
import registerRemove from './processors/remove';
import registerRename from './processors/rename';
import registerScript from './processors/script';
import registerSet from './processors/set';
import registerSort from './processors/sort';
import registerSplit from './processors/split';
import registerTrim from './processors/trim';
import registerUppercase from './processors/uppercase';

export default function registerCoreProcessors(server) {
  registerAppend(server);
  registerConvert(server);
  registerDate(server);
  registerDateIndexName(server);
  registerFail(server);
  registerForEach(server);
  registerGrok(server);
  registerGsub(server);
  registerJoin(server);
  registerLowercase(server);
  registerRemove(server);
  registerRename(server);
  registerScript(server);
  registerSet(server);
  registerSort(server);
  registerSplit(server);
  registerTrim(server);
  registerUppercase(server);
}
