import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image } from "react-native";

import Watched from "../Components/Watched";
import Search from "../Components/Search";
import Film from "../Components/Film";
import Colors from "../definitions/Colors";

const SearchNavigation = createStackNavigator();


const RootStack = () => {
  return (
    <SearchNavigation.Navigator initialRouteName="ViewSearch">
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Search}
        options={{ title: "Search", headerShow: false }}
      />
      <SearchNavigation.Screen
        name="ViewFilm"
        component={Film}
        options={{ title: "Film", headerShow: false }}
      />
    </SearchNavigation.Navigator>
  );
};

const FilmStack = () => {
  return (
    <SearchNavigation.Navigator initialRouteName="ViewSearch">
      <SearchNavigation.Screen
        name="ViewSearch"
        component={Watched}
        options={{ title: "Search", headerShow: false }}
      />
    </SearchNavigation.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="ViewRoot"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="ViewRoot"
        component={RootStack}
        options={{
          title: "Search",
          tabBarIcon: ({ focused }) => (
            <Image
            source={require("../assets/search.png")}
              style={{
                width: 20,
                height: 20,
                tintColor: Colors.mainGreen,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ViewFlexbox"
        component={FilmStack}
        options={{
          title: "Watched",
          tabBarIcon: ({ focused }) => (
            <Image
            source={require("../assets/favFull.png")}
              style={{
                width: 25,
                height: 25,
                tintColor: Colors.mainGreen,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;