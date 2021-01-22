import {IMetaInfo} from '../../types';

const metaInfoParser = (toConvert: string): IMetaInfo => {
  let result: IMetaInfo = {} as IMetaInfo;
  let a = toConvert.replace("'", '').replace("'", '').split(',');
  a.map((b) => {
    let c = b.split(':');
    result = {...result, [c[0]]: c[1]};
  });
  return result;
};

export default metaInfoParser;
