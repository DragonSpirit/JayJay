import { StyleSheet } from 'react-native'

const buttonCommonBackground = 'rgba(92, 99,216, 1)',
  buttonCommonBorderColor = 'transparent',
  containerBackground = '#F5FCFF'

export const commonStyles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: containerBackground,
  },
  buttonStyleCommon: {
    backgroundColor: buttonCommonBackground,
    borderColor: buttonCommonBorderColor,
    borderWidth: 0,
    borderRadius: 5,
  },
  buttonStyleBig: {
    width: 300,
    height: 45,
  },
})