import { StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    width: '100%',
  },

  form: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 54,
  },

  header: {
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  emoji: {
    fontSize: 44,
    marginBottom: 20,
  },

  input: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
    color: colors.heading,
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: 'center',
  },

  footer: {
    width: '100%',
    marginTop: 40,
    paddingHorizontal: 20,
  }
});