import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  useColorScheme,
  Dimensions,
  View,
  Pressable,
} from "react-native";
import COLORS from "../../utility/constant/Colors";
const Separator = (props) => {
  return (
    <View
      style={{
        height: 1,
        marginTop: 10,
        backgroundColor: COLORS.border_Color,
        width: "100%",
      }}
    ></View>
  );
};

export default Separator;
