import { head } from 'lodash';
import Papa from 'papaparse';

const MAX_KEYWORDS = 100;

export const isExceedMaximum = (dataLength) => {
  if(dataLength > MAX_KEYWORDS) return true;
  return false;
};

export const mapKeyword = (keyword) => {
  if(keyword.length === 1) {
    // when csv file is in comma format
    // example: rails,ruby,developer job
    return head(keyword);
  }
  else {
    // when csv file is column format
    // example:
    // rails
    // ruby
    // developer
    // job
    return keyword.map((key) => head(key));
  }
};

export const parseCsvFile = async (csv) => {
  return new Promise((resolve, reject) => {
    Papa.parse(csv, {
      worker: true,
      error: reject,
      comments: '#',
      skipEmptyLines: true,
      complete: (results) => {
        const { data } = results;
        if (isExceedMaximum(data.length)) reject(`Exceed max keywords (1-${MAX_KEYWORDS})!`);
        const keywords = mapKeyword(data);
        resolve(keywords);
      },
    });
  });
};
