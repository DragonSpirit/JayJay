import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingHorizontal: '5%',
  },
  scrollViewContentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    flex: 0.9,
    fontSize: 17,
    textAlign: 'center',
    paddingVertical: 10,
  },
  commentButton: {
    width: '100%',
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconsContainer: {
    flex: 0.15,
    flexDirection: 'column',
    padding: 5,
  },
  toggleFavoriteIcon: {
    flex: 0.1,
  },
  shareIcon: {
    flex: 0.1,
  },
})

export default styles
