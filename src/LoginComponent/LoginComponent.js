import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  ImageBackground,
  Switch,
  StatusBar,
  PermissionsAndroid,
} from "react-native";

import { Avatar } from "react-native-elements";
import { NavigationActions, StackActions } from "react-navigation";
import { connect } from "react-redux";
const { height, width } = Dimensions.get("window");
import Geolocation from "@react-native-community/geolocation";

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      switchValue: true,
      currentLongitude: 0,
      currentLatitude: 0,
    };
  }
  componentDidMount = () => {
    var that = this;
    if (Platform.OS === "ios") {
      Geolocation.watchPosition((position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        that.setState({ currentLongitude: currentLongitude });
        that.setState({ currentLatitude: currentLatitude });
      });
    } else {
      async function requestLocationPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: "Location Access Required",
              message: "This App needs to Access your location",
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.watchPosition((position) => {
              const currentLongitude = JSON.stringify(
                position.coords.longitude
              );
              const currentLatitude = JSON.stringify(position.coords.latitude);
              that.setState({ currentLongitude: currentLongitude });
              that.setState({ currentLatitude: currentLatitude });
            });
          } else {
            console.log("Permission Denied");
          }
        } catch (err) {
          console.log(err);
        }
      }
      requestLocationPermission();
    }
  };
  _emailValidation() {
    var email = this.state.userName;
    var atPosition = email.indexOf("@");
    var dotPosition = email.lastIndexOf(".");

    if (
      atPosition < 1 ||
      dotPosition < atPosition + 2 ||
      dotPosition + 2 >= email.length
    ) {
      alert("Please enter a valid e-mail address....");
      return false;
    }
    return true;
  }

  _loginPress() {
    if (this._emailValidation()) {
      this.props.dispatch({
        type: "LOGIN_STATUS",
        payload: {
          loginStatus: true,
          emailId: this.state.userName,
          latitude: this.state.currentLatitude,
          longitude: this.state.currentLongitude,
        },
      });
      this.props.navigation.dispatch(
        StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: "DrawerNavigator" }),
          ],
        })
      );
    }
  }

  _toggleSwitch() {
    this.setState({
      switchValue: !this.state.switchValue,
      userName: "",
      passWord: "",
    });
  }
  render() {
    return (
      <View style={styles.imageOuterContainer}>
        <StatusBar backgroundColor="#1ADF90" barStyle="light-content" />
        <ImageBackground
          style={styles.imageStyle}
          source={require("../../images/background.jpg")}
        >
          <View style={styles.accViewStyle}>
            <Text style={styles.accTextStyle}>{"My Account"}</Text>
          </View>

          <View style={styles.outerContainer}>
            <TextInput
              style={styles.loginStyle}
              underlineColorAndroid="#D3D3D3"
              placeholder="User name"
              keyboardType="email-address"
              onChangeText={(userName) => this.setState({ userName })}
              value={this.state.userName}
            />
            <TextInput
              secureTextEntry={true}
              style={styles.passwordStyle}
              underlineColorAndroid="#D3D3D3"
              placeholder="Password"
              onChangeText={(passWord) => this.setState({ passWord })}
              value={this.state.passWord}
            />
            <Text style={styles.forgotTextStyle}>{"Forgot Password?"}</Text>
            <Switch
              style={styles.switchStyle}
              value={this.state.switchValue}
              onValueChange={() => this._toggleSwitch()}
            />
            <Text style={styles.currentPageTextStyle}>
              {this.state.switchValue ? "Login" : "SignUp"}
            </Text>
            {this.state.switchValue ? (
              <TouchableOpacity
                style={styles.buttonStyle}
                color="#0966aa"
                onPress={() => this._loginPress()}
              >
                <Text style={{ color: "#fff" }}>{"Log in"}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.buttonStyle}
                color="#0966aa"
                onPress={() => this._loginPress()}
              >
                <Text style={{ color: "#fff" }}>{"Sign up"}</Text>
              </TouchableOpacity>
            )}

            <View style={styles.iconStyle}>
              <View style={styles.iconRoundStyle}>
                <Avatar
                  rounded
                  size="medium"
                  icon={{ name: "user", type: "entypo", size: 50 }}
                  overlayContainerStyle={{ backgroundColor: "#00cc66" }}
                />
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accViewStyle: {
    width: width / 2,
    height: height / 10,
    alignItems: "center",
  },
  accTextStyle: {
    color: "#fff",
    fontSize: 25,
  },
  iconStyle: {
    width: width / 5,
    height: height / 10,
    borderRadius: 40,
    backgroundColor: "#00cc66",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: -40,
  },
  iconRoundStyle: {
    width: width / 7,
    height: height / 14,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
  },
  outerContainer: {
    width: width / 1.3,
    height: height / 2.3,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 2.0,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  loginStyle: { width: width / 1.8 },
  passwordStyle: { marginTop: 10, width: width / 1.8 },
  forgotTextStyle: { marginLeft: 100, marginTop: 10 },
  buttonStyle: {
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    width: width / 1.5,
    height: height / 16,
    borderRadius: 3,
    backgroundColor: "#0966aa",
  },
  switchStyle: {
    marginLeft: 200,
  },
  currentPageTextStyle: {
    marginLeft: 200,
  },
});

function mapStateToProps(state) {
  return {
    loginStatus: state.storeValue.isLoggedIn,
  };
}

export default connect(mapStateToProps)(LoginComponent);
