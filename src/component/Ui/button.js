import React from "react";
import { Text, Pressable, TouchableOpacity } from "react-native";
import globalStyle from "../../assets/styles/styles";

const BUTTON = (props) => {
  const {
    action,
    buttonType,
    label,
    labelStyleForm,
    buttonFormStyle,
    disabled,
  } = props;

  return (
    <TouchableOpacity
      onPress={() => action()}
      style={
        buttonType == "LARGE"
          ? [globalStyle.button2, buttonFormStyle]
          : [globalStyle.button1, buttonFormStyle]
      }
      disabled={disabled}
    >
      <Text
        style={[globalStyle.heading3, labelStyleForm, globalStyle.muli_bold]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};
export default BUTTON;
