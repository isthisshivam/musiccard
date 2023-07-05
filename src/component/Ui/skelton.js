import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import CommonUtility from "../../utility/constant/CommonUtility";

const Skeletons = ({ type }) => {
  return (
    <>
      {type == "paragraph" ? (
        <SkeletonPlaceholder>
          <View>
            <View style={{ margin: 10 }}>
              <View
                style={{
                  marginTop: 6,
                  height: 20,
                  width: "100%",
                  borderRadius: 0,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  height: 20,
                  width: "100%",
                  borderRadius: 0,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: "50%",
                  height: 20,
                  borderRadius: 0,
                }}
              />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : null}
      {type == "cardAvatar" ? (
        <SkeletonPlaceholder>
          <View style={{ margin: 10, flexDirection: "row" }}>
            <View style={{ width: 80, height: 80, borderRadius: 50 }} />
            <View style={{ marginLeft: 20, flex: 1 }}>
              <View
                style={{
                  marginTop: 6,
                  height: 20,
                  width: "100%",
                  borderRadius: 0,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  height: 20,
                  width: "100%",
                  borderRadius: 0,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: "80%",
                  height: 20,
                  borderRadius: 0,
                }}
              />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : null}
      {type == "card" ? (
        <SkeletonPlaceholder>
          <View style={{ margin: 10, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  marginTop: 6,
                  height: 20,
                  width: "100%",
                  borderRadius: 0,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  height: 20,
                  width: "100%",
                  borderRadius: 0,
                }}
              />
              <View
                style={{
                  marginTop: 6,
                  width: "80%",
                  height: 20,
                  borderRadius: 0,
                }}
              />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : null}
      {type == "newsCard" ? (
        <SkeletonPlaceholder>
          <View style={{ margin: 10, flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  marginTop: 6,
                  height: "10%",
                  width: "100%",
                  borderRadius: 0,
                }}
              />
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : null}
      {type == "squares" ? (
        <SkeletonPlaceholder>
          <View style={{ flexDirection: "row" }}>
            <View style={{ margin: 6 }}>
              <View
                style={{
                  height: 140,
                  width: 140,
                  marginLeft: 0,
                  shadowColor: "white",
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  //margin: 6,
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  borderRadius: 10,
                  elevation: 5,
                }}
              ></View>
              <View style={{ marginLeft: 0, marginTop: 10 }}>
                <View style={{ width: 120, height: 14, borderRadius: 4 }} />
                <View
                  style={{
                    marginTop: 6,
                    width: 80,
                    height: 14,
                    borderRadius: 4,
                  }}
                />
              </View>
            </View>
          </View>
        </SkeletonPlaceholder>
      ) : null}
      {type == "vtd" ? (
        <SkeletonPlaceholder>
          <View
            style={{
              marginVertical: 15,
              height: 135,
              borderRadius: 10,
              paddingHorizontal: 20,
              paddingVertical: 15,
              width: CommonUtility.getInstance().DW() - 20,
            }}
          ></View>
        </SkeletonPlaceholder>
      ) : null}
    </>
  );
};

export default Skeletons;
