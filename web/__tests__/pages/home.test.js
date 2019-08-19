import { Table } from 'antd';
import {
  configure, shallow,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { head } from 'lodash';

import UploadComponent from '/components/upload';
import HomePage from '/pages/home';
import {
  getAllKeywords,
  paginationConfig,
} from '/pages/home/homeHooks';

configure({ adapter: new Adapter() });

const mockKeywords = [
  {
    keyword: 'Google',
    totalAdwords: 2,
    totalLinks: 10,
    totalResults: 1200000,
  },
  {
    keyword: 'Grab',
    totalAdwords: 1,
    totalLinks: 6,
    totalResults: 200000,
  },
];

jest.mock('/i18n', () => ({
  withNamespaces: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  },
}));

jest.mock('/services/keywordsService', () => ({
  getKeywords: jest.fn(() => mockKeywords),
}));

let wrapper;
beforeEach(() => {
  wrapper = shallow(<HomePage /> );
});

describe('Rendering', () => {
  it('should render <Table />', () => {
    expect(wrapper.find(Table)).toHaveLength(1);
  });

  it('should render <UploadComponent />', () => {
    expect(wrapper.find(UploadComponent)).toHaveLength(1);
  });
});

describe('Hooks', () => {
  it('should return pagination config', () => {
    const result = paginationConfig;
    expect(result.defaultPageSize).toBe(15);
  });

  it('should return keywords properly', async () => {
    const result = await getAllKeywords();
    const firstIndex = head(result);
    expect(result).toHaveLength(2);
    expect(firstIndex.keyword).toEqual('Google');
    expect(firstIndex.totalAdwords).toBe(2);
    expect(firstIndex.totalLinks).toBe(10);
    expect(firstIndex.totalResults).toBe(1200000);
  });
});
