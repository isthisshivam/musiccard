import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageConstant from "../utility/constant/ImageConstant";
import globalStyle from "../assets/styles/styles";
import COLORS from "../utility/constant/Colors";
import Loader from "../component/Ui/loader";
import FollowerCard from "../component/Ui/FollowerCard";
import FollowingCard from "../component/Ui/FollowingCard";

import { getNotificationList } from "../redux/services/getAllNotificationService";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
const Notification = () => {
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    getNotificationCall();
  }, []);
  const getNotificationCall = async () => {
    try {
      setShowLoader(true);
      const response = await getNotificationList();
      // alert(JSON.stringify(response));
      if (response) {
        setNotification(response);
      }
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
    }
  };

  const renderItem = (item) => {
    const { description } = item.item;
    return (
      <Pressable style={[globalStyle.follower_container]}>
        <View>
          {/* <Text
            style={[
              globalStyle.playlist_item_name,
              globalStyle.muli_semiBold,
              globalStyle.marginLeft_13,
            ]}
          >
            {"Ammy Virk"}
          </Text> */}
          <Text
            style={[
              globalStyle.playlist_item_name,
              globalStyle.muli_Light,
              globalStyle.marginLeft_13,
            ]}
          >
            {"Description: " + description}
          </Text>
        </View>
      </Pressable>
    );
  };
  const NotificationList = () => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={notification}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          (globalStyle.white_background, globalStyle.paddingHorizontal_20)
        }
        ListEmptyComponent={
          <ListEmptyComponent title={"No Notification yet."} />
        }
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => renderItem(item)}
      />
    </View>
  );
  const Header = (props) => {
    const { onBackClick } = props;
    return (
      <View style={globalStyle.editor_pick_headerView}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={globalStyle.alignItems_center}
        >
          <Image
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
          <Text style={globalStyle.editor_pick_heading}>Notification</Text>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header />
        {NotificationList()}
        <Loader isLoading={showLoader} />
      </View>
    </>
  );
};
export default Notification;
