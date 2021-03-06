import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
  Modal,
  PermissionsAndroid,
} from "react-native";
const { height, width } = Dimensions.get("window");
import { connect } from "react-redux";
import HeaderComponent from "./HeaderComponent";
import ImagePicker from "react-native-image-picker";
import Geolocation from "@react-native-community/geolocation";
import { Icon } from "react-native-elements";

const options = {
  title: "Select Avatar",
  storageOptions: {
    skipBackup: true,
    path: "images",
  },
};

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      email: "",
      age: "",
      mobileNumber: "",
      location: "",
      address: "",
      showLoadMask: false,
      imageUrl: "http://getdrawings.com/free-icon/blank-avatar-icon-75.png",
      currentLatitude: 0, //props.loginDetails.latitude,
      currentLongitude: 0, //props.loginDetails.longitude,
    };
    navVar = this.props.navigation;
  }

  _generateLocation = async function() {
    var lati = this.state.currentLatitude;
    var longi = this.state.currentLongitude;
    var latlng = longi + "," + lati;
    url =
      "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
      latlng +
      ".json?access_token=pk.eyJ1IjoicmFrZWVyYWtlc2giLCJhIjoiY2phMHpvOGlsOGoydjMzb3JiNDd4dXRrYiJ9.f10Am4y4NC81Fn9jCBA0Tw";
    try {
      var resp = await this._getCurrentLocation(url);
      this.setState({
        address: resp.features[1].place_name,
        location:
          "lat:" +
          this.state.currentLatitude +
          " " +
          "long:" +
          this.state.currentLongitude,
      });
    } catch (error) {
      console.log(error);
    }
  };

  _getCurrentLocation = function(url) {
    return new Promise(function(resolve, reject) {
      try {
        fetch(url, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((responseJson) => {
            resolve(responseJson);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        console.log(error);
      }
    });
  };

  async _pressPictureUpload() {
    await ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        this.setState({
          imageUrl: response.uri,
        });
      }
    });
  }

  _submitApiCall() {
    return new Promise(function(resolve, reject) {
      try {
        fetch(
          "https://f4f0561d-3b8a-4321-a34e-799bd11b90a6.mock.pstmn.io/saveUser",
          {
            method: "GET",
          }
        )
          .then((response) => {
            resolve(true);
          })
          .catch((error) => {
            reject(error);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  _clearValue() {
    this.setState({
      firstName: "",
      email: "",
      age: "",
      mobileNumber: "",
      location: "",
      address: "",
    });
  }
  _fieldValidation() {
    if (
      this.state.firstName == "" ||
      this.state.email == "" ||
      this.state.age == "" ||
      this.state.mobileNumber == ""
    ) {
      return false;
    }

    return true;
  }
  async onSubmitListener() {
    if (this._fieldValidation()) {
      this.setState({ showLoadMask: true });
      try {
        let resp = await this._submitApiCall();
        if (resp) {
          alert("User has been saved successfully.");
          this.props.dispatch({
            type: "FORM_DETAILS",
            payload: {
              firstName: this.state.firstName,
              email: this.state.email,
              age: this.state.age,
              mobileNumber: this.state.mobileNumber,
              location: this.state.location,
              address: this.state.address,
              imageUrl: this.state.imageUrl,
              currentLongitude: this.state.currentLongitude,
              currentLatitude: this.state.currentLatitude,
            },
          });
          this.setState({ showLoadMask: false });
          this._clearValue();
        } else {
          this.setState({ showLoadMask: false });
          alert("Oops,something went wrong!");
        }
      } catch (error) {
        this.setState({ showLoadMask: false });
        alert("Oops,something went wrong!");
      }
    } else {
      Alert.alert("Warning", "Please enter details....");
    }
  }

  _emailValidation() {
    var emailVal = this.state.email;
    var atPosition = emailVal.indexOf("@");
    var dotPosition = emailVal.lastIndexOf(".");

    if (
      atPosition < 1 ||
      dotPosition < atPosition + 2 ||
      dotPosition + 2 >= emailVal.length
    ) {
      alert("Please enter a valid e-mail address....");
      return false;
    }
    return true;
  }

  _refreshLocation = () => {
    var that = this;
    if (Platform.OS === "ios") {
      Geolocation.getCurrentPosition((position) => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);
        that.setState({
          currentLongitude: currentLongitude,
          currentLatitude: currentLatitude,
        });
        that._generateLocation();
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
            Geolocation.getCurrentPosition((position) => {
              const currentLongitude = JSON.stringify(
                position.coords.longitude
              );
              const currentLatitude = JSON.stringify(position.coords.latitude);
              that.setState({
                currentLongitude: currentLongitude,
                currentLatitude: currentLatitude,
              });

              that._generateLocation();
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

  render() {
    return (
      <View style={styles.OuterContainer}>
        <HeaderComponent />
        {this.state.showLoadMask ? (
          <Modal
            transparent={true}
            animationType={"none"}
            visible={this.state.showLoadMask}
          >
            <View style={styles.modalBackground}>
              <View style={styles.activityIndicatorWrapper}>
                <Text style={styles.loadingTxtStyle}>Loading.....</Text>
                <ActivityIndicator
                  animating={this.state.showLoadMask}
                  color="#00b5ec"
                />
              </View>
            </View>
          </Modal>
        ) : (
          <View />
        )}
        <View style={styles.container}>
          <View style={styles.UpperViewContainer}>
            <View style={styles.IconRoundStyle}>
              <Image
                style={{ width: 80, height: 80, borderRadius: 40 }}
                source={{
                  uri: this.state.imageUrl,
                }}
              />
            </View>
            <TouchableOpacity style={styles.PencilOuterStyle}>
              <View style={styles.PencilInnerStyle}>
                <Icon
                  name={"pencil"}
                  type={"evilicon"}
                  size={18}
                  style={styles.PencilIconStyle}
                  underlayColor="transparent"
                  onPress={() => this._pressPictureUpload()}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Icon
              reverse
              name="user"
              type="simple-line-icon"
              style={styles.inputIcon}
              color="#517fa4"
              size={16}
            />
            <TextInput
              value={this.state.firstName}
              style={styles.inputs}
              placeholder="First name"
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({ firstName: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              reverse
              name="email-outline"
              type="material-community"
              color="gray"
              size={18}
              color="#517fa4"
            />
            <TextInput
              value={this.state.email}
              style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({ email: text })}
              onBlur={() => this._emailValidation()}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              reverse
              name="calendar"
              type="simple-line-icon"
              color="gray"
              size={16}
              color="#517fa4"
            />
            <TextInput
              value={this.state.age}
              style={styles.inputs}
              placeholder="Age"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({ age: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              reverse
              name="mobile-phone"
              type="font-awesome"
              style={styles.inputIcon}
              color="#517fa4"
              size={16}
            />
            <TextInput
              value={this.state.mobileNumber}
              style={styles.inputs}
              placeholder="Mobile Number"
              keyboardType="numeric"
              underlineColorAndroid="transparent"
              onChangeText={(text) => {
                if (text.length > 10) {
                  this.setState({ mobileNumber: this.state.mobileNumber });
                } else {
                  this.setState({ mobileNumber: text });
                }
              }}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon
              reverse
              name="location"
              type="entypo"
              style={styles.inputIcon}
              color="#517fa4"
              size={16}
            />
            <TextInput
              value={this.state.location}
              style={styles.inputs}
              placeholder="Location"
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({ location: text })}
            />
            <TouchableOpacity onPress={() => this._refreshLocation()}>
              <Icon
                reverse
                name="refresh"
                type="font-awesome"
                style={styles.refreshIcon}
                color="#517fa4"
                size={14}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Icon
              reverse
              name="home"
              type="font-awesome"
              style={styles.inputIcon}
              color="#517fa4"
              size={16}
            />
            <TextInput
              value={this.state.address}
              style={styles.inputs}
              placeholder="Address"
              underlineColorAndroid="transparent"
              onChangeText={(text) => this.setState({ address: text })}
            />
          </View>

          <TouchableHighlight
            style={[styles.buttonContainer, styles.submitButton]}
            onPress={() => this.onSubmitListener()}
          >
            <Text style={styles.submitText}>Submit</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  OuterContainer: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  UpperViewContainer: {
    height: 140,
    justifyContent: "center",
    alignItems: "center",
  },
  IconRoundStyle: {
    width: 74,
    height: 74,
    borderRadius: 74,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  PencilOuterStyle: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: height / 50,
  },
  PencilInnerStyle: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: "#40a0c0", //"#3993D5"
  },
  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: width / 1.2,
    height: 45,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  inputs: {
    height: 45,
    marginLeft: 10,
    borderBottomColor: "#FFFFFF",
    flex: 1,
  },
  inputIcon: {
    width: 25,
    height: 25,
    justifyContent: "center",
  },
  refreshIcon: {},
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  submitButton: {
    backgroundColor: "#0966aa",
  },
  submitText: {
    color: "white",
  },
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  loadingTxtStyle: {
    color: "gray",
  },
});

function mapStateToProps(state) {
  return {
    loginDetails: state.storeValue.loginDetails,
  };
}

export default connect(mapStateToProps)(FormComponent);
