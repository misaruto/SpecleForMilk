import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#000",
    minHeight: 80,
  },
  titleContainer: {
    padding: 8,
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontSize: 26,
    width: "100%",
  },
  shareContainer: {
    width: "10%",
  },
});

export default styles;
