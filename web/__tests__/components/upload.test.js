import { Upload } from 'antd';
import {
  configure, shallow,
} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import UploadComponent from '/components/upload';
import { generateUploadConfig } from '/components/upload/uploadHooks';

configure({ adapter: new Adapter() });

let wrapper;
beforeEach(() => {
  wrapper = shallow(<UploadComponent /> );
});

jest.mock('/i18n', () => ({
  withNamespaces: () => Component => {
    Component.defaultProps = { ...Component.defaultProps, t: key => key };
    return Component;
  },
}));

describe('Rendering', () => {
  it('should render <Dragger />', () => {
    const { Dragger } = Upload;
    expect(wrapper.find(Dragger)).toHaveLength(1);
  });
});

describe('Hooks', () => {
  it('should generate upload config properly', async () => {
    const result = generateUploadConfig();
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('accept');
    expect(result).toHaveProperty('showUploadList');
    expect(result).toHaveProperty('beforeUpload');
    expect(result).toHaveProperty('customRequest');
  });
});
