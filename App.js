import React, { useEffect, useState } from "react";
import {
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
//import { useNetInfo } from "@react-native-community/netinfo";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AppNavigator from "./src/component/navigation/AppNavigator";
// import { store, persistor } from "./src/redux/store/store";
import store from "./src/reduxThunk/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { GooglePay } from "react-native-google-pay";
const allowedCardNetworks = ["MASTERCARD" | "VISA"];
//import RNUpiPayment from "react-native-upi-payment";
import RazorpayCheckout from "react-native-razorpay";
import NetInfo from "@react-native-community/netinfo";

console.disableYellowBox = true;
const App = () => {
  //  const netInfo = useNetInfo();
  const isDarkMode = useColorScheme() === "dark";
  const [notConnected, setConnected] = useState(true);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  useEffect(() => {
    NetInfo.addEventListener((state) => {
      console.log("addEventListener", state.isConnected);
      setConnected(state.isConnected);
    });
  }, []);
  // useEffect(() => {
  //   console.log("net info changed, new state: ", netInfo.isConnected);
  //   setConnected(netInfo.isConnected);
  // }, [netInfo]);

  const NoInternet = () => {
    return (
      <View style={styleSheet.noInternet_container}>
        <View style={styleSheet.noInternet_inheritView}>
          <Text style={styleSheet.notConnected_text}>
            No Internet Connection
          </Text>
        </View>
      </View>
    );
  };
  return (
    // <TouchableOpacity
    //   style={{
    //     height: 45,
    //     width: 120,
    //     backgroundColor: "gray",
    //     marginTop: 120,
    //     alignSelf: "center",
    //     justifyContent: "center",
    //     alignItems: "center",
    //   }}
    //   onPress={() => {
    //     var options = {
    //       description: "Credits towards consultation",
    //       image: "https://i.imgur.com/3g7nmJC.png",
    //       currency: "INR",
    //       // key: "rzp_test_1DP5mmOlF5G5ag", // Your api key
    //       key: "rzp_live_VErSWntlBGr5vc",
    //       amount: "100",
    //       name: "Shivam",
    //       prefill: {
    //         email: "isthisshivam@gmail.com",
    //         contact: "7401020740",
    //         name: "Razorpay Software",
    //       },
    //       theme: { color: "#F37254" },
    //     };
    //     RazorpayCheckout.open(options)
    //       .then((data) => {
    //         // handle success
    //         alert(`Success: ${data.razorpay_payment_id}`);
    //       })
    //       .catch((error) => {
    //         // handle failure
    //         alert(`Error: ${error.code} | ${error.description}`);
    //       });
    //   }}
    // >
    //   <Text>Pay</Text>
    // </TouchableOpacity>
    <Provider store={store}>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} />
        <AppNavigator />
        {!notConnected && <NoInternet />}
      </SafeAreaView>
    </Provider>
  );
};
const styleSheet = StyleSheet.create({
  noInternet_container: {
    position: "relative",
    backgroundColor: "red",
    paddingHorizontal: 15,
  },
  noInternet_inheritView: {
    height: 55,
    width: "100%",
    backgroundColor: "red",
    marginBottom: 0,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  alert_img: { height: 25, width: 25, resizeMode: "contain" },
  notConnected_text: { color: "white", marginLeft: 10, fontSize: 17 },
});
export default App;
