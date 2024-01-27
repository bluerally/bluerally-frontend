import { omitBy } from 'lodash';

export const filterEmptyValues = (obj: Record<string, any>) => {
  return omitBy(
    obj,
    (value) => value === undefined || value === null || value === '',
  );
};
