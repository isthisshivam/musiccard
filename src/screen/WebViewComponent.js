import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  TextInput,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  useColorScheme,
  Dimensions,
  View,
  Pressable,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { useNavigation } from "@react-navigation/native";
import Loader from "../component/Ui/loader";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../utility/constant/Colors";
import BUTTON from "../component/Ui/button";
import APP_STRING from "../utility/constant/StringConstants";
import ImageConstant from "../utility/constant/ImageConstant";
import CommonUtility from "../utility/constant/CommonUtility";
import globalStyle from "../assets/styles/styles";
import { WebView } from "react-native-webview";

var v1 = `https://db6p2rfovedi3.cloudfront.net/60b3cc5b842752053112f2ec/611803a6842752053112f7be/Chitthi%20Na%20Koi%20Sandesh%20Dedicated%20to%20all%20the%20soldiers.m3u8?Expires=1628963784&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzYwYjNjYzViODQyNzUyMDUzMTEyZjJlYy82MTE4MDNhNjg0Mjc1MjA1MzExMmY3YmUvQ2hpdHRoaSBOYSBLb2kgU2FuZGVzaCBEZWRpY2F0ZWQgdG8gYWxsIHRoZSBzb2xkaWVycy5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2Mjg5NjM3ODR9fX1dfQ__&Signature=cTTTuXY9HYYAk4lLyO5P0d9g2NSn0jd2vkT5I60hzDgO-KTUrXxGY%7EIPanYG%7E58sj7%7EK9t6g1Gze%7ES3QUOLGq49zXdXKWbPWAUrPI82CGb%7ErCTyRMfQrexsICBkRUp8KnZCU3pyoH80fVzze9dgf6-Duy4Z7%7ErA7rm54Dq0OoqsxfvcAItkrVQyphJh3jrdPYJP13AJKgTn3QeIQyZDXcOT9bmijPj%7ElSohUn3mL9NXammszryVeLbFIdn1pk%7Ec8ioqzD7Hyqb5jng%7EAi01CytS5h1tIDdM2kmR1Qii4gjoRtN5sj9d2mIdEd%7EOn-OUrM8fRW37bwrbYIeIsTbbrBQ__`;
var v2 = `https://db6p2rfovedi3.cloudfront.net/60b51457842752053112f31d/60e1a12b842752053112f4e0/subhanallah%20song%20yeh%20jawani%20hai%20deewani.m3u8?Expires=1625399627&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzYwYjUxNDU3ODQyNzUyMDUzMTEyZjMxZC82MGUxYTEyYjg0Mjc1MjA1MzExMmY0ZTAvc3ViaGFuYWxsYWggc29uZyB5ZWggamF3YW5pIGhhaSBkZWV3YW5pLm1wNCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYyNTM5OTYyN319fV19&Signature=AXQhDN-Lj2puv8qHXyAjOPMHsH3xNu3723fDYbsgrwMI7hf78mkepa%7E0WpWnMV5s8Kk%7EZz-u-g3yxYrxWhN5QAf4c-81HcGXR68mGSlhjERYD1bCHdThyGJLzecN5Bvw5MC0rOSK2U-f1PNpVB9xoH85QVxScsdTwJd6ZSuMcdff2W8qY8xO6Ix1%7EAkbujKGmJ2yamCwvKAcE2k-Mar6kZEotSgrh9CWb4V36BvUxnFhUjwbzXIq5IqoMbQJxPzfCi9RPMMYsqh1oO7bIAMDEKmlJN1ZNsX8Wfs65ukWmQ0D4Hje2T-Mla5fZXvhyuXDmFUHLXFjHfNAKhMWyHsZGQ__`;
var v3 = `https://db6p2rfovedi3.cloudfront.net/5f71d1ec55edd701b3d96206/60bdaac8842752053112f360/rag%20jog%20%20..m3u8?Expires=1623042791&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzVmNzFkMWVjNTVlZGQ3MDFiM2Q5NjIwNi82MGJkYWFjODg0Mjc1MjA1MzExMmYzNjAvcmFnIGpvZyAgLi5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MjMwNDI3OTF9fX1dfQ__&Signature=WkxX9AyX3AugpIckbFn-LkCHzVPWnVz7RqIT-pYSpQicrOfb2OeSTw5LQQJSelUwY8eDvrGIsQ4iPbKxbEwvKA5M00L-ZWIki7HsB8t6BjwEEO3VvHOOJ6-9ko3KvQCcw2OgJ95Nz8wYRXpGeVfmT1ns3oRXqdyQI0-AoUle%7Evt1T2e78uvU48rLEEQHorCT1jRLlYpoKiBsz3HWuu4lqoec5tb-sL%7ECG23V0RQCqgk%7EPY4OWkIRTg01OEgBzbDl7xX908qjy3TaXLU37QGZuKGaoXP%7EGhRgBHZoVAU08tnITrCCRAO8ZZ9dYErhKKgQHlBfvcagb7tpq%7Ewl0OrzaQ__`;
var v4 = `https://db6p2rfovedi3.cloudfront.net/5f85809d55edd701b3d962cb/60db62fb842752053112f4bd/Suno%20na%20Suno%20na%20.m3u8?Expires=1624990491&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzVmODU4MDlkNTVlZGQ3MDFiM2Q5NjJjYi82MGRiNjJmYjg0Mjc1MjA1MzExMmY0YmQvU3VubyBuYSBTdW5vIG5hIC5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MjQ5OTA0OTF9fX1dfQ__&Signature=DmYjjp%7Ep7xIjnqo8EneX96ViEnzPVdT-BKf-OB6jlkjoqVhv4QRhe1rE3YVGa2XXU0XLt1rIjPg-LoDzMqcHm6T4-sQ8HsQ1SpuEJE8WeKHDmCl%7EkdmEGp2zkEO6WuBuZcmhMZwUtqFbk4%7ECMhQUPqB3gAKXwNHTn6Ek6oPeWVTfUz7%7ETPWfyJT%7ERxe6W5YPliQU9dHAKt4oP3Cd1piCCnVn9ZGelp1%7E0IFFSdtj6Zj1HIy92IPUdoJMMcug80V5pZySJ1ZhJq28umbGaHoqKp0puMl-8y54Chy3wiVCpBj653MNwRJQDlTLvdVyYR7x6f1lUGevwvmiXCM1VCAyXA__`;
var v5 = `https://db6p2rfovedi3.cloudfront.net/60b3cc5b842752053112f2ec/611c810a842752053112f7fa/Sandeshe%20Aate%20Hein%20Cover%20Song.m3u8?Expires=1629258027&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzYwYjNjYzViODQyNzUyMDUzMTEyZjJlYy82MTFjODEwYTg0Mjc1MjA1MzExMmY3ZmEvU2FuZGVzaGUgQWF0ZSBIZWluIENvdmVyIFNvbmcubXA0IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjI5MjU4MDI3fX19XX0_&Signature=W-qxLLaV2s08W2zZCNUMWcYDRXioVUWhhtacQh6JyFK-8gPPReJHFtWHzYk6ObfDgG%7EkIojnjtrwkY5iQu6vPZchpw4LCrm9B0somQSG31GnGYWG28MvkZ0w1YjvrShz%7E35EGGoNyVW-HFO6c09nRXG4IqBCPMqTy%7Ehw0tbvh0ku7OBs6P6GcTZSj3aA71bBaeDN2w6g7smbCkRVAFTO8QYpgiVfCqSYcxMXtIWeP%7Ed4Xh95t-FFUc%7EkG-yV8UrVcS7SiSJTTZiRkyy%7Eqy9RTc7RBi7pbZ5Knuv3cywQmJRm-Q-pP3GJKi9kSVaQ7QcICAwUcpjaY9wP1A82VgrtvA__`;
var v6 = `https://db6p2rfovedi3.cloudfront.net/60ebc817842752053112f537/612391df842752053112f868/Chaha%20Hai%20Tujhko.m3u8?Expires=1629721091&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzYwZWJjODE3ODQyNzUyMDUzMTEyZjUzNy82MTIzOTFkZjg0Mjc1MjA1MzExMmY4NjgvQ2hhaGEgSGFpIFR1amhrby5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2Mjk3MjEwOTF9fX1dfQ__&Signature=VcQpyNNHSa5iWrlP%7EO-R21NLXq1avomQZ2lHK2o%7E5a0A9qo-BHkDIGCB0r8hHw5I%7EMGLtaib%7EbXD-kAzLnKCU91Zbf4UAjV07UHW9yNrYloObfDMiqLJ1JERJNSI0PH1EFTV8spnArQ-J6inAlBpGXhLtzQ2fhh%7E14s9C%7EBpWqMxQJ5VspFcar%7EJ2V-WJsyNhphW8vhEIErEIEGKkhkUZjTVzQkS4UzugpbG93HlZ0G-HKymO4aUMoI2r9WZLof9NVVRY%7EPAfjERDnU%7Eu6la2C86XiWdj0jErH4LK5lJydtjXrJofUVQ1sZVzoBUW7ZYVLHVkOnN2G9yTDDJlokuLw__`;
var v7 = `https://db6p2rfovedi3.cloudfront.net/60c0e4d6842752053112f382/610a1a63842752053112f6f0/Ek%20Pyar%20ka%20nagma%20hai,%20.m3u8?Expires=1628052101&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzYwYzBlNGQ2ODQyNzUyMDUzMTEyZjM4Mi82MTBhMWE2Mzg0Mjc1MjA1MzExMmY2ZjAvRWsgUHlhciBrYSBuYWdtYSBoYWksIC5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MjgwNTIxMDF9fX1dfQ__&Signature=W8kiAaWmlIJqMuFL0ffaSB9qarqVfIui1inEya2qeMuZNTfzf2rJeuxnLROgYQxD-uhSWef%7Efte2Z3VnHjGS8lnfHne7Nty30q2nGSgw00NiAzWv-rtJCSzJMvzQUixgwhxWEtbVu6PryMnUGUq1fRZOIzFH4OOOz4vGl4cIn5eiOkNpH5Jlb%7EP1DfvlfrekKB5zifj3tSdfHeP3hQxnfGlO-Hcp1NNpnzLmtMk8A9PYRFueXPQB7qQ%7Eb7%7EhGgtgeqdomvAemFDW%7ED5dGAwa1b30dxv6oGtqNg7kiwcQt1yoKsMOxYzbJEIiJM3xt9TgyM9DbsrC9lo-pWfrSBHVRA__`;
var v8 = `https://db6p2rfovedi3.cloudfront.net/60b3cc5b842752053112f2ec/610e9238842752053112f735/Rimjhim%20Ghire%20Sawan%20Cover%20Song.m3u8?Expires=1628344921&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzYwYjNjYzViODQyNzUyMDUzMTEyZjJlYy82MTBlOTIzODg0Mjc1MjA1MzExMmY3MzUvUmltamhpbSBHaGlyZSBTYXdhbiBDb3ZlciBTb25nLm1wNCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYyODM0NDkyMX19fV19&Signature=MYSbX%7Eb03Iq2aoswiwTvyivVEUC6u4CjEWYCbxfzx8DJreqVx%7Eqs5Fyajj0Ajkg0SDz%7E%7EzSSBBOfKiHP4K7D9mcO0y0heLiFw42pepBUSsvwwPz-hI-f3py5vVwPzYN2Ixwfu2I09rTsNrJIAcaVeuQDdZZ2wiIox5ZIZjlRMFmE6IVyGeW9SrzA3%7ETBsYEHRVP1VcvdmWeigFaC4V1wSflViMkpX998%7EbxargAAr1aRwBtQIc06Vg0Ci7kLWZ6oTxv2T7JVlk%7EC2BzMVr9m39AzpMNIjqcHYPl0UlLIQutXHKj5D5%7E01X5jjDTgILb0-jQXEs20kqazFDhsofhMlQ__`;
var v9 = `https://db6p2rfovedi3.cloudfront.net/60b47435842752053112f2ff/6110172b842752053112f743/Dil%20ko%20Karaar%20Aya.m3u8?Expires=1628444497&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzYwYjQ3NDM1ODQyNzUyMDUzMTEyZjJmZi82MTEwMTcyYjg0Mjc1MjA1MzExMmY3NDMvRGlsIGtvIEthcmFhciBBeWEubXA0IiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNjI4NDQ0NDk3fX19XX0_&Signature=Cc8rXPhEbe0h7Zj5nxas-Q1pHFBjaX5nz7Xps8WspZnOvn7yediw-RHQzU3xXB2snuaIm25Lv4iE-DpM8opOs1vy2cEtCKeraf73B-1PaTOvHM4YuZ4rkYXzMgBKbgC7rjxSFASnexAdoghcsRUGeD0wGbmOfUGS-5A3hp-jnj%7Egrx1ENYRlFu%7EL9SqsGJarHH%7EKe3QJ%7EuS8-yrWH2ixrNNagiv1FngOK7p-zrHVeBXdF8dHAP4vLtrw8z-8QOCK-TgChf1TEi2plF9e03sm8XrVNnTE58q7wZYFlPn7iy53gi02y%7EW6s-qen95Wd7B8Xdwi5-CBzHcatJ3GbNI5cg__`;
var v10 = `https://www.youtube.com/watch?v=O237HInwjGQ`;
///////////
var videos = [
  `https://db6p2rfovedi3.cloudfront.net/60b3cc5b842752053112f2ec/611803a6842752053112f7be/Chitthi%20Na%20Koi%20Sandesh%20Dedicated%20to%20all%20the%20soldiers.m3u8?Expires=1628963784&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzYwYjNjYzViODQyNzUyMDUzMTEyZjJlYy82MTE4MDNhNjg0Mjc1MjA1MzExMmY3YmUvQ2hpdHRoaSBOYSBLb2kgU2FuZGVzaCBEZWRpY2F0ZWQgdG8gYWxsIHRoZSBzb2xkaWVycy5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2Mjg5NjM3ODR9fX1dfQ__&Signature=cTTTuXY9HYYAk4lLyO5P0d9g2NSn0jd2vkT5I60hzDgO-KTUrXxGY%7EIPanYG%7E58sj7%7EK9t6g1Gze%7ES3QUOLGq49zXdXKWbPWAUrPI82CGb%7ErCTyRMfQrexsICBkRUp8KnZCU3pyoH80fVzze9dgf6-Duy4Z7%7ErA7rm54Dq0OoqsxfvcAItkrVQyphJh3jrdPYJP13AJKgTn3QeIQyZDXcOT9bmijPj%7ElSohUn3mL9NXammszryVeLbFIdn1pk%7Ec8ioqzD7Hyqb5jng%7EAi01CytS5h1tIDdM2kmR1Qii4gjoRtN5sj9d2mIdEd%7EOn-OUrM8fRW37bwrbYIeIsTbbrBQ__`,
  `https://db6p2rfovedi3.cloudfront.net/60b51457842752053112f31d/60e1a12b842752053112f4e0/subhanallah%20song%20yeh%20jawani%20hai%20deewani.m3u8?Expires=1625399627&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzYwYjUxNDU3ODQyNzUyMDUzMTEyZjMxZC82MGUxYTEyYjg0Mjc1MjA1MzExMmY0ZTAvc3ViaGFuYWxsYWggc29uZyB5ZWggamF3YW5pIGhhaSBkZWV3YW5pLm1wNCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTYyNTM5OTYyN319fV19&Signature=AXQhDN-Lj2puv8qHXyAjOPMHsH3xNu3723fDYbsgrwMI7hf78mkepa%7E0WpWnMV5s8Kk%7EZz-u-g3yxYrxWhN5QAf4c-81HcGXR68mGSlhjERYD1bCHdThyGJLzecN5Bvw5MC0rOSK2U-f1PNpVB9xoH85QVxScsdTwJd6ZSuMcdff2W8qY8xO6Ix1%7EAkbujKGmJ2yamCwvKAcE2k-Mar6kZEotSgrh9CWb4V36BvUxnFhUjwbzXIq5IqoMbQJxPzfCi9RPMMYsqh1oO7bIAMDEKmlJN1ZNsX8Wfs65ukWmQ0D4Hje2T-Mla5fZXvhyuXDmFUHLXFjHfNAKhMWyHsZGQ__`,
  `https://db6p2rfovedi3.cloudfront.net/5f85809d55edd701b3d962cb/60db62fb842752053112f4bd/Suno%20na%20Suno%20na%20.m3u8?Expires=1624990491&Key-Pair-Id=APKAJSKSOLEVYU6N42KA&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9kYjZwMnJmb3ZlZGkzLmNsb3VkZnJvbnQubmV0LzVmODU4MDlkNTVlZGQ3MDFiM2Q5NjJjYi82MGRiNjJmYjg0Mjc1MjA1MzExMmY0YmQvU3VubyBuYSBTdW5vIG5hIC5tcDQiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE2MjQ5OTA0OTF9fX1dfQ__&Signature=DmYjjp%7Ep7xIjnqo8EneX96ViEnzPVdT-BKf-OB6jlkjoqVhv4QRhe1rE3YVGa2XXU0XLt1rIjPg-LoDzMqcHm6T4-sQ8HsQ1SpuEJE8WeKHDmCl%7EkdmEGp2zkEO6WuBuZcmhMZwUtqFbk4%7ECMhQUPqB3gAKXwNHTn6Ek6oPeWVTfUz7%7ETPWfyJT%7ERxe6W5YPliQU9dHAKt4oP3Cd1piCCnVn9ZGelp1%7E0IFFSdtj6Zj1HIy92IPUdoJMMcug80V5pZySJ1ZhJq28umbGaHoqKp0puMl-8y54Chy3wiVCpBj653MNwRJQDlTLvdVyYR7x6f1lUGevwvmiXCM1VCAyXA__`,
];
var youTube = `https://www.youtube.com/embed/=kyQXU_w-LAI`;
const WebViewComponent = () => {
  const navigation = useNavigation();
  const [searchKeyword, setSearchKeyword] = useState("");
  const updateSearch = (search) => {};
  const [searchText, setSearchText] = useState("");

  const INJECTED_JAVASCRIPT = () => {
    window.ReactNativeWebView.postMessage(JSON.stringify(window.location));
  };

  const MyWebView = () => {
    return (
      // <WebView
      //   source={{
      //     uri: "https://reactjs.org/",
      //     headers: {
      //       "Access-Control-Allow-Methods": "*",
      //       "Access-Control-Allow-Origin": "*",
      //     },
      //   }}
      //   renderLoading={() => <Text>Loading...</Text>}
      //   startInLoadingState
      //   domStorageEnabled
      //   geolocationEnabled
      //   allowUniversalAccessFromFileURLs
      //   allowFileAccess
      //   style={{
      //     marginTop: 0,
      //     height: 300,
      //     flex: 0,
      //     backgroundColor: "gray",
      //     // width: 300,
      //   }}
      // />
      <WebView
        source={{
          uri: youTube,
        }}
        allowsFullscreenVideo={true}
        // onLoadStart={(syntheticEvent) => {
        //   // update component to be aware of loading status
        //   const { nativeEvent } = syntheticEvent;
        //   alert(JSON.stringify(nativeEvent));
        // }}
        onLoadProgress={(syntheticEvent) => {
          // update component to be aware of loading status
          const { nativeEvent } = syntheticEvent;
          console.log("onLoadProgress", JSON.stringify(nativeEvent));
        }}
        mediaPlaybackRequiresUserAction={false}
        style={{
          marginTop: 0,
          height: 300,
          flex: 0,
          backgroundColor: "gray",
          // width: 300,
        }}
        containerStyle={{ marginTop: 20, height: 300 }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.log("WebView error: ", nativeEvent);
        }}
        onHttpError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.log(
            "WebView received error status code: ",
            nativeEvent.statusCode
          );
        }}
        // renderLoading={() => <Loader isLoading={true} />}
        // injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
      />
    );
  };
  return (
    <>
      <View style={globalStyle.view_flex_one}>
        {/* <Header /> */}
        <MyWebView></MyWebView>
      </View>
    </>
  );
};
export default WebViewComponent;
