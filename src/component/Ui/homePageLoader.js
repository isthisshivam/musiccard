import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  Pressable,
  ImageBackground,
  useColorScheme,
  Dimensions,
  View,
  FlatList,
} from "react-native";
import Skeletons from "./skelton";
import CommonUtility from "../../utility/constant/CommonUtility";

const HomeLoaderState = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={(globalStyle.view_flex_one, globalStyle.white_background)}
      contentContainerStyle={globalStyle.margin_horizontal_content}
    >
      <Skeletons type="vtd" />
      <Headings
        MT={1}
        BH="Editors Pick"
        SH="SEE MORE"
        onClickSH={() => navigation.navigate("EditorPick")}
      />
      <ScrollView horizontal>
        <Skeletons type="squares" />
        <Skeletons type="squares" />
        <Skeletons type="squares" />
      </ScrollView>
      <Headings
        MT={12}
        BH="Top Rated"
        SH="SEE MORE"
        onClickSH={() => alert("InProgress")}
      />
      <ScrollView horizontal>
        <Skeletons type="squares" />
        <Skeletons type="squares" />
        <Skeletons type="squares" />
      </ScrollView>
    </ScrollView>
  );
};
export default HomeLoaderState;
