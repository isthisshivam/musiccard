import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Share,
  BackHandler,
  Platform,
  Dimensions,
} from "react-native";
import DummyData from "../DummyData/DummyData";
import { Rating, AirbnbRating } from "react-native-ratings";
import Video from "react-native-video";
import YoutubePlayer from "react-native-youtube-iframe";
import { RadioButton, Switch } from "react-native-paper";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch, connect } from "react-redux";
import Separator from "../component/Ui/Seperator";
import globalStyle from "../assets/styles/styles";
import { addSongToPlaylistPost } from "../redux/services/addSongToPlaylistService";
import { songDetailGet } from "../redux/services/songDetailService";
import {
  addSongToFavourite,
  removeSongFromFavorite,
} from "../redux/services/addSongToFavouriteService";
import { ratingASongPatch } from "../redux/services/ratingSongService";
import DialogBView from "../component/Ui/dialogBig";
import DialogView from "../component/Ui/dialog";
import COLORS from "../utility/constant/Colors";
import { getUserPlaylist } from "../redux/services/getUserPlaylistService";
import { getSongsCorrespondingToCurrentPlayingSong } from "../redux/services/getSongsCorrespondingToCurrentPlayingSongService";
import APP_STRING from "../utility/constant/StringConstants";
import ImageConstant from "../utility/constant/ImageConstant";
import CommonUtility from "../utility/constant/CommonUtility";
import BUTTON from "../component/Ui/button";
import { createPlaylist } from "../redux/services/createPlaylist";
import { addLikeToSong } from "../redux/services/addLikeToSongs";
import { addClapsToSong } from "../redux/services/addClapsToSongService";
import ListEmptyComponent from "../component/Ui/listEmptyComponent";
import { SongRequestPost } from "../redux/services/SongRequestService";
import { addVoteToSong } from "../redux/services/addVoteService";
import { reportPostService } from "../redux/services/reportService";
import RazorpayCheckout from "react-native-razorpay";
//Media Controls to control Play/Pause/Seek and full screen
import Secrets from "../utility/constant/Secrets";
import { SaveTipDetails } from "../redux/services/saveTipDetailsService";
import MediaControls, { PLAYER_STATES } from "react-native-media-controls";
import VideoPlayer from "react-native-video-controls";
import RazorPay from "../component/Ui/RazorPay";
var playlistName = "";
var songUrlToShare = null;
var songSingerDescription = "";
var reportDesc = "";
var reportReason = "";
var selectedPrice = 10;
var userData = null;
const Header = ({ songTitle, onTouchOutside }) => {
  const navigation = useNavigation();

  return (
    <View style={[globalStyle.video_header]}>
      <View
        style={[
          globalStyle.flexRow,
          //globalStyle.center,
          globalStyle.globalStyle_flex_7,
          { height: "100%", alignItems: "center" },
        ]}
      >
        <Pressable onPress={() => navigation.goBack()}>
          <Image
            style={globalStyle.back_button}
            resizeMode="contain"
            source={ImageConstant.EDITOR_PICK.BACK}
          />
        </Pressable>
        <Text
          numberOfLines={1}
          style={[globalStyle.song_title, globalStyle.marginRight_13]}
        >
          {songTitle}
        </Text>
      </View>
      <Pressable
        style={globalStyle.globalStyle_flex_3}
        onPress={() => onTouchOutside()}
      >
        <Image
          style={globalStyle.back_button}
          resizeMode="contain"
          source={ImageConstant.APP.ADD_PLAYLIST}
        />
      </Pressable>
    </View>
  );
};

class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      willInflate: false,
      requestSong: false,
      tipSong: false,
      selectedPriceIndex: 0,
      showLoader: false,
      selectedSongId: "",
      songName: "",
      songReleaseDate: "",
      songGenre: "",
      PlaylistList: [],
      willInflateReportModal: false,
      willInflateCreateModal: false,
      isFavourite: false,
      isLiked: false,
      isClapped: false,
      nextSongsToPlay: [],
      userId: "",
      singerId: "",
      singerName: "",
      singerProfile: "",
      songUri: null,
      coverPhotoUrl: null,
      isVoted: false,
      voteCount: 0,
      likes: 0,
      radioButtons: [
        { id: 1, txt: "Offensive content", isChecked: false, index: 0 },
        { id: 1, txt: "Others, please specify:", isChecked: false, index: 0 },
      ],
      selectedGenre: "Classical",
      isRatingShown: false,
      isOutSourceVideo: false,
      rating: 0,
      songTitleHeader: "props.route.params.title",
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: false,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: "cover",
      orientation: "portrait",
    };
  }

  componentDidMount = async () => {
    // this.setState({
    //   isOutSourceVideo: this.matchYoutubeUrl(
    //     "https://dqmei4xwq2scu.cloudfront.net/61f50bcaaa97a67659547d41/6200c5bbaa97a67659549dea/1644217652188.mp4?Expires=1735689600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kcW1laTR4d3Eyc2N1LmNsb3VkZnJvbnQubmV0LzYxZjUwYmNhYWE5N2E2NzY1OTU0N2Q0MS82MjAwYzViYmFhOTdhNjc2NTk1NDlkZWEvMTY0NDIxNzY1MjE4OC5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3MzU2ODk2MDB9fX1dfQ__&Signature=MH8toJVpNeJqXxLwQYVFEyuBnk1MHR9vqkW0i1jjGgX7ZgWLFAuQPWos~AZbb1Mgw0Hs0pJhWLzQakCJhOHBK1Z2HtottPbwL9YHqCfBqV~ey1Jhp~OV8rGZWOkOztWeXYsaj941l-bwYhC~UX2LqwaueGq6ycL2USlfBg82jkNk2ZJovs0IEJfS1HtSA44sC0KqFp0aWr~tD3cWfuTTH6bsUjMkFX4ULhvm9zY2~cqQu-6ggceHYmtPBG7ksSnZjkzgGg1xnGluS~-th1o05g7ZMHXL1i47nuW7aO7OkPzPQrSjyUw76oGsaW6BuevTBJ1HSTfqlvhdxWrkFzjy0Q__&Key-Pair-Id=K2C8UWLI1I4N19"
    //   ),
    // });

    Dimensions.addEventListener("change", () => {
      this.getOrientation();
      console.log("dimensions changed==");
    });

    await this.props.navigation.addListener("focus", () => {
      // this.getSongDetails();
      //this.getUserPlaylistList();
    });

    // add event listener for back button click
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    //  this.getUserProfileInformation();
  };
  getUserProfileInformation = async () => {
    let userInfo =
      await CommonUtility.getInstance().getUserPersonalInformation();
    console.log("getUserProfileInformation", JSON.stringify(userInfo));
    userId = userInfo._id;
    userData = userInfo;
  };
  getOrientation() {
    if (Dimensions.get("window").width < Dimensions.get("window").height) {
      this.setState({ orientation: "portrait" });
    } else {
      this.setState({ orientation: "landscape" });
    }
  }
  onSeek = (seek) => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = (playerStatee) => {
    //Handler for Video Pause
    // setPaused(!paused);
    // setPlayerState(playerState);

    const {
      isFullScreen,
      screenType,
      playerState,
      duration,
      isLoading,
      currentTime,
      paused,
    } = this.state;
    this.setState({ paused: !this.state.paused, playerState: playerStatee });
  };

  onReplay = () => {
    //Handler for Replay
    this.videoPlayer.seek(0);
    const {
      isFullScreen,
      screenType,
      playerState,
      duration,
      isLoading,
      currentTime,
    } = this.state;
    this.setState({ playerState: PLAYER_STATES.PLAYING });
  };

  onProgress = (data) => {
    const {
      isFullScreen,
      screenType,
      playerState,
      duration,
      isLoading,
      currentTime,
    } = this.state;
    // Video Player will progress continue even if it ends
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };

  onLoad = (data) => {
    const { isFullScreen, screenType, playerState, duration } = this.state;
    this.setState({ duration: data.duration, isLoading: false });
  };

  onLoadStart = (data) => {
    this.setState({ isLoading: true });
  };

  onEnd = () => {
    const { isFullScreen, screenType, playerState } = this.state;
    this.setState({ playerState: PLAYER_STATES.ENDED });
  };

  onError = () => alert("Oh! ", error);

  exitFullScreen = () => {
    alert("Exit full screen");
  };

  enterFullScreen = () => {};

  onFullScreen = (full) => {
    console.log("full", full);
    const { isFullScreen, screenType } = this.state;
    this.setState({ isFullScreen: !this.state.isFullScreen });
    if (screenType == "content") this.setState({ screenType: "cover" });
    else this.setState({ screenType: "content" });
  };

  renderToolbar = () => (
    <View>
      <Text
        style={{
          marginTop: 30,
          backgroundColor: "white",
          padding: 10,
          borderRadius: 5,
        }}
      ></Text>
    </View>
  );

  onSeeking = (currentTime) => {
    this.setState({ currentTime: currentTime });
  };

  matchYoutubeUrl(url) {
    var p =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (url.match(p)) {
      this.setState({ isOutSourceVideo: true, songUri: url.match(p)[1] });
      return url.match(p)[1];
    }
    this.setState({ isOutSourceVideo: false });
    return false;
  }

  componentWillUnmount() {
    // remove event listener that was added while component mounted
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.handleBackButtonClick
    );
    // Remove the event listener
    // this.focusListener.remove();
  }

  handleBackButtonClick = () => {
    // on click of back button close all the models that were open
    this.setState({
      willInflateCreateModal: false,
      willInflate: false,
      requestSong: false,
      tipSong: false,
      willInflateReportModal: false,
    });
    // navigation.goBack();
    this.props.navigation.goBack();
    return true;
  };

  getSongDetails = async () => {
    try {
      this.setState({ showLoader: true });
      const response = await songDetailGet(this.props?.route?.params?._id);
      if (response) {
        this.setSongDetails(response);
      }
      this.setState({ showLoader: false });
    } catch (e) {
      this.setState({ showLoader: false });
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  setSongDetails(response) {
    if (response)
      this.setState({
        songName: response?.title,
        songDescription: response.about,
        songGenre: response?.genre,
        selectedSongId: response?._id,
        userId: response?.user?._id,
        songUri: response?.songUrl,
        singerId: response.user._id,
        singerName: response?.user?.firstname + ` ` + response?.user?.lastname,
        // singerName: response?.user.firstname,
        singerProfile: response?.user.profilePhotoUrl,
        coverPhotoUrl: response?.coverPhotoUrl,
        isVoted: response?.isVoted,
        voteCount: response?.voteCount,
        likes: response?.likesCount,
        rating: response?.rating,
        songTitleHeader: response?.title,
      });
    console.log("response.songUrl>>>>>>>>>>>", JSON.stringify(response));
    this.matchYoutubeUrl(response.songUrl);
    if (response.isLiked) {
      this.setState({ isLiked: response.isLiked });
    }
    if (response.isClaped) {
      this.setState({ isClapped: response.isClaped });
    }
    if (response.isFavourite) {
      this.setState({ isFavourite: response.isFavourite });
    }

    songUrlToShare = response.songUrl;
    this.getNextSongList(response.user._id);
    console.log("songdetails", JSON.stringify(response.isClaped));
  }
  getUserPlaylistList = async () => {
    try {
      const response = await getUserPlaylist();
      if (response) {
        this.setState({ PlaylistList: response.playlists });
      }
    } catch (e) {}
  };
  getNextSongList = async (payload) => {
    try {
      const songs = await getSongsCorrespondingToCurrentPlayingSong(payload);
      this.setState({ nextSongsToPlay: songs });
    } catch (e) {}
  };
  addSongToPlaylist = async (playListId) => {
    const { selectedSongId } = this.state;
    try {
      this.setState({ showLoader: true });
      let payload = {
        songId: selectedSongId,
      };

      const response = await addSongToPlaylistPost(payload, playListId);
      if (response) {
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(
            APP_STRING.SONG_HAS_ADDED_IN_PLAYLIST
          );
        }, 100);
      }
      this.setState({ showLoader: false, willInflate: false });
    } catch (e) {
      alert(JSON.stringify(e));
      this.setState({ showLoader: false, willInflate: false });
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  addSongToFavouriteCall = async () => {
    const { selectedSongId, isFavourite } = this.state;
    this.setState({ isFavourite: !this.state.isFavourite });
    try {
      let response;
      this.setState({ showLoader: true });
      if (isFavourite) {
        response = await removeSongFromFavorite(selectedSongId);
      } else {
        // if not favourite then add it
        let payload = {
          songId: selectedSongId,
        };
        response = await addSongToFavourite(payload);
      }

      this.setState({ showLoader: false, willInflate: false });
    } catch (e) {
      this.setState({ showLoader: false, willInflate: false });
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  setLikeDislike = async () => {
    this.setState({ isLiked: !this.state.isLiked }, () => {
      this.likeDislikeSongs();
    });
  };
  likeDislikeSongs = async () => {
    const { selectedSongId, isFavourite, isLiked } = this.state;
    try {
      let payload = isLiked;
      const response = await addLikeToSong(selectedSongId, payload);
      if (isLiked) {
        this.setState({ likes: parseInt(this.state.likes) + 1 });
      } else {
        this.setState({
          likes:
            parseInt(this.state.likes) != 0 && parseInt(this.state.likes) - 1,
        });
      }
    } catch (e) {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  setClaps = async () => {
    this.setState({ isClapped: !this.state.isClapped }, () => {
      this.clapUnclapSongs();
    });
  };
  clapUnclapSongs = async () => {
    const { selectedSongId, isFavourite, isClapped } = this.state;

    try {
      let payload = isClapped;
      const response = await addClapsToSong(selectedSongId, payload);
      // if (response) {
      //   setTimeout(() => {
      //     if (isClapped)
      //       CommonUtility.getInstance().inflateToast(
      //         APP_STRING.SONG_HAS_CLAPPED
      //       );

      //   }, 100);
      // }
    } catch (e) {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };

  onTouchOutside = () => {
    this.setState({ willInflate: false });
  };
  onTouchOutsideCreateModal = () => {
    this.setState({ willInflateCreateModal: false, willInflate: true });
  };
  onTouchOutsideReportModal = () => {
    this.setState({
      willInflateCreateModal: false,
      willInflate: false,
      willInflateReportModal: false,
    });
  };
  onTouchOutsideRequestModal = () => {
    this.setState({
      requestSong: false,
      willInflateCreateModal: false,
      willInflate: false,
    });
  };

  onTouchOutsideTipSong = () => {
    this.setState({
      willInflateCreateModal: false,
      willInflate: false,
      requestSong: false,
      tipSong: false,
    });
  };
  handleRatingVisiblity = () => {
    this.setState({ isRatingShown: !this.state.isRatingShown });
  };
  ratingCompleted = async (value) => {
    const { selectedSongId } = this.state;
    this.setState({ rating: value });
    try {
      let payload = { rating: value };
      const response = await ratingASongPatch(selectedSongId, payload);
      if (response) {
        setTimeout(() => {
          this.setState({ isRatingShown: false });
          CommonUtility.getInstance().inflateToast(APP_STRING.RATING_SAVED);
        }, 1000);
      }
    } catch (e) {
      this.setState({ isRatingShown: false });
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  playSongOnTapSong = async () => {
    try {
      this.setState({ showLoader: true });
      const response = await songDetailGet(this.state.selectedSongId);
      if (response) {
        this.setSongDetails(response);
      }
      setTimeout(() => {
        this.setState({ showLoader: false });
      }, 1000);
    } catch (e) {
      this.setState({ showLoader: false });
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };

  isPlayListExists = () => {
    const found = this.state.PlaylistList.some(
      (el) => el.name === playlistName
    );
    return found;
  };
  onShare = async () => {
    try {
      const result = await Share.share({
        title: "Music Card",
        message: songUrlToShare,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  onCreatePlaylistPress = async () => {
    if (playlistName == "") {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(
          APP_STRING.ENTER_PLAYLIST_NAME
        );
      }, 100);
    } else if (this.isPlayListExists()) {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(
          APP_STRING.CANT_HAVE_SAME_NAME_PLAYLIST
        );
      }, 100);
    } else {
      this.onTouchOutsideCreateModal();
      try {
        this.setState({ showLoader: true });
        let playlistPayload = {
          name: playlistName,
        };
        const response = await createPlaylist(playlistPayload);
        if (response) {
          setTimeout(() => {
            CommonUtility.getInstance().inflateToast(
              APP_STRING.PLAYLIST_CREATED_SUCCESSFULLY
            );
            this.addSongToPlaylist(response._id);
          }, 500);

          this.setState({ showLoader: false });
        }
      } catch (e) {
        this.setState({ showLoader: false });
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
        }, 100);
      }
    }
  };
  onRequestPress = async () => {
    if (!CommonUtility.getInstance().isEmpty(songSingerDescription)) {
      try {
        let playlistPayload = {
          singer: this.state.singerId,
          description: songSingerDescription,
        };

        const response = await SongRequestPost(playlistPayload);
        if (response) {
          setTimeout(() => {
            CommonUtility.getInstance().inflateToast(
              APP_STRING.REQUEST_GENERATED_SUCCESS
            );

            this.setState({ requestSong: false });
          }, 500);
        }
      } catch (e) {
        this.setState({ requestSong: false });
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
        }, 100);
      }
    } else {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.ENTER_DESC);
      }, 100);
    }
  };
  sendUserToSingerProfile = async () => {
    this.props.navigation.navigate("SingerProfile", this.state.singerId);
  };

  onVotePress = async () => {
    const { selectedSongId, isVoted } = this.state;
    try {
      let payload = selectedSongId;
      const response = await addVoteToSong(selectedSongId, payload);
      if (response) {
        this.setState({
          isVoted: true,
          voteCount: parseInt(this.state.voteCount) + 1,
        });
      }
    } catch (e) {
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };

  reportForContent = async () => {
    const { selectedSongId, showLoader } = this.state;
    try {
      let payload = {
        reason: reportReason,
        description: reportDesc,
      };

      // check for reason and description
      if (!reportReason || !reportDesc) {
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.REPORT_NON_EMPTY);
        }, 100);
        return;
      }

      this.setState({ showLoader: true });
      const response = await reportPostService(selectedSongId, payload);
      this.setState({ showLoader: false, willInflateReportModal: false });
      if (response) {
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.REPORT);
        }, 100);
      }
    } catch (e) {
      this.setState({ showLoader: false, willInflateReportModal: false });
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };
  addTipDetails = async () => {
    const { singerId } = this.state;
    try {
      let payload = {
        singer: singerId,
        amount: selectedPrice,
        currency: "Rupee",
      };
      console.log("addTipDetails.payload", JSON.stringify(payload));

      this.setState({ showLoader: true });
      const response = await SaveTipDetails(payload);
      console.log("addTipDetails", JSON.stringify(response));
      if (response) {
        this.setState({ showLoader: false });
        setTimeout(() => {
          CommonUtility.getInstance().inflateToast(APP_STRING.TIP_SAVED);
        }, 300);
      }
    } catch (e) {
      this.setState({ showLoader: false });
      setTimeout(() => {
        CommonUtility.getInstance().inflateToast(APP_STRING.OOPS);
      }, 100);
    }
  };

  payToSinger = async () => {
    this.setState({ tipSong: false });

    let config = {
      ...Secrets.RazorPayConfig,
      amount: parseInt(selectedPrice * 100),
      prefill: {
        email: userData?.email ? userData?.email : "TestMusicCard@gmail.com",
        contact: userData?.phone ? userData?.phone : "9990365899",
        name: userData ? userData?.firstname : "Razorpay Software",
      },
    };
    console.log("selectedPrice.config", JSON.stringify(config));
    await RazorPay(config, this.onPaymentSuccess, this.onPaymentFailed);
  };
  onPaymentSuccess = async (resolve) => {
    console.log(`Success: ${resolve}`);
    this.addTipDetails();
    // setTimeout(() => {
    //   CommonUtility.getInstance().inflateToast(
    //     "Thanks for your support. Payment has been Successfull."
    //   );
    // }, 300);
  };
  onPaymentFailed = async (error) => {
    console.log(`Error: ${error.code} | ${error.description}`);
    // setTimeout(() => {
    //   CommonUtility.getInstance().inflateToast(
    //     "Thanks for your support. But due to some reasons Payment has been Failed."
    //   );
    // }, 300);
  };
  ListHeaderComponent = () => {
    return (
      <>
        <Pressable
          onPress={() =>
            this.setState({ willInflate: false, willInflateCreateModal: true })
          }
          style={[
            globalStyle.playlist_container,
            globalStyle.justifyContent_spaceBetween,
          ]}
        >
          <View style={[globalStyle.flexRow, globalStyle.alignItems_center]}>
            <Text
              numberOfLines={2}
              style={[globalStyle.song_name, globalStyle.muli_bold]}
            >
              Create new playlist
            </Text>
          </View>
        </Pressable>

        <TouchableOpacity
          onPress={this.addSongToFavouriteCall}
          style={[
            globalStyle.playlist_container,
            globalStyle.justifyContent_spaceBetween,
          ]}
        >
          <View style={[globalStyle.flexRow, globalStyle.alignItems_center]}>
            <Text
              numberOfLines={2}
              style={[globalStyle.song_name, globalStyle.muli_bold]}
            >
              Add to favorites
            </Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };
  MyPlayList = () => {
    const { PlaylistList } = this.state;

    return (
      <FlatList
        data={PlaylistList}
        showsHorizontalScrollIndicator={false}
        ListHeaderComponent={this.ListHeaderComponent()}
        ListEmptyComponent={<ListEmptyComponent title={"No Songs yet"} />}
        style={[globalStyle.marginTop_20]}
        renderItem={(item) => this.renderPlaylist(item)}
      />
    );
  };
  renderPlaylist = ({ item }) => {
    const { _id, name } = item;
    return (
      <Pressable
        onPress={() => this.addSongToPlaylist(_id)}
        style={[
          globalStyle.playlist_container,
          globalStyle.justifyContent_spaceBetween,
        ]}
      >
        <View style={[globalStyle.flexRow, globalStyle.alignItems_center]}>
          <Text
            numberOfLines={2}
            style={[globalStyle.song_name, globalStyle.muli_bold]}
          >
            {name}
          </Text>
        </View>
      </Pressable>
    );
  };
  TipList = () => {
    return (
      <FlatList
        numColumns={3}
        data={DummyData.Tips}
        renderItem={(item) => this.renderTipListItem(item)}
      ></FlatList>
    );
  };
  renderTipListItem = ({ index, item }) => {
    return (
      <Pressable
        onPress={() => [
          (selectedPrice = item),
          this.setState({ selectedPriceIndex: index }),
        ]}
        style={{
          backgroundColor:
            this.state.selectedPriceIndex == index
              ? COLORS.gray
              : COLORS.border_Color,
          padding: 10,
          width: 70,
          borderRadius: 10,
          margin: 5,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={[globalStyle.songReqNew, globalStyle.font_14]}>
          {`\u20A8 ` + item}
        </Text>
      </Pressable>
    );
  };
  Modal = () => {
    return (
      <DialogBView
        onTouchOutside={() => this.onTouchOutside()}
        willInflate={this.state.willInflate}
        children={this.ModalContent()}
      ></DialogBView>
    );
  };
  ModalContent = () => {
    return (
      <>
        <View style={globalStyle.connectEmail_wrapper}>
          <View style={globalStyle.alignItems_center}>
            <Text>Add To Playlist</Text>
          </View>
          <Pressable onPress={() => [this.onTouchOutside()]}>
            <Image
              style={globalStyle.closeDialog}
              resizeMode="contain"
              source={ImageConstant.LOG_IN.CLOSE}
            />
          </Pressable>
        </View>

        {this.MyPlayList()}
      </>
    );
  };
  CreatePlaylistModal = () => {
    return (
      <DialogView
        onTouchOutside={() => this.onTouchOutsideCreateModal()}
        willInflate={this.state.willInflateCreateModal}
        children={this.CreatePlaylistModalContent()}
      ></DialogView>
    );
  };
  CreatePlaylistModalContent = () => {
    return (
      <>
        <View style={globalStyle.connectEmail_wrapper}>
          <View style={globalStyle.alignItems_center}>
            <Pressable onPress={() => this.onTouchOutsideCreateModal()}>
              <Image
                style={globalStyle.back_image}
                resizeMode="contain"
                source={ImageConstant.EDITOR_PICK.BACK}
              />
            </Pressable>

            <Text style={{ marginLeft: 20 }}>Create new Playlist</Text>
          </View>
          <Pressable onPress={() => [this.onTouchOutsideCreateModal()]}>
            <Image
              style={globalStyle.closeDialog}
              resizeMode="contain"
              source={ImageConstant.LOG_IN.CLOSE}
            />
          </Pressable>
        </View>
        <View style={globalStyle.mainContainer}>
          <TextInput
            onChangeText={(text) => (playlistName = text)}
            placeholder="enter name"
            maxLength={22}
            style={globalStyle.textInput}
          ></TextInput>
          <View style={globalStyle.margin_30}>
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}
              buttonType="SMALL"
              labelStyleForm={globalStyle.fontSize_18}
              label={APP_STRING.DONE}
              action={() => this.onCreatePlaylistPress()}
            />
          </View>
        </View>
      </>
    );
  };
  renderRadioButton = (item) => {
    const { txt, isChecked, id } = item.item;
    return (
      <View style={globalStyle.view_row_radio_btn}>
        <RadioButton
          value={txt}
          // isChecked={true}
          status={this.state.selectedGenre == txt ? "checked" : "unchecked"}
          onPress={() => this.setState({ selectedGenre: txt })}
          color={COLORS.red}
        />
        <Text style={[{ color: COLORS.black, fontSize: 13 }, globalStyle.muli]}>
          {txt}
        </Text>
      </View>
    );
  };

  ReportModal = () => {
    return (
      <DialogView
        onTouchOutside={() => this.onTouchOutsideReportModal()}
        willInflate={this.state.willInflateReportModal}
        children={this.ReportModalContent()}
      ></DialogView>
    );
  };
  ReportModalContent = () => {
    return (
      <>
        <View style={globalStyle.connectEmail_wrapper}>
          <View style={globalStyle.alignItems_center}>
            <Pressable onPress={() => this.onTouchOutsideReportModal()}>
              <Image
                style={globalStyle.back_image}
                resizeMode="contain"
                source={ImageConstant.EDITOR_PICK.BACK}
              />
            </Pressable>

            <Text style={{ marginLeft: 20 }}>Report post</Text>
          </View>
          <Pressable onPress={() => [this.onTouchOutsideReportModal()]}>
            <Image
              style={globalStyle.closeDialog}
              resizeMode="contain"
              source={ImageConstant.LOG_IN.CLOSE}
            />
          </Pressable>
        </View>

        <View style={globalStyle.mainContainer}>
          {/* <FlatList
            data={this.state.radioButtons}
            //contentContainerStyle={globalStyle.Flex_1}
            renderItem={(item) => this.renderRadioButton(item)}
          ></FlatList> */}
          <TextInput
            onChangeText={(text) => (reportReason = text)}
            placeholder="Reason(Subject)"
            maxLength={22}
            style={globalStyle.textInput}
          ></TextInput>
          <TextInput
            textAlignVertical="top"
            onChangeText={(text) => (reportDesc = text)}
            placeholder="Enter Description"
            maxLength={22}
            multiline
            style={[globalStyle.textInput, { marginTop: 10, height: 90 }]}
          ></TextInput>
          <View style={globalStyle.margin_30}>
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}
              buttonType="SMALL"
              labelStyleForm={globalStyle.fontSize_18}
              label={APP_STRING.DONE}
              action={() => this.reportForContent()}
            />
          </View>
        </View>
      </>
    );
  };
  RequestSongModal = () => {
    return (
      <DialogView
        onTouchOutside={() => this.onTouchOutsideRequestModal()}
        willInflate={this.state.requestSong}
        children={this.RequestSongModalContent()}
      ></DialogView>
    );
  };
  RequestSongModalContent = () => {
    return (
      <>
        <View style={globalStyle.connectEmail_wrapper}>
          <View style={globalStyle.alignItems_center}>
            <Text>Request a song</Text>
          </View>
          <Pressable onPress={() => [this.onTouchOutsideRequestModal()]}>
            <Image
              style={globalStyle.closeDialog}
              resizeMode="contain"
              source={ImageConstant.LOG_IN.CLOSE}
            />
          </Pressable>
        </View>
        <View style={globalStyle.mainContainer}>
          <TextInput
            onChangeText={(text) => (songSingerDescription = text)}
            placeholder="Enter description"
            textAlignVertical={"top"}
            multiline={true}
            style={globalStyle.textInputDesc}
          ></TextInput>
          <View style={globalStyle.margin_30}>
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}
              buttonType="SMALL"
              labelStyleForm={globalStyle.fontSize_18}
              label={APP_STRING.DONE}
              action={() => this.onRequestPress()}
            />
          </View>
        </View>
      </>
    );
  };
  TipModal = () => {
    return (
      <DialogView
        onTouchOutside={() => this.onTouchOutsideTipSong()}
        willInflate={this.state.tipSong}
        children={this.TipModalContent()}
      ></DialogView>
    );
  };
  TipModalContent = () => {
    return (
      <>
        <View style={globalStyle.connectEmail_wrapper}>
          <View style={globalStyle.alignItems_center}>
            <Text style={{ marginRight: 40 }}>
              Thank you for pledge to support
              <Text style={{ fontWeight: "700" }}>
                {` ` + this.state.singerName}
              </Text>
            </Text>
          </View>
          <Pressable onPress={() => [this.onTouchOutsideTipSong()]}>
            <Image
              style={globalStyle.closeDialog}
              resizeMode="contain"
              source={ImageConstant.LOG_IN.CLOSE}
            />
          </Pressable>
        </View>
        <View style={globalStyle.mainContainer}>
          {this.TipList()}
          <View style={globalStyle.margin_30}>
            <BUTTON
              buttonFormStyle={{
                backgroundColor: COLORS.primary2,
                shadowColor: COLORS.primary2,
              }}
              buttonType="SMALL"
              labelStyleForm={globalStyle.fontSize_18}
              label={APP_STRING.DONE}
              action={() => this.payToSinger()}
            />
          </View>
        </View>
      </>
    );
  };
  renderItem = (item) => {
    const { title, songUrl, coverPhotoUrl, about, genre, _id } = item.item;
    return (
      <Pressable
        onPress={() =>
          this.setState({ selectedSongId: _id, songUri: songUrl }, () =>
            this.playSongOnTapSong()
          )
        }
        style={[globalStyle.flexRow, { marginTop: 10, paddingHorizontal: 0 }]}
      >
        <ImageBackground
          resizeMode="cover"
          borderRadius={8}
          style={globalStyle.song_img}
          source={
            CommonUtility.getInstance().isEmpty(coverPhotoUrl)
              ? ImageConstant.HOME.VIDEO1
              : { uri: coverPhotoUrl }
          }
        ></ImageBackground>
        <View style={[globalStyle.marginLeft_13]}>
          <Text
            numberOfLines={2}
            style={[
              globalStyle.song_name,
              globalStyle.muli_bold,
              { marginRight: 70 },
            ]}
          >
            {title + ` (` + genre + `)`}
          </Text>
          <Text
            numberOfLines={1}
            style={[globalStyle.singer_name, globalStyle.muli]}
          >
            {about}
          </Text>
        </View>
      </Pressable>
    );
  };
  onStateChange = (value) => {};
  render() {
    const {
      isOutSourceVideo,
      songName,
      songGenre,
      songDescription,
      isFavourite,
      nextSongsToPlay,
      isLiked,
      isClapped,
      singerName,
      singerProfile,
      songUri,
      coverPhotoUrl,
      singerId,
      isVoted,
      likes,
      voteCount,
      isRatingShown,
      rating,
      songTitleHeader,
    } = this.state;
    console.log("songUri==", this.state.orientation);
    return (
      <>
        <View style={globalStyle.view_flex_one}>
          {this.state.orientation != "landscape" && (
            <Header
              onTouchOutside={() => this.setState({ willInflate: true })}
              songTitle={songTitleHeader}
            />
          )}

          {this.Modal()}
          {this.CreatePlaylistModal()}
          {this.RequestSongModal()}
          {this.TipModal()}
          {this.ReportModal()}

          {isOutSourceVideo ? (
            <YoutubePlayer
              height={260}
              play={true}
              videoId={
                "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              }
              onChangeState={this.onStateChange}
            />
          ) : Platform.OS === "android" ? (
            <>
              <View
                style={{
                  // top: this.state.orientation == "portrait" ? 0 : "-12%",
                  // top:
                  //   this.state.orientation == "portrait"
                  //     ? 0
                  //     : CommonUtility.getInstance().DHN(-100),
                  //   left: 0,
                  //right: 0,
                  height: this.state.orientation == "portrait" ? "40%" : "100%",
                  width: "100%",
                }}
              >
                <VideoPlayer
                  disableBack={
                    this.state.orientation == "portrait" ? true : false
                  }
                  onBack={() =>
                    CommonUtility.getInstance().inflateToast(
                      "Please rotate device to go Back."
                    )
                  }
                  seeking
                  disableVolume={true}
                  controlAnimationTiming={100}
                  style={
                    {
                      //bottom: this.state.orientation == "portrait" ? 0 : "-8%",
                    }
                  }
                  isFullscreen={false}
                  source={{
                    uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
                  }}
                  navigator={this.props.navigator}
                />
              </View>
            </>
          ) : (
            <Video
              onBuffer={() => console.log("buffering")}
              key={songUri}
              poster={coverPhotoUrl}
              // source={{
              //   uri: this.props.route.params.songUrl,
              // }}
              source={{
                uri: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              }}
              ref={(ref) => {
                this.videoPlayer = ref;
              }}
              style={globalStyle.backgroundVideo}
              resizeMode="contain"
              onError={(data) =>
                console.error("Video player error==", JSON.stringify(data))
              }
              // onEnd={this.onEnd}
              // onLoad={this.onLoad}
              // onLoadStart={this.onLoadStart}
              // onProgress={this.onProgress}
              // paused={this.state.paused}
              // controls={Platform.OS === "android" ? false : true}
              // resizeMode={this.state.screenType}
              // onFullScreen={this.state.isFullScreen}
            />
          )}

          <ScrollView
            automaticallyAdjustContentInset
            nestedScrollEnabled
            showsVerticalScrollIndicator={false}
          >
            {isRatingShown && (
              <View
                style={{
                  height: 66,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Rating
                  imageSize={20}
                  startingValue={rating}
                  // showRating
                  onFinishRating={this.ratingCompleted}
                  style={{ paddingVertical: 10 }}
                />
              </View>
            )}
            <View style={globalStyle.like_unlike_view_container}>
              <View style={globalStyle.flexRow}>
                <View style={{ alignItems: "center" }}>
                  <Pressable
                    style={globalStyle.shadow}
                    onPress={this.setLikeDislike}
                  >
                    <Image
                      source={
                        isLiked
                          ? ImageConstant.APP.THUMBSUP
                          : ImageConstant.APP.THUMBS
                      }
                      style={globalStyle.like_img}
                    ></Image>
                  </Pressable>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontFamily: "Muli",
                      marginTop: -5,
                      fontSize: 12,
                      letterSpacing: 1,
                    }}
                  >
                    {likes + ` Likes`}
                  </Text>
                </View>

                <Pressable style={globalStyle.shadow} onPress={this.setClaps}>
                  <Image
                    source={
                      isClapped
                        ? ImageConstant.APP.CLAPPED
                        : ImageConstant.APP.CLAPPS
                    }
                    style={globalStyle.like_img}
                  ></Image>
                </Pressable>
                <Pressable
                  style={globalStyle.shadow}
                  onPress={this.addSongToFavouriteCall}
                >
                  <Image
                    source={
                      isFavourite
                        ? ImageConstant.APP.LIKED
                        : ImageConstant.APP.LIKE
                    }
                    style={globalStyle.like_img}
                  ></Image>
                </Pressable>
                <Pressable
                  style={globalStyle.shadow}
                  onPress={this.handleRatingVisiblity}
                >
                  <Image
                    source={ImageConstant.APP.RATING}
                    style={globalStyle.like_img}
                  ></Image>
                </Pressable>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 20,
                  }}
                >
                  <Pressable
                    onPress={!isVoted ? this.onVotePress : null}
                    style={{
                      height: 36,
                      width: 74,
                      backgroundColor: isVoted
                        ? COLORS.primary1
                        : COLORS.primary2,
                      borderRadius: 20,
                      alignItems: "center",
                      justifyContent: "center",
                      marginTop: 12,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 5,
                      },
                      shadowOpacity: 0.36,
                      shadowRadius: 3.68,
                      elevation: 5,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        //fontFamily: "Muli-Light",
                        color: isVoted ? COLORS.black : COLORS.white,
                      }}
                    >
                      {isVoted ? `Voted` : `Vote`}
                    </Text>
                  </Pressable>
                  <Text
                    style={{
                      color: COLORS.black,
                      fontFamily: "Muli",
                      marginTop: 5,
                      fontSize: 12,
                      letterSpacing: 0.1,
                    }}
                  >
                    {voteCount + ` Votes`}
                  </Text>
                </View>

                <Pressable onPress={this.onShare}>
                  <Image
                    source={ImageConstant.APP.SHARE}
                    style={globalStyle.share_img}
                  ></Image>
                </Pressable>
              </View>
            </View>
            <View style={globalStyle.song_text_container}>
              <View style={globalStyle.song_desc_container}>
                <Text numberOfLines={3} style={globalStyle.songname}>
                  {songName + ` (` + songGenre + `)`}
                </Text>
                <Text numberOfLines={2} style={globalStyle.singerName}>
                  {songDescription}
                </Text>
              </View>
              <Pressable
                onPress={() => this.setState({ willInflateReportModal: true })}
                style={globalStyle.flex_0}
              >
                <Image
                  source={ImageConstant.APP.FLAG}
                  style={globalStyle.flag_img}
                ></Image>
              </Pressable>
            </View>
            {/* <Text
              numberOfLines={1}
              style={(globalStyle.songname, globalStyle.date_txt)}
            >
              14-oct-2020
            </Text> */}
            <View
              style={[
                globalStyle.flexRow,
                globalStyle.pad_10,
                globalStyle.justifyContent_spaceBetween,
              ]}
            >
              <Pressable
                onPress={this.sendUserToSingerProfile}
                style={(globalStyle.flexRow, globalStyle.alignItems_center)}
              >
                <Image
                  source={{ uri: singerProfile }}
                  style={globalStyle.current_play_user}
                ></Image>
                <Text
                  numberOfLines={3}
                  style={[
                    globalStyle.songname,
                    globalStyle.marginLeft_13,
                    { width: "40%" },
                  ]}
                >
                  {singerName}
                </Text>
              </Pressable>
              {this.props?.loggedInUser?._id !== singerId && (
                <View
                  style={(globalStyle.flexRow, globalStyle.alignItems_center)}
                >
                  <Pressable
                    onPress={() => this.setState({ requestSong: true })}
                    style={[
                      globalStyle.req_song_container,
                      globalStyle.marginRight_13,
                    ]}
                  >
                    <Image
                      source={ImageConstant.APP.REQUEST}
                      style={globalStyle.req_img}
                    ></Image>

                    <Text style={globalStyle.songReq}>Request a song</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => this.setState({ tipSong: true })}
                    style={[globalStyle.req_song_container]}
                  >
                    <Text
                      style={[globalStyle.songReq, globalStyle.font_14]}
                    >{`\u20A8 10`}</Text>
                    <Text style={globalStyle.songReq}>Tip to artist</Text>
                  </Pressable>
                </View>
              )}
            </View>
            <Separator></Separator>
            <FlatList
              data={nextSongsToPlay}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                (globalStyle.white_background, globalStyle.paddingHorizontal_20)
              }
              style={[globalStyle.Flex_1, globalStyle.marginTop_20]}
              renderItem={(item) => this.renderItem(item)}
            />
          </ScrollView>
        </View>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedInUser: state.loggedInUserReducer.userData,
});

export default connect(mapStateToProps)(Player);
