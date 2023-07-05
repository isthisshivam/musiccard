import React from "react";
import {
  Dimensions,
  PixelRatio,
  AsyncStorage,
  Platform,
  StatusBar,
  View,
  Modal,
  Text,
  Button,
  TouchableOpacity,
} from "react-native";
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from "react-native-indicators";

const Loader = (props) => {
  const { isLoading } = props;
  return (
    <Modal animated={true} transparent={true} visible={isLoading}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        />
        <View style={{ backgroundColor: "transparent", position: "absolute" }}>
          <SkypeIndicator size={20} color="orange" />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
