import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  novaLeituraContainer: {
    position: "absolute",
    borderRadius: 50,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "black",
    bottom: 70,
    right: 10,
  },
  novaLeituraButton: {
    flex: 1,
    alignItems: "center",

    justifyContent: "center",
    height: 90,
    width: 90,
    borderRadius: 50,
  },
});

export default styles;
