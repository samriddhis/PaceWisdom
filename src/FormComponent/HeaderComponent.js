import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { Icon } from "react-native-elements";
import { DrawerActions } from "react-navigation";

export default class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headerTitle: this.props.headerTitle,
      withBack: this.props.withBack,
    };
  }
  _openMenu() {
    navVar.openDrawer();
    //this.state.scope.props.navigation.openDrawer();
  }
  _closeFilter() {
    navVar.goBack();
  }
  render() {
    return (
      <View style={Styles.OuterContainer}>
        {this.state.withBack ? (
          <TouchableOpacity
            onPress={() => this._closeFilter()}
            style={Styles.IconViewStyle}
          >
            <Icon
              name="arrowleft"
              type="antdesign"
              underlayColor="transparent"
              color="#fff"
              size={30}
              underlayColor="transparent"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => this._openMenu()}
            style={Styles.IconViewStyle}
          >
            <Icon
              name="ios-menu"
              type="ionicon"
              color="#fff"
              size={30}
              underlayColor="transparent"
            />
          </TouchableOpacity>
        )}

        <View style={Styles.TitleViewStyle}>
          <Text style={Styles.TitleStyle}>{this.state.headerTitle}</Text>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  OuterContainer: {
    height: 50,
    width: width,
    backgroundColor: "#33809a",
    flexDirection: "row",
    padding: 10,
    elevation: 10,
  },
  IconViewStyle: {
    flex: 0.1,
  },
  TitleViewStyle: {
    flex: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
  TitleStyle: {
    fontSize: 22,
    color: "#fff",
  },
});
