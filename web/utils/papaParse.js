import { head } from 'lodash';
import Papa from 'papaparse';

const MAX_KEYWORDS = 100;

const parseCsvFile = async (csv) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      worker: true,
      error: reject,
      complete: (results) => {
        const { data } = results;
        if(data.length > MAX_KEYWORDS) reject(`Exceed max keywords (1-${MAX_KEYWORDS})!`);
        const keywords = data.map((d) => head(d));
        resolve(keywords);
      },
    });
  });
};

export {
  parseCsvFile,
};
