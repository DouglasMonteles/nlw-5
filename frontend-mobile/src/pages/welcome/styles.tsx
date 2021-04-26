import { 
  StyleSheet,
  Dimensions,
} from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  title: {
    marginTop: 38,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
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

  buttonText: {
    color: colors.white,
    fontSize: 24,
  },
});