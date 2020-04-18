import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";

const { height, width } = Dimensions.get("window");
import Swipeout from "react-native-swipeout";
import { Icon } from "react-native-elements";
import { connect } from "react-redux";
import HeaderComponent from "./HeaderComponent.js";

class UserListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: props.formDetails,
      listScrollHeight: 0,
      showLoadMask: false,
    };
  }

  _updateListValue = (updatedVal) => {
    this.setState({ listData: updatedVal, showLoadMask: false });
  };
  shouldComponentUpdate(props, state) {
    if (props.formDetails !== this.props.formDetails) {
      this._updateListValue(props.formDetails);
    }
    return true;
  }

  _deleteItem = (item) => {
    this.setState({ showLoadMask: true });
    this.props.dispatch({
      type: "DELETE_ITEM",
      payload: { item },
    });
  };
  _detailsPage = (item) => {
    this.props.navigation.navigate("DetailsScreen", {
      scope: this,
      item: item
    });
  };
  _renderItem = ({ item, index }) => {
    const TrashIcon = () => (
      <View style={styles.deleteIcon}>
        <Icon
          name={"delete"}
          type={"material-community"}
          size={24}
          color="#fff"
        />
      </View>
    );
    const deleteBtn = [
      {
        component: <TrashIcon />,
        backgroundColor: "red",
        onPress: () => this._deleteItem(item),
      },
    ];
    return (
      <Swipeout right={deleteBtn} autoClose backgroundColor="transparent">
        <TouchableOpacity onPress={() => this._detailsPage(item)}>
          <View style={styles.listViewStyle}>
            <View style={styles.idOuterViewStyle}>
              <View style={styles.idInnerViewStyle}>
                <Text style={styles.idTxtStyle}>{index + 1}</Text>
              </View>
            </View>
            <View style={styles.detailsStyle}>
              <Text style={styles.itemTextStyle}>Name : {item.firstName}</Text>
              <Text style={styles.itemTextStyle}>Email : {item.email}</Text>
              <Text style={styles.itemTextStyle}>Age : {item.age}</Text>
              <Text style={styles.itemTextStyle}>
                Phone no : {item.mobileNumber}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Swipeout>
    );
  };

  render() {
    return (
      <View style={styles.container}>
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
        {this.state.listData == null || this.state.listData.length <= 0 ? (
          <Image
            style={{ width: width, height: height }}
            source={require("../../images/empty_cart1.jpg")}
          />
        ) : (
          <FlatList
            style={styles.listStyle}
            ref={(ref) => (this.listRef = ref)}
            data={this.state.listData}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            enableEmptySections={true}
            onScroll={(event) =>
              this.setState({
                listScrollHeight: event.nativeEvent.contentOffset.y,
              })
            }
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => {
              if (this.state.listScrollHeight > height) {
                return (
                  <View
                    style={{
                      width: width,
                      height: height / 15,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() =>
                        this.listRef.scrollToIndex({
                          animated: true,
                          index: 0,
                        })
                      }
                      style={styles.topButtonStyle}
                    >
                      <Text
                        style={{
                          fontSize: height / 55,
                          color: "#008eec",
                        }}
                      >
                        {`Scroll to top`}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              } else return null;
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
  separator: {
    width: width,
    height: 12,
    backgroundColor: "#ececec",
  },
  listViewStyle: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 8,
    borderRadius: 10,
  },
  itemTextStyle: {
    fontSize: 14,
    color: "gray",
  },
  topButtonStyle: {
    width: width / 3,
    height: height / 20,
    borderRadius: width / 30,
    shadowOffset: { width: 3, height: 3 },
    shadowColor: "black",
    shadowOpacity: 0.3,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  listStyle: {
    padding: 8,
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
  detailsStyle: {
    flex: 0.8,
    flexDirection: "column",
    padding: 10,
  },
  idOuterViewStyle: {
    flex: 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  idInnerViewStyle: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: "#008eed",
    justifyContent: "center",
    alignItems: "center",
  },
  idTxtStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  deleteIcon: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    formDetails: state.storeValue.formDetails,
  };
}

export default connect(mapStateToProps)(UserListComponent);
