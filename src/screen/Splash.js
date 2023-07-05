import React, { useEffect, useState } from "react";
import { ImageBackground, View, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageConstant from "../utility/constant/ImageConstant";
import globalStyle from "../assets/styles/styles";
import CommonUtility from "../utility/constant/CommonUtility";
import APP_STRING from "../utility/constant/StringConstants";
var ONE = 1;
const Splash = () => {
  const navigation = useNavigation();
  const [rotateAnimation, setRotateAnimation] = useState(new Animated.Value(0));
  const [scaleAnimation, setScaleAnimation] = useState(new Animated.Value(0));
  useEffect(() => {
    getUserDetails();
  }, []);

  const handleAnimation = () => {
    Animated.timing(scaleAnimation, {
      toValue: ONE,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      scaleAnimation.setValue(0);
    });
  };
  const animatedStyle = {
    transform: [
      {
        scale: scaleAnimation,
      },
    ],
  };
  const getUserDetails = async () => {
    handleAnimation();
    await CommonUtility.getInstance()
      .getStoreData(APP_STRING.USER_TOKEN)
      .then((value) => {
        if (value) {
          scaleAnimation.addListener(({ value }) => {
            if (value === ONE) {
              navigation.reset({
                routes: [{ name: "Home" }],
              });
            }
          });
        } else {
          scaleAnimation.addListener(({ value }) => {
            if (value === ONE) {
              navigation.reset({
                routes: [{ name: "Login" }],
              });
            }
          });
        }
      });
  };

  return (
    <>
      <View style={globalStyle.main_wrapper}>
        {/* <ImageBackground
          resizeMode="contain"
          style={globalStyle.splash_image_view}
          source={ImageConstant.SPLASH.APP_LOGO_GRAY}
        /> */}
        <Animated.Image
          style={animatedStyle}
          source={ImageConstant.SPLASH.APP_LOGO_GRAY}
        />
      </View>
    </>
  );
};
export default Splash;
