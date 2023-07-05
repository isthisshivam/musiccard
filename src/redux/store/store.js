import { createStore, applyMiddleware } from "redux";
import saga from "../saga/index";
import RootReducer from "../reducer/index";
import createSagaMiddleware from "redux-saga";
import {
  persistStore,
  persistCombineReducers,
  persistReducer,
} from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

// redux-persist
const persistReduce = persistReducer(
  {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["loginReducer"],
  },
  RootReducer
);

const sagaMiddleware = createSagaMiddleware();

//store
const store = createStore(persistReduce, applyMiddleware(sagaMiddleware));
const persistor = persistStore(store);
sagaMiddleware.run(saga);
export { store, persistor };

//export default persistor
