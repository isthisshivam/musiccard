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
  Modal,
  FlatList,
  TextInput,
} from "react-native";
import moment from "moment";
import CommonUtility from "../utility/constant/CommonUtility";
import { useNavigation } from "@react-navigation/native";
import COLORS from "../utility/constant/Colors";
import ImageConstant from "../utility/constant/ImageConstant";
import DummyData from "../DummyData/DummyData";
import { RadioButton, Switch } from "react-native-paper";
import globalStyle from "../assets/styles/styles";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
import CalendarPicker from "react-native-calendar-picker";
import { getVideoOfTheDay } from "../redux/services/getVideoOfTheDayService";
import { getVideoOfTheMonth } from "../redux/services/getVideoOfTheMonth";
import { getVideoOfTheWeek } from "../redux/services/getVideoOFTheWeek";
import Loader from "../component/Ui/loader";
const VideoOfTheDay = () => {
  const navigation = useNavigation();
  const [showLoader, setShowLoader] = useState(false);
  const [isClassical, setClassical] = useState(true);
  const [isBollyWood, setBollywood] = useState(false);
  const [isInstrumental, setInstrumental] = useState(false);
  const [type, setType] = useState("Day");
  const [allVideoVisible, setAllVideoVisible] = useState(false);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [videoSongsArray, setSongsArray] = useState({ key: null, value: [] });
  useEffect(() => {
    getVideoOfTheDayCall(false);
  }, []);
  const getVideoOfTheDayCall = async (data) => {
    try {
      setShowLoader(true);
      let payload = data;
      const response = await getVideoOfTheDay(payload);
      console.log("response==", JSON.stringify(response));
      if (Object.keys(response).length > 0) {
        for (const [key, value] of Object.entries(response)) {
          console.log("value==", `${key}: ${JSON.stringify(value)}`);
          setTimeout(() => {
            setSongsArray({ key: key, value: value });
          }, 1000);
        }
      }

      setShowLoader(false);
    } catch (e) {
      console.log("error==", JSON.stringify(e));
      setShowLoader(false);
    }
  };
  const onToggleAllVideoVisible = async (value) => {
    setAllVideoVisible(!allVideoVisible);
    switch (value) {
      case "Day":
        setTimeout(() => {
          getVideoOfTheDayCall(value);
        }, 2000);
        break;

      case "Month":
        setTimeout(() => {
          onMonthVideoPress(value);
        }, 2000);
        break;

      case "Week":
        setTimeout(() => {
          onWeekVideoPress(value);
        }, 2000);
        break;

      default:
        getVideoOfTheDayCall(value);
    }
  };

  const onSetType = async (type) => {
    await setType(type);
  };
  const onMonthVideoPress = async (data) => {
    try {
      setShowLoader(true);
      let payload = data;
      const response = await getVideoOfTheMonth(payload);
      console.log("response==", JSON.stringify(response));
      for (const [key, value] of Object.entries(response)) {
        console.log("value==", `${key}: ${JSON.stringify(value)}`);
        setSongsArray({ key: key, value: value });
      }
      setShowLoader(false);
    } catch (e) {
      console.log("error==", JSON.stringify(e));
      setShowLoader(false);
    }
  };
  const onWeekVideoPress = async (data) => {
    try {
      setShowLoader(true);
      let payload = data;
      const response = await getVideoOfTheWeek(payload);
      console.log("response==", JSON.stringify(response));
      for (const [key, value] of Object.entries(response)) {
        console.log("value==", `${key}: ${JSON.stringify(value)}`);
        setSongsArray({ key: key, value: value });
      }
      setShowLoader(false);
    } catch (e) {
      console.log("error==", JSON.stringify(e));
      setShowLoader(false);
    }
  };
  const Header = () => {
    return (
      <View style={[globalStyle.editor_pick_headerView]}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={globalStyle.alignItems_center}
        >
          <Image
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
          <Text style={globalStyle.editor_pick_heading}>Video of the day</Text>
        </Pressable>

        <Pressable
          onPress={onCalendarClick}
          style={globalStyle.alignItems_center}
        >
          <Image
            style={globalStyle.back_button}
            resizeMode="cover"
            source={
              showCalendar
                ? ImageConstant.LOG_IN.CLOSE
                : ImageConstant.HOME.MONTH
            }
          />
        </Pressable>
      </View>
    );
  };
  const HeaderNew = () => {
    return (
      <View style={[globalStyle.editor_pick_headerViewNew]}>
        <Pressable
          onPress={() => navigation.goBack()}
          style={globalStyle.alignItems_center}
        >
          <Image
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
        </Pressable>
        <View style={globalStyle.container}>
          <Pressable
            onPress={() => [
              setSongsArray({ key: null, value: [] }),
              onSetType("Day"),
              getVideoOfTheDayCall(false),
              setAllVideoVisible(false),
            ]}
            style={[
              globalStyle.video_of_the_day_btn,
              type === "Day" && globalStyle.shadow,
              {
                backgroundColor:
                  type === "Day" ? COLORS.primary3 : COLORS.transparent,
              },
            ]}
          >
            <Text
              style={[
                globalStyle.editor_pick_headingNew,
                { color: type === "Day" ? COLORS.white : COLORS.black },
              ]}
            >
              Day
            </Text>
          </Pressable>
          <Pressable
            onPress={() => [
              setSongsArray({ key: null, value: [] }),
              onSetType("Week"),
              onWeekVideoPress(false),
              setAllVideoVisible(false),
            ]}
            style={[
              globalStyle.video_of_the_day_btn,
              type === "Week" && globalStyle.shadow,
              {
                backgroundColor:
                  type === "Week" ? COLORS.primary3 : COLORS.transparent,
              },
            ]}
          >
            <Text
              style={[
                globalStyle.editor_pick_headingNew,
                { color: type === "Week" ? COLORS.white : COLORS.black },
              ]}
            >
              Week
            </Text>
          </Pressable>
          <Pressable
            onPress={() => [
              setSongsArray({ key: null, value: [] }),
              onSetType("Month"),
              onMonthVideoPress(false),
              setAllVideoVisible(false),
            ]}
            style={[
              globalStyle.video_of_the_day_btn,
              type === "Month" && globalStyle.shadow,
              {
                backgroundColor:
                  type === "Month" ? COLORS.primary3 : COLORS.transparent,
              },
            ]}
          >
            <Text
              style={[
                globalStyle.editor_pick_headingNew,
                { color: type === "Month" ? COLORS.white : COLORS.black },
              ]}
            >
              Month
            </Text>
          </Pressable>
        </View>
      </View>
    );
  };
  const allVideoVisibleOrnotController = () => {
    return (
      <View
        style={{
          height: 50,
          backgroundColor: COLORS.border_Color,
          marginHorizontal: 20,
          marginTop: 10,
          borderRadius: 5,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingHorizontal: 15,
        }}
      >
        <Switch
          color={COLORS.primary3}
          value={allVideoVisible}
          onValueChange={(value) => onToggleAllVideoVisible(value)}
        />
        <Text
          style={{
            color: COLORS.black,
            marginLeft: 20,
            fontSize: 14,
          }}
        >
          All Videos Visible
        </Text>
      </View>
    );
  };
  const highLightVideo = (key, value) => {
    console.log("highLightVideo==", key, "value==", value);
    let itemValue = value && value[0];
    // const { title, about, songUrl, averageRating, coverPhotoUrl, genre, _id } =
    //   itemValue;
    return (
      <View
        style={{
          height: 220,
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <ImageBackground
          source={ImageConstant.HOME.VIDEO_OF_DAY}
          borderRadius={7}
          style={{
            height: 100,
            borderRadius: 20,
            paddingHorizontal: 15,
            paddingVertical: 0,
            marginTop: 20,
            width: CommonUtility.getInstance().DW() - 18,
          }}
          imageStyle={globalStyle.image_resize_cover}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <ImageBackground
                style={{
                  height: 150,
                  width: 150,
                  shadowColor: "white",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 5,
                  marginTop: CommonUtility.getInstance().DW() / -20,
                }}
                resizeMode="cover"
                imageStyle={{ borderRadius: 4 }}
                source={
                  itemValue?.coverPhotoUrl
                    ? { uri: itemValue?.coverPhotoUrl }
                    : ImageConstant.HOME.VIDEO
                }
              >
                {itemValue?.averageRating && (
                  <View style={globalStyle.star_rating_container}>
                    <Image
                      style={globalStyle.star_img}
                      source={ImageConstant.HOME.STAR}
                    />
                    {itemValue?.averageRating && (
                      <Text style={globalStyle.rating_text}>
                        {itemValue?.averageRating}
                      </Text>
                    )}
                  </View>
                )}
              </ImageBackground>
              <Text
                numberOfLines={2}
                style={{ marginTop: 6, fontWeight: "400", width: 150 }}
              >
                {itemValue?.title && itemValue?.title}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  marginTop: 2,
                  fontWeight: "400",
                  width: 150,
                  color: "gray",
                }}
              >
                {itemValue?.about && itemValue?.about}
              </Text>
            </View>

            <View style={{ marginTop: CommonUtility.getInstance().DW() / -5 }}>
              <Text style={globalStyle.VideoOfDay_textNew}>
                {`Highlight of
    the Day`}
              </Text>
              <Text
                style={[
                  globalStyle.VideoOfDay_textNew_desc,
                  { fontFamily: "Muli" },
                ]}
              >
                {itemValue?.key && itemValue?.key}
              </Text>
              <Text
                style={[
                  globalStyle.VideoOfDay_textNew_desc,
                  { fontFamily: "Muli" },
                ]}
              >
                {itemValue?.genre && itemValue?.genre}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
    );
  };
  const onCalendarClick = () => {
    setShowCalendar(!showCalendar);
  };

  const renderItem = (item) => {
    var rating = "4.7";
    const { title, about, songUrl, averageRating, coverPhotoUrl, genre, _id } =
      item.item;
    return (
      <Pressable
        onPress={() =>
          navigation.navigate("Player", { title, songUrl, coverPhotoUrl, _id })
        }
        style={{
          width: "47%",
          margin: 6,
          paddingVertical: 5,
          paddingHorizontal: 3,
          backgroundColor: "transparent",
          borderRadius: 4,
        }}
      >
        <ImageBackground
          style={{
            height: 160,
            width: "100%",
            shadowColor: "white",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          resizeMode="cover"
          imageStyle={{ borderRadius: 4 }}
          source={
            coverPhotoUrl ? { uri: coverPhotoUrl } : ImageConstant.HOME.VIDEO
          }
        >
          {/* <View
            style={{
              backgroundColor: "black",
              width: 62,
              paddingHorizontal: 10,
              paddingVertical: 4,
              flexDirection: "row",
              marginTop: 125,
              borderRadius: 10,
              marginLeft: 6,
              alignItems: "center",
            }}
          >
            <Image
              style={{ height: 15, width: 15 }}
              source={ImageConstant.HOME.STAR}
            />
            <Text style={{ color: "white", marginLeft: 5, fontSize: 15 }}>
              {rating}
            </Text>
          </View> */}
          {averageRating && averageRating != 0 ? (
            <View style={globalStyle.star_rating_container}>
              <Image
                style={globalStyle.star_img}
                source={ImageConstant.HOME.STAR}
              />
              <Text style={globalStyle.rating_text}>{averageRating}</Text>
            </View>
          ) : (
            <></>
          )}
        </ImageBackground>
        <Text numberOfLines={2} style={{ marginTop: 6, fontWeight: "400" }}>
          {title}
        </Text>
        <Text
          numberOfLines={1}
          style={{
            marginTop: 8,
            fontWeight: "400",
            color: "gray",
          }}
        >
          {about}
        </Text>
      </Pressable>
    );
  };
  const date = (date) => {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 15,
          marginTop: 20,
          alignItems: "center",
        }}
      >
        <Text
          style={[globalStyle.VideoOfDay_textNew_desc, { fontFamily: "Muli" }]}
        >
          {date}
        </Text>
        <View
          style={{
            height: 0.1,
            backgroundColor: "gray",
            width: CommonUtility.getInstance().DW() / 1.4,
            marginLeft: 10,
          }}
        ></View>
      </View>
    );
  };
  const VideoOfTheDayList = () => {
    return (
      <>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          {videoSongsArray.value.length > 0 && (
            <>
              {date(videoSongsArray && videoSongsArray.key)}
              {highLightVideo(videoSongsArray?.key, videoSongsArray?.value)}
            </>
          )}
          <FlatList
            data={videoSongsArray?.value}
            numColumns={2}
            extraData={videoSongsArray}
            keyExtractor={(item) => item.title.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => renderItem(item)}
            ListEmptyComponent={<ListEmptyComponent title={"No Songs Yet"} />}
          />
        </View>
      </>
    );
  };
  // const TabView = (props) => {
  //   if (isClassical) {
  //     return <Following />;
  //   } else if (isBollyWood) {
  //     return <Follower />;
  //   } else {
  //     return <Uploads />;
  //   }
  // };

  onDateChange = (date, type) => {
    if (type === "END_DATE") {
      setEndDate(moment(date).format("YYYY/M/D"));
      console.log("onDateChange if", moment(date).format("YYYY/M/D"));
      setTimeout(() => {
        setShowCalendar(false);
      }, 1000);
    } else {
      setStartDate(moment(date).format("YYYY/M/D"));
      console.log("onDateChange else", moment(date).format("YYYY/M/D"));
    }
  };
  // return (
  //   <>
  //     <View style={globalStyle.view_flex_one}>
  //       {Header()}
  //       {/* <TabHeader /> */}
  //       <ScrollView
  //         showsVerticalScrollIndicator={false}
  //         enableOnAndroid={true}
  //         extraScrollHeight={120}
  //         style={[globalStyle.white_background]}
  //       >
  //         {/* <TabView /> */}
  //         {VideoOfTheDayList()}
  //         {showCalendar && (
  //           <CalendarPicker
  //             //startFromMonday={true}
  //             allowRangeSelection={true}
  //             //minDate={minDate}
  //             //maxDate={maxDate}
  //             // todayBackgroundColor="#f2e6ff"
  //             // selectedDayColor="#7300e6"
  //             //selectedDayTextColor="#FFFFFF"
  //             onDateChange={onDateChange}
  //           />
  //           // <Modal animated={true} visible={showCalendar}>
  //           //   <View
  //           //     style={{
  //           //       flex: 1,
  //           //       height: 300,
  //           //       justifyContent: "center",
  //           //       alignItems: "center",
  //           //     }}
  //           //   >
  //           //     <View
  //           //       style={{
  //           //         height: "100%",
  //           //         width: "100%",
  //           //         backgroundColor: "rgba(0, 0, 0, 0.5)",
  //           //       }}
  //           //     />
  //           //     <View
  //           //       style={{
  //           //         backgroundColor: "transparent",
  //           //         position: "absolute",
  //           //       }}
  //           //     >
  //           //       <CalendarPicker
  //           //         //startFromMonday={true}
  //           //         allowRangeSelection={true}
  //           //         //minDate={minDate}
  //           //         //maxDate={maxDate}
  //           //         // todayBackgroundColor="#f2e6ff"
  //           //         // selectedDayColor="#7300e6"
  //           //         //selectedDayTextColor="#FFFFFF"
  //           //         onDateChange={onDateChange}
  //           //       />
  //           //     </View>
  //           //   </View>
  //           // </Modal>
  //         )}
  //       </ScrollView>
  //     </View>
  //   </>
  // );

  return (
    <View style={globalStyle.view_flex_one}>
      {HeaderNew()}

      {/* <TabHeader /> */}
      {showLoader ? (
        <Loader isLoading={showLoader}></Loader>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          enableOnAndroid={true}
          extraScrollHeight={120}
          style={[globalStyle.white_background]}
        >
          {/* <TabView /> */}
          {videoSongsArray.value.length > 0 && allVideoVisibleOrnotController()}

          {/* {highLightVideo()} */}
          {VideoOfTheDayList()}
        </ScrollView>
      )}
    </View>
  );
};
export default VideoOfTheDay;
