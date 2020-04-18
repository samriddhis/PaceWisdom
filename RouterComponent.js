import {
  DrawerNavigator,
  createStackNavigator,
  createDrawerNavigator
} from "react-navigation";
import LoginComponent from "./src/LoginComponent/LoginComponent";
import FormComponent from "./src/FormComponent/FormComponent";
import DetailsComponent from "./src/FormComponent/DetailsComponent.js";
import UserListComponent from "./src/FormComponent/UserListComponent";
import DrawerComponent from "./src/DrawerComponent/DrawerComponent"

const drawerNav = createDrawerNavigator(
  {
    FormScreen: FormComponent,
    UserListScreen: UserListComponent,
  },
  {
    contentComponent: DrawerComponent,
    drawerWidth: 300,
  }
);

const stackNav = createStackNavigator(
  {
    LoginScreen: LoginComponent,
    DrawerNavigator: drawerNav,
    FormScreen: FormComponent,
    DetailsScreen: DetailsComponent,
  },
  {
    initialRouteName: "LoginScreen",
    headerMode: "none",
  }
);

export default stackNav;
