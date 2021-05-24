import { 
  StyleSheet,
  Dimensions,
} from "react-native";

import colors from "../../styles/colors";
import fonts from '../../styles/fonts';

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },

  title: {
    marginTop: 38,
    fontSize: 28,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 38,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  
  image: {
    width: 292,
    height: Dimensions.get('window').width * .7,
  },

  button: {
    width: 56,
    height: 56,
    backgroundColor: colors.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginBottom: 10,
  },

  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  },
});