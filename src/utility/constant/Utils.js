import {
  Dimensions,
  PixelRatio,
  Platform,
  StatusBar,
  View,
} from "react-native";
const { width, height } = Dimensions.get("window");
import Toast from "react-native-simple-toast";
import React from "react";
//import Constants from "../frequent/Constants";
//import Snackbar from "react-native-snackbar";
const APPBAR_HEIGHT = Platform.OS === "ios" ? 44 : 0;

const widthToDp = (number) => {
  let givenWidth = typeof number === "number" ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
  //will return a DPI(Density pixel ratio);
};
const hasWhiteSpace = (s) => {
  return /\s/g.test(s);
};

const heightToDp = (number) => {
  let givenHeight = typeof number === "number" ? number : parseFloat(number);
  return PixelRatio.roundToNearestPixel((width * givenHeight) / 100);
  //will return a DPI(Density pixel ratio);
};

const inflateToast = (message) => {
  Toast.show(message, Toast.SHORT);
};
const isValidURL = (str) => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  console.log("validUrl", !!pattern.test(str));
  return !!pattern.test(str);
};
const Statusbar = () => {
  return (
    <View>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={"#393953"}
        translucent={false}
      />
      <View style={{ height: APPBAR_HEIGHT, backgroundColor: "#393953" }} />
    </View>
  );
};
// const inflateSnackbar = message => {
//   Snackbar.show({
//     text: message,
//     duration: 500,
//     backgroundColor: 'green',
//   });
// };

export { heightToDp, widthToDp, width, height, Statusbar, inflateToast };
