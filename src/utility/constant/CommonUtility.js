import { Dimensions, PixelRatio } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import Toast from "react-native-simple-toast";
const { width, height } = Dimensions.get("window");
import APP_STRING from "./StringConstants";
const standardDeviceSize = { width: 375, height: 667 };
export default class CommonUtility {
  static myInstance = null;

  static getInstance() {
    if (this.myInstance == null) {
      this.myInstance = new CommonUtility();
    }
    return this.myInstance;
  }

  actualDeviceSize = {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  };

  dHN = (actualHeight) => {
    const heightRatio = (actualHeight + 0) / standardDeviceSize.height;
    const windowHeight = Dimensions.get("window").height;
    const reqHeight = heightRatio * windowHeight;
    return reqHeight;
  };

  dWN = (actualWidth) => {
    const widthRatio = (actualWidth + 0) / standardDeviceSize.width;
    const windowWidth = Dimensions.get("window").width;
    const reqWidth = widthRatio * windowWidth;
    return reqWidth;
  };
  isValidHttpUrl(string) {
    let url;

    try {
      url = new URL(string);
    } catch (_) {
      return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
  }
  async validURL(myURL) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + //port
        "(\\?[;&amp;a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    console.log("validURL=>", pattern.test(myURL));
    return pattern.test(myURL);
  }
  inflateToast(message) {
    return Toast.show(message, Toast.SHORT);
  }
  async getStoreData(Key_to_be_fetched) {
    try {
      const value = await AsyncStorage.getItem(Key_to_be_fetched);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.log("ERROR IN FETCHING ASYNC STORAGE DATA");
      return null;
    }
  }

  async setStoreData(Key_to_be_paired, data_to_save) {
    try {
      console.log("STORING DATA", Key_to_be_paired);
      const value = await AsyncStorage.setItem(
        Key_to_be_paired,
        JSON.stringify(data_to_save)
      );
    } catch (e) {
      console.log("ERROR WHILE STORING  DATA", e);
    }
  }
  async getUserToken() {
    try {
      const value = await AsyncStorage.getItem("USER_TOKEN");
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.log("ERROR IN FETCHING ASYNC STORAGE DATA");
      return null;
    }
  }
  async getUserPersonalInformation() {
    try {
      const value = await AsyncStorage.getItem(APP_STRING.USER_INFORMATION);
      if (value !== null) {
        return JSON.parse(value);
      }
    } catch (e) {
      console.log("ERROR IN FETCHING ASYNC STORAGE DATA");
      return null;
    }
  }

  async removeStoreData(Key_to_be_removed) {
    try {
      await AsyncStorage.removeItem(Key_to_be_removed);
    } catch (e) {
      console.log("ERROR WHILE REMOVING  DATA", e);
    }
  }
  async hasWhiteSpace(s) {
    //return /\s/g.test(s);
    return s.indexOf(" ") >= 0;
  }
  isEmpty(item_to_check) {
    if (
      item_to_check == null ||
      item_to_check == undefined ||
      item_to_check == "" ||
      item_to_check == "null"
    )
      return true;
    else return false;
  }
  isEmptyString(item_to_check) {
    if (item_to_check == "") return true;
    else return false;
  }
  isEmail = (email) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    return pattern.test(email);
  };
  DH = () => {
    return height;
  };
  DW = () => {
    return width;
  };
  CC_BURL_WSURL(BASE_URL, API_URL) {
    return BASE_URL + API_URL;
  }
  widthToDp = (number) => {
    let givenWidth = typeof number === "number" ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
    //will return a DPI(Density pixel ratio);
  };

  heightToDp = (number) => {
    let givenHeight = typeof number === "number" ? number : parseFloat(number);
    return PixelRatio.roundToNearestPixel((width * givenHeight) / 100);
    //will return a DPI(Density pixel ratio);
  };
}
