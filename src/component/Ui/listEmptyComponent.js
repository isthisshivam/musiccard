import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Pressable,
  TextInput,
  ImageBackground,
  View,
  Dime,
} from "react-native";
import Dialog, {
  DialogContent,
  FadeAnimation,
} from "react-native-popup-dialog";
import CommonUtility from "../../utility/constant/CommonUtility";
import { useNavigation } from "@react-navigation/native";
import ImageConstant from "../../utility/constant/ImageConstant";
import COLORS from "../../utility/constant/Colors";
import APP_STRING from "../../utility/constant/StringConstants";
import globalStyle from "../../assets/styles/styles";
import BUTTON from "./button";

const ListEmptyComponent = (props) => {
  const { title } = props;
  return (
    <View
      style={{
        height: CommonUtility.getInstance().DH() / 2,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text
        style={[
          {
            fontSize: 16,
            marginTop: 0,
            paddingHorizontal: 20,
            color: COLORS.black,
          },
          globalStyle.muli_Light,
        ]}
      >
        {title}
      </Text>
    </View>
  );
};

export default ListEmptyComponent;
