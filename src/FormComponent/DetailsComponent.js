import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Icon } from "react-native-elements";
import HeaderComponent from "./HeaderComponent";
const { width, height } = Dimensions.get("window");
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default class DetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetails: this.props.navigation.getParam("item"),
    };
    this._setCurrentLocation();
  }

  _setCurrentLocation() {
    (this.region = {
      latitude: parseFloat(this.state.itemDetails.currentLatitude),
      longitude: parseFloat(this.state.itemDetails.currentLongitude),
      latitudeDelta: 0.0043,
      longitudeDelta: 0.0034,
    }),
      (this.marker = {
        title: this.state.itemDetails.address,
        address: this.state.itemDetails.address,
        coOrd: {
          latitude: parseFloat(this.state.itemDetails.currentLatitude),
          longitude: parseFloat(this.state.itemDetails.currentLongitude),
        },
      });
  }

  _backButtonPress() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.OuterContainerStyle}>
        <View style={[styles.headerStyle]}>
          <Icon
            color="#fff"
            name="arrowleft"
            type="antdesign"
            underlayColor="transparent"
            onPress={() => this._backButtonPress()}
          />
        </View>
        <View style={styles.DetailsContainerStyle}>
          <View style={styles.UpperContainerStyle}>
            <View style={styles.ImageContainerStyle}>
              <Image
                style={styles.ImageStyle}
                source={{
                  uri: this.state.itemDetails.imageUrl,
                }}
              />
            </View>
            <View style={styles.DetailContainerStyle}>
              <Text style={styles.NameTxtStyle}>
                Name:{this.state.itemDetails.firstName}
              </Text>
              <Text style={styles.EmailTxtStyle}>
                Email:{this.state.itemDetails.email}
              </Text>
              <Text style={styles.AgeTxtStyle}>
                Age :{this.state.itemDetails.age}
              </Text>
              <Text style={styles.AgeTxtStyle}>
                Number :{this.state.itemDetails.mobileNumber}
              </Text>
              <Text style={styles.AgeTxtStyle}>
                Location : {this.state.itemDetails.location}
              </Text>
              <Text style={styles.AgeTxtStyle}>
                Address :{this.state.itemDetails.address}
              </Text>
            </View>
          </View>
          <View style={styles.BottomContainerStyle}>
            <Text style={styles.MapTxtStyle}>Map : </Text>
            <MapView
              ref={(map) => {
                this.map = map;
              }}
              region={this.region}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
            >
              <MapView.Marker
                title={this.marker.title}
                description={this.marker.address}
                coordinate={this.marker.coOrd}
              />
            </MapView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  OuterContainerStyle: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  headerStyle: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 50,
    width: width,
    backgroundColor: "#0966aa",
    elevation: 20,
  },
  DetailsContainerStyle: {
    flex: 1,
    backgroundColor: "#EFF0F1",
  },
  UpperContainerStyle: {
    flex: 0.3,
    flexDirection: "row",
    margin: 10,
  },
  ImageContainerStyle: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  ImageStyle: {
    width: 130,
    height: 200,
    borderRadius: 20,
  },
  NameTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  EmailTxtStyle: {
    fontSize: 16,
    fontWeight: "200",
    color: "darkgray",
  },
  AgeTxtStyle: {
    fontSize: 16,
    fontWeight: "200",
    color: "#909090",
  },
  DetailContainerStyle: {
    flex: 0.6,
    padding: 10,
  },
  BottomContainerStyle: {
    flex: 0.7,
    margin: 15,
  },
  MapTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  }
});
