import {
  isExceedMaximum,
  mapKeyword,
} from '/utils/papaParse';

describe('isExceedMaximum', () => {
  it('should return true when csv file contain keywords more than maximum keyword (100)', () => {
    const dataLengthInput = 150;
    const result = isExceedMaximum(dataLengthInput);
    expect(result).toBeTruthy();
  });

  it('should return false when csv file contain keywords lower than maximum keyword (100)', () => {
    const dataLengthInput = 40;
    const result = isExceedMaximum(dataLengthInput);
    expect(result).toBeFalsy();
  });
});

describe('mapKeyword', () => {
  it('should be able to transform keyword when csv file is column format', () => {
    const keywordsInput = [
      ['rails'],
      ['ruby'],
      ['developer'],
      ['job'],
      ['test'],
    ];
    const result = mapKeyword(keywordsInput);
    expect(result.length).toBe(5);
  });

  it('should be able to transform keyword when csv file is comma format', () => {
    const keywordsInput = ['rails', 'ruby', 'developer', 'job', 'test'];
    const result = mapKeyword(keywordsInput);
    expect(result.length).toBe(5);
  });
});
