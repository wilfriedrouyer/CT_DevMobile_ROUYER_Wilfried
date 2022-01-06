import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import favFilmReducer from "./reducers/favFilm";

const configPersist = {
  key: "root",
  storage: AsyncStorage,
};

const reducerPersist = persistReducer(configPersist, favFilmReducer);

export const Store = createStore(reducerPersist);
export const Persistor = persistStore(Store);
