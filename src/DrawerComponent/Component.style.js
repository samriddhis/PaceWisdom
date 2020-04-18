import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");
export default {
  container: {
    flex: 1
  },
  ProfilePicStyle: {
    backgroundColor: "lightgrey",
    flexDirection: "row",
    padding: 22
  },
  ProfileTextStyle: {
    marginLeft: 10,
    fontSize: 14
  },
  NavHeaderStyle: {
    flexDirection: "row",
    padding: 16
  },
  NavHeaderTextStyle: {
    marginLeft: 10,
    fontSize: 13
  }
};
