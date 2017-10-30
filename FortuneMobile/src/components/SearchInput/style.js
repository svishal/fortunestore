import { StyleSheet } from 'react-native';
import { GREY_MEDIUM, WHITE } from '../../constants/colors';

const styles = StyleSheet.create({
  boxSearch: {
    position: 'relative',
  },
  iconSearch: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 8,
    left: 5,
  },
  inputSearch: {
    borderRadius: 4,
    backgroundColor: WHITE,
    borderColor: GREY_MEDIUM,
    borderWidth: 1,
    marginRight: 16,
    paddingLeft: 32,
    fontSize: 15,
    width: '100%',
    height: 40,
  },
  iconClear: {
    position: 'absolute',
    top: 8,
    right: 5,
  },
});

export default styles;
