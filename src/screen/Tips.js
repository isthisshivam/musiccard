import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  Pressable,
  Image,
  useWindowDimensions,
  FlatList,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ImageConstant from "../utility/constant/ImageConstant";
import globalStyle from "../assets/styles/styles";
import COLORS from "../utility/constant/Colors";
import Loader from "../component/Ui/loader";
import FollowerCard from "../component/Ui/FollowerCard";
import FollowingCard from "../component/Ui/FollowingCard";
import { getAllTipsRecord } from "../redux/services/getAllTipRequestService";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
const Tips = () => {
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);
  const [isRecieved, setRecieved] = useState(true);
  const [isSent, setSent] = useState(false);
  const [recieved, setRecievedArr] = useState([]);
  const [sent, setFollower] = useState([]);

  useEffect(() => {
    getAllTips();
  }, []);
  const getAllTips = async () => {
    try {
      setShowLoader(true);
      const response = await getAllTipsRecord();
      if (response) {
        setRecievedArr(response);
      }
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
    }
  };

  const Sent = () => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={sent}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          (globalStyle.white_background, globalStyle.paddingHorizontal_20)
        }
        ListEmptyComponent={<ListEmptyComponent title={"No Tip Sent."} />}
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => (
          <FollowerCard
            onClick={() => navigation.navigate("FollowingDetails")}
          />
        )}
      />
    </View>
  );

  const Received = () => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={recieved}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          (globalStyle.white_background, globalStyle.paddingHorizontal_20)
        }
        ListEmptyComponent={<ListEmptyComponent title={"No Tip Received."} />}
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => receivedTips(item)}
      />
    </View>
  );
  const receivedTips = (item) => {
    const { donor, currency } = item.item;
    return (
      <Pressable style={[globalStyle.flexRow, { marginTop: 10 }]}>
        <ImageBackground
          resizeMode="cover"
          borderRadius={32}
          style={globalStyle.song_img}
          source={{ uri: donor.profilePhotoUrl }}
        ></ImageBackground>
        <View style={globalStyle.marginLeft_13}>
          <Text
            numberOfLines={2}
            style={[globalStyle.song_name, globalStyle.muli_bold]}
          >
            {donor.firstname +
              ` ` +
              donor.lastname +
              ` has pleged to tip ` +
              currency}
          </Text>
          <Text
            numberOfLines={1}
            style={[globalStyle.singer_name, globalStyle.muli]}
          >
            {"description"}
          </Text>
        </View>
      </Pressable>
    );
  };

  const Header = () => {
    return (
      <View style={globalStyle.search_view_header}>
        <Pressable onPress={() => [navigation.goBack()]}>
          <Image
            style={globalStyle.back_image}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
        </Pressable>
        <Text style={[globalStyle.complete_profile, globalStyle.marginLeft_13]}>
          Tips
        </Text>
      </View>
    );
  };
  const Header1 = () => {
    return (
      <View style={globalStyle.home_header}>
        <View style={globalStyle.flexRow}>
          <Pressable
            onPress={() => [setRecieved(true), setSent(false), getAllTips()]}
            style={[
              globalStyle.tabView,
              {
                borderBottomColor: isRecieved ? COLORS.bottomTab : COLORS.white,
              },
            ]}
          >
            <Text
              style={[globalStyle.complete_profile, globalStyle.marginLeft_0]}
            >
              Received
            </Text>
          </Pressable>

          <Pressable
            onPress={() => [setRecieved(false), setSent(true), getAllTips()]}
            style={[
              globalStyle.tabView,
              {
                borderBottomColor: isSent
                  ? COLORS.bottomTab
                  : COLORS.transparent,
              },
            ]}
          >
            <Text
              style={[globalStyle.complete_profile, globalStyle.marginLeft_0]}
            >
              Sent
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  const TabView = (props) => {
    if (isRecieved) {
      return <Received />;
    } else {
      return <Sent />;
    }
  };

  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header />
        <Header1 />
        <TabView />
        <Loader isLoading={showLoader} />
      </View>
    </>
  );
};
export default Tips;
