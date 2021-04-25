import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
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
  }
});