import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Share,
  BackHandler,
  Platform,
  Dimensions,
} from "react-native";
import RazorpayCheckout from "react-native-razorpay";
const RazorPay = async (config, onPaymentSuccess, onPaymentFailed) => {
  await RazorpayCheckout.open(config)
    .then((resolve) => {
      // handle success
      return onPaymentSuccess(resolve);
    })
    .catch((reject) => {
      // handle failure
      return onPaymentFailed(reject);
    });
};
export default RazorPay;
