import React, { useState, useEffect } from "react";
import {
  Text,
  Image,
  Pressable,
  TextInput,
  ImageBackground,
  View,
} from "react-native";
import Dialog, {
  DialogContent,
  FadeAnimation,
} from "react-native-popup-dialog";
import { useNavigation } from "@react-navigation/native";
import ImageConstant from "../../utility/constant/ImageConstant";
import COLORS from "../../utility/constant/Colors";
import APP_STRING from "../../utility/constant/StringConstants";
import globalStyle from "../../assets/styles/styles";
import BUTTON from "./button";

const DialogBView = (props) => {
  const { willInflate, onTouchOutside, children } = props;
  return (
    <Dialog
      visible={willInflate}
      dialogAnimation={
        new FadeAnimation({
          initialValue: 0,
          animationDuration: 150,
          useNativeDriver: true,
        })
      }
      onTouchOutside={() => {
        onTouchOutside();
      }}
    >
      <DialogContent style={globalStyle.dialog_Container_Big}>
        <View style={globalStyle.dialog_wrapper_view}>{children}</View>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBView;
