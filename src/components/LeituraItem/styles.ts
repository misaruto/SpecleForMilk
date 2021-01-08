import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,

    borderColor: "gray",
    maxHeight: 70,
    padding: 6,
  },
  leituraNomeContainer: {
    width: "28%",
    height: 34,
    borderRadius: 10,
    flexDirection: "row",
    textAlign: "center",
  },
  leituraNome: {
    flex: 1,
    color: "#fff",
    textAlign: "center",
    alignSelf: "center",
    fontSize: 22,
    fontWeight: "500",
  },
  leituraValorContainer: {
    width: "72%",
  },
  valor: {
    textAlign: "center",
    fontSize: 40,
  },
  unidade: {
    fontSize: 20,
    color: "#aaa",
  },
});

export default styles;
