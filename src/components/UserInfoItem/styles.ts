import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    height: 90,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    paddingHorizontal: 8,
  },
  imageContainer: {
    borderRadius: 50,
    backgroundColor: "#C4C4C4",
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
    textAlign: "center",
    width: 60,
    height: 60,
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 50,
  },
  userInfoContainer: {
    marginLeft: 4,
  },
  userName: {
    overflow: "hidden",
    fontSize: 20,
    fontWeight: "600",
  },
});

export default styles;
