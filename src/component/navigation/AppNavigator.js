import React, { useState, useEffect } from "react";
import { ImageBackground, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "../../screen/Login";
import Splash from "../../screen/Splash";
import ResetPassword from "../../screen/ResetPassword";
import Register from "../../screen/Register";
import ForgotPassword from "../../screen/ForgorPassword";
import Home from "../../screen/Home";
import Search from "../../screen/Search";
import EditorPick from "../../screen/EditorPick";
import MyProfile from "../../screen/MyProfile";
import UploadVideo from "../../screen/UploadVideo";
import UploadVideoViaUrl from "../../screen/UploadVideoViaUrl";
import WebViewComponent from "../../screen/WebViewComponent";
import UploadVideoPreview from "../../screen/UploadVideoPreview";
import UploadVideoThroughFile from "../../screen/UploadVideoThroughFile";
import MyUploads from "../../screen/MyUploads";
import Player from "../../screen/Player";
import EditProfile from "../../screen/EditProfile";
import Playlist from "../../screen/Playlist";
import Favorites from "../../screen/Favorites";
import PlaylistList from "../../screen/PlaylistList";
import Following from "../../screen/Following";
import FollowingDetails from "../../screen/FollowingDetails";
import VideoOfTheDay from "../../screen/VideoOfTheDay";
import Requests from "../../screen/Requests";
import Tips from "../../screen/Tips";
import TopRatedSongs from "../../screen/TopRatedSongs";
import TrendingArtist from "../../screen/TrendingArtists";
import UserPickSong from "../../screen/UsersPickSong";
import SingerProfile from "../../screen/SingerProfile";
import COLORS from "../../utility/constant/Colors";
import ImageConstant from "../../utility/constant/ImageConstant";
import Notification from "../../screen/Notification";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const TabStack = createNativeStackNavigator();

const tabBarOptions = {
  activeTintColor: COLORS.bottomTab,
  labelStyle: { fontSize: 0 },
  style: {
    backgroundColor: COLORS.primary1,
    borderColor: "white",
  },
  tabStyle: {
    padding: 7,
  },
  keyboardHidesTabBar: true,
  adaptive: false,
};
function Root() {
  return (
    <Stack.Navigator initialRouteName={Splash}>
      {/* <Stack.Screen name="WebViewComponent" component={WebViewComponent} /> */}
      <Stack.Screen
        options={{ headerShown: false, orientation: "all" }}
        name="Player"
        component={Player}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Splash"
        component={Splash}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name={"Home"}
        component={Home}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="UploadVideo"
        component={UploadVideo}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditorPick"
        component={EditorPick}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ResetPassword"
        component={ResetPassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Search"
        component={Search}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Notification"
        component={Notification}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyProfile"
        component={MyProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="EditProfile"
        component={EditProfile}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UploadVideoViaUrl"
        component={UploadVideoViaUrl}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UploadVideoPreview"
        component={UploadVideoPreview}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="MyUploads"
        component={MyUploads}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="UploadVideoThroughFile"
        component={UploadVideoThroughFile}
      />
      {/* <Stack.Screen
        options={{ headerShown: false, orientation: "all" }}
        name="Player"
        component={Player}
      /> */}
      <Stack.Screen
        options={{ headerShown: false }}
        name="Favorites"
        component={Favorites}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="PlaylistList"
        component={PlaylistList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="SingerProfile"
        component={SingerProfile}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="FollowingDetails"
        component={FollowingDetails}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Tips"
        component={Tips}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Requests"
        component={Requests}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="VideoOfTheDay"
        component={VideoOfTheDay}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="TopRatedSongs"
        component={TopRatedSongs}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="TrendingArtist"
        component={TrendingArtist}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="UserPickSong"
        component={UserPickSong}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Tabs}
      />
    </Stack.Navigator>
  );
}

const Tabs = () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={tabBarOptions}>
      <Tab.Screen
        name={"Home"}
        component={TabStackRoot}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={ImageConstant.APP.HOME}
                style={{
                  height: focused ? 24 : 24,
                  width: focused ? 24 : 24,
                  tintColor: COLORS.bottomTab,
                  marginTop: "2%",
                  resizeMode: "contain",
                }}
              />
              <View
                style={{
                  backgroundColor: focused ? "black" : "white",
                  marginTop: "8%",
                  height: 3,
                  borderRadius: 1,
                  width: 36,
                }}
              ></View>
            </View>
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Playlist"
        component={Playlist}
        options={{
          tabBarLabel: "Playlist",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={ImageConstant.APP.PLAYLIST}
                style={{
                  height: focused ? 24 : 24,
                  width: focused ? 24 : 24,
                  tintColor: COLORS.bottomTab,
                  marginTop: "2%",
                  resizeMode: "contain",
                }}
              />
              <View
                style={{
                  backgroundColor: focused ? "black" : "white",
                  marginTop: "8%",
                  height: 3,
                  width: 36,
                }}
              ></View>
            </View>
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="UploadVideo"
        component={UploadVideo}
        options={{
          tabBarLabel: "UploadVideo",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={ImageConstant.APP.UPLOAD_ICON}
                style={{
                  height: 48,
                  width: 48,
                  //tintColor: COLORS.bottomTab,
                  marginTop: -18,
                  resizeMode: "contain",
                  shadowColor: "gray",
                  shadowOffset: {
                    width: 0,
                    height: 4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,

                  elevation: 8,
                }}
              />
              <View
                style={{
                  backgroundColor: focused ? "black" : "white",
                  //marginTop: "8%",
                  height: 3,
                }}
              ></View>
            </View>
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="Following"
        component={Following}
        options={{
          tabBarLabel: "Following",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={ImageConstant.APP.FOLLOWING}
                style={{
                  height: focused ? 24 : 24,
                  width: focused ? 24 : 24,
                  tintColor: COLORS.bottomTab,
                  marginTop: "2%",
                  resizeMode: "contain",
                }}
              />
              <View
                style={{
                  backgroundColor: focused ? "black" : "white",
                  marginTop: "8%",
                  height: 3,
                  width: 36,
                }}
              ></View>
            </View>
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarLabel: "MyProfile",
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                flex: 1,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={ImageConstant.APP.PROFILE}
                style={{
                  height: focused ? 24 : 24,
                  width: focused ? 24 : 24,
                  tintColor: COLORS.bottomTab,
                  marginTop: "2%",
                  resizeMode: "contain",
                }}
              />
              <View
                style={{
                  backgroundColor: focused ? "black" : "white",
                  marginTop: "8%",
                  height: 3,
                  width: 36,
                }}
              ></View>
            </View>
          ),
          headerShown: false,
          tabBarShowLabel: false,
        }}
      />
    </Tab.Navigator>
  );
};
function TabStackRoot() {
  return (
    <TabStack.Navigator initialRouteName="Home">
      <TabStack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
    </TabStack.Navigator>
  );
}
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};

export default AppNavigator;
