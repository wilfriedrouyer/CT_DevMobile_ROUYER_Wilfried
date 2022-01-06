import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RootSiblingParent } from 'react-native-root-siblings';

import Flexbox from "./Components/Flexbox";
import BottomNavigation from "./Navigation/BottomTabNavigator";
import { Store, Persistor } from './store/config';

export default function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <RootSiblingParent>
          <NavigationContainer>
            <BottomNavigation />
            <StatusBar style="auto" />
          </NavigationContainer>
        </RootSiblingParent>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 24, // correction barre d'état
  },
});
