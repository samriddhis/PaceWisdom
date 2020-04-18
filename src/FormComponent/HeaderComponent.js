import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableOpacity,
} from "react-native";
const { width } = Dimensions.get("window");
import { Icon } from "react-native-elements";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      name:""
    }
  }

  _openMenu() {
    navVar.openDrawer();
    //this.state.scope.props.navigation.openDrawer();
  }

  render() {
    return (
      <View style={Styles.outerContainer}>
        <StatusBar backgroundColor="#0966aa" barStyle="light-content" />
        <TouchableOpacity
          onPress={() => this._openMenu()}
          style={Styles.iconViewStyle}
        >
          <Icon
            name="ios-menu"
            type="ionicon"
            color="#fff"
            size={35}
            underlayColor="transparent"
          />
        </TouchableOpacity>
        <View style={Styles.titleViewStyle}>
          <Text style={Styles.titleStyle}>Info</Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  outerContainer: {
    height: 50,
    width: width,
    backgroundColor: "#0966aa",
    flexDirection: "row",
    padding: 10,
    elevation: 10,
  },
  iconViewStyle: {
    flex: 0.1,
  },
  titleViewStyle: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    fontSize: 22,
    color: "#fff",
  },
});
