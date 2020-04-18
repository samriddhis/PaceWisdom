import React from "react";
import { View, Text, StyleSheet, Dimensions, Image } from "react-native";
import { Icon } from "react-native-elements";
import HeaderComponent from "./HeaderComponent";
const { width, height } = Dimensions.get("window");

export default class DetailsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemDetails: this.props.navigation.getParam("item"),
    };
  }

  _backButtonPress() {
    this.props.navigation.goBack();
  }

  render() {
    return (
      <View style={styles.filterContainerStyle}>
        <HeaderComponent headerTitle="Details Page" withBack={true} />
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
              <Text style={styles.StyleTxtStyle}>
                Email:{this.state.itemDetails.email}
              </Text>
              <Text style={styles.SizeTxtStyle}>
                Age :{this.state.itemDetails.age}
              </Text>
              <Text style={styles.SizeTxtStyle}>
                Number :{this.state.itemDetails.mobileNumber}
              </Text>
              <Text style={styles.SizeTxtStyle}>
                Location : {this.state.itemDetails.location}
              </Text>
              <Text style={styles.SizeTxtStyle}>
                Address :{this.state.itemDetails.address}
              </Text>
            </View>
          </View>
          <View style={styles.BottomContainerStyle}>
            <Text style={styles.AboutTxtStyle}>About : </Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  filterContainerStyle: {
    flex: 1,
    backgroundColor: "#F6F6F6",
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
  StyleTxtStyle: {
    fontSize: 16,
    fontWeight: "200",
    color: "darkgray",
  },
  SizeTxtStyle: {
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
  AboutTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "gray",
  },
  DescriptionTxtStyle: {
    fontSize: 14,
    color: "gray",
  },
  PlusIconViewStyle: {
    paddingRight: 5,
    paddingTop: 10,
    flex: 1.7,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 80,
  },
  countStyle: {
    borderRadius: 20,
    width: 20,
    height: 20,
    borderColor: "black",
    borderWidth: 0.5,
    textAlign: "center",
  },
});
