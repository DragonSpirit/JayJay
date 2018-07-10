import { NativeModules } from 'react-native'

const mockComponent = require('react-native/jest/mockComponent')
jest.mock('TextInput', () => {
  const RealComponent = require.requireActual('TextInput');
  const React = require('React');
  class TextInput extends React.Component {
    render() {
      delete this.props.autoFocus;
      return React.createElement('TextInput', this.props, this.props.children);
    }
  }
  TextInput.propTypes = RealComponent.propTypes;
  return TextInput;
});

NativeModules.BlobModule = {
  ...NativeModules.BlobModule,
  addNetworkingHandler: jest.fn()
};
