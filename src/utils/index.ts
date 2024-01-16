import { omitBy, isNil, isEmpty } from 'lodash';

export const filterEmptyValues = (obj: Record<string, any>) => {
  return omitBy(obj, (value) => isNil(value) || isEmpty(value));
};
