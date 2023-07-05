import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import ImagePicker from "react-native-image-crop-picker";
import COLORS from "../../utility/constant/Colors";
import globalStyles from "../../assets/styles/styles";

const BottomSheet = (props) => {
  const { reference, openCamera, openFiles } = props;
  return (
    <RBSheet
      ref={reference}
      height={200}
      closeOnPressMask={true}
      closeOnDragDown={true}
      customStyles={{
        container: globalStyles.BottomSheet_container,

        draggableIcon: {
          backgroundColor: COLORS.dark_text,
        },
      }}
    >
      <View style={globalStyles.parent_contaier_bottomsheet}>
        <TouchableOpacity
          style={globalStyles.bottomSheet_btn}
          onPress={() => openCamera()}
        >
          <Text style={[globalStyles.btn_heading, globalStyles.muli_semiBold]}>
            {`Open Camera`}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => openFiles()}
          style={globalStyles.bottomSheet_btn_margin}
        >
          <Text style={[globalStyles.text_view, globalStyles.muli_semiBold]}>
            Choose From Gallery
          </Text>
        </TouchableOpacity>
      </View>
    </RBSheet>
  );
};

export default BottomSheet;
