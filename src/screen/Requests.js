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
import { getSongsRequests } from "../redux/services/getAllSongsRequestService";
import { getAllSentSongsRequests } from "../redux/services/getAllSongSentRequestService";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
const Requests = () => {
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);
  const [isRecieved, setRecieved] = useState(true);
  const [isSent, setSent] = useState(false);
  const [recieved, setRecievedArr] = useState([]);
  const [sent, setSentArr] = useState([]);

  useEffect(() => {
    getRecivedRequests();
  }, []);
  const getRecivedRequests = async () => {
    try {
      setShowLoader(true);
      const response = await getSongsRequests();
      if (response) {
        setRecievedArr(response);
      }
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
    }
  };
  const getSentRequests = async () => {
    try {
      setShowLoader(true);
      const response = await getAllSentSongsRequests();
      if (response) {
        setSentArr(response);
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
        ListEmptyComponent={<ListEmptyComponent title={"No Requets."} />}
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => renderSentRequest(item)}
      />
    </View>
  );

  const renderSentRequest = (item) => {
    const { description, singer } = item.item;
    return (
      <Pressable style={[globalStyle.flexRow, { marginTop: 10 }]}>
        <ImageBackground
          resizeMode="cover"
          borderRadius={32}
          style={globalStyle.song_img}
          source={
            singer ? { uri: singer.profilePhotoUrl } : ImageConstant.APP.USER
          }
        ></ImageBackground>
        <View style={globalStyle.marginLeft_13}>
          <Text
            numberOfLines={2}
            style={[globalStyle.song_name, globalStyle.muli_bold]}
          >
            Requested to {singer.firstname + " " + singer.lastname}
          </Text>
          <Text
            numberOfLines={1}
            style={[globalStyle.singer_name, globalStyle.muli]}
          >
            {description}
          </Text>
        </View>
      </Pressable>
    );
  };
  const Received = () => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={recieved}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          (globalStyle.white_background, globalStyle.paddingHorizontal_20)
        }
        ListEmptyComponent={<ListEmptyComponent title={"No Requets."} />}
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => renderReceivecTips(item)}
      />
    </View>
  );
  const renderReceivecTips = (item) => {
    const { description, requester } = item.item;
    return (
      <Pressable style={[globalStyle.flexRow, { marginTop: 10 }]}>
        <ImageBackground
          resizeMode="cover"
          borderRadius={32}
          style={globalStyle.song_img}
          source={
            requester
              ? { uri: requester.profilePhotoUrl }
              : ImageConstant.APP.USER
          }
        ></ImageBackground>
        <View style={globalStyle.marginLeft_13}>
          <Text
            numberOfLines={2}
            style={[globalStyle.song_name, globalStyle.muli_bold]}
          >
            {requester.firstname + ` ` + requester.lastname}
          </Text>
          <Text
            numberOfLines={1}
            style={[globalStyle.singer_name, globalStyle.muli]}
          >
            {description}
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
          Requests
        </Text>
      </View>
    );
  };
  const Header1 = () => {
    return (
      <View style={globalStyle.home_header}>
        <View style={globalStyle.flexRow}>
          <Pressable
            onPress={() => [
              setRecieved(true),
              setSent(false),
              getRecivedRequests(),
            ]}
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
            onPress={() => [
              setRecieved(false),
              setSent(true),
              getSentRequests(),
            ]}
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
export default Requests;
