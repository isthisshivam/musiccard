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
import { getFollowingService } from "../redux/services/getFollowingService";
import { getFollowersService } from "../redux/services/getFollowersService";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
const Following = () => {
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);
  const [isFollowing, setIsFollowing] = useState(true);
  const [isFollower, setIsFollower] = useState(false);
  const [following, setFollowing] = useState([]);
  const [follower, setFollower] = useState([]);

  useEffect(() => {
    getFollowingList();
  }, []);
  const getFollowingList = async () => {
    try {
      setShowLoader(true);
      const response = await getFollowingService();
      if (response) {
        setFollowing(response);
      }
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
    }
  };
  const getFollowerList = async () => {
    try {
      setShowLoader(true);
      const response = await getFollowersService();
      if (response) {
        setFollower(response);
      }
      setShowLoader(false);
    } catch (e) {
      setShowLoader(false);
    }
  };

  const Follower = () => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={follower}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          (globalStyle.white_background, globalStyle.paddingHorizontal_20)
        }
        ListEmptyComponent={<ListEmptyComponent title={"No Followers."} />}
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => (
          <FollowerCard
            item={item}
            onClick={() =>
              navigation.navigate("SingerProfile", item.item.followingUser._id)
            }
          />
        )}
      />
    </View>
  );

  const Following = () => (
    <View style={{ flex: 1, paddingHorizontal: 10 }}>
      <FlatList
        data={following}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={
          (globalStyle.white_background, globalStyle.paddingHorizontal_20)
        }
        ListEmptyComponent={
          <ListEmptyComponent title={"You haven't Following anyone yet."} />
        }
        style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
        renderItem={(item) => (
          <FollowingCard
            item={item}
            onClick={() =>
              navigation.navigate("SingerProfile", item.item.followedUser._id)
            }
          />
        )}
      />
    </View>
  );

  const Header = () => {
    return (
      <View style={globalStyle.home_header}>
        <View style={globalStyle.flexRow}>
          <Pressable
            onPress={() => [
              setIsFollowing(true),
              setIsFollower(false),
              getFollowingList(),
            ]}
            style={[
              globalStyle.tabView,
              {
                borderBottomColor: isFollowing
                  ? COLORS.bottomTab
                  : COLORS.white,
              },
            ]}
          >
            <Text
              style={[globalStyle.complete_profile, globalStyle.marginLeft_0]}
            >
              Following
            </Text>
          </Pressable>

          <Pressable
            onPress={() => [
              setIsFollowing(false),
              setIsFollower(true),
              getFollowerList(),
            ]}
            style={[
              globalStyle.tabView,
              {
                borderBottomColor: isFollower
                  ? COLORS.bottomTab
                  : COLORS.transparent,
              },
            ]}
          >
            <Text
              style={[globalStyle.complete_profile, globalStyle.marginLeft_0]}
            >
              Follower
            </Text>
          </Pressable>
        </View>

        <View style={globalStyle.align_center}>
          <Pressable onPress={() => navigation.navigate("Search")}>
            <Image
              style={globalStyle.back_button}
              resizeMode="contain"
              source={ImageConstant.HOME.SEARCH}
            />
          </Pressable>
        </View>
      </View>
    );
  };
  const TabView = (props) => {
    if (isFollowing) {
      return <Following />;
    } else {
      return <Follower />;
    }
  };
  return (
    <>
      <View style={globalStyle.view_flex_one}>
        <Header />
        <TabView />
        <Loader isLoading={showLoader} />
      </View>
    </>
  );
};
export default Following;
