import React, { useState, useEffect } from "react";

//요소
import {
  Image,
  Alert,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Dimensions,
  Platform,
  ImageBackground,
  ScrollView,
  View,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator as Spinner,
  BackHandler,
} from "react-native";
import {} from "@react-navigation/native";

import Icon from "react-native-vector-icons/Ionicons";
import { NavBar, SvgType } from "../../components/navbar";
import GlobalStyles from "../../assets/styles";

//Redux
import { useSelector } from "react-redux";
import { State } from "../../storage/reducers";

//넓이 계산
const size = Dimensions.get("window").width;

export const AddPhoto = ({
  roomTitle,
  setRoomTitle,
  roomDescription,
  setRoomDescription,
  roomThumbnail,
  setRoomThumbnail,
  myPhotoData,
}: any) => {
  console.log("MYpHPTO : ", myPhotoData);
  //사진 나열

  const renderItem = ({ item }: any): React.JSX.Element => {
    return (
      <TouchableOpacity
        style={{
          width: (size - 40) / 3,
          height: (size - 40) / 3,
          aspectRatio: 1,
        }}
        onPress={() => {
          if (roomThumbnail) {
            if (roomThumbnail === item.photo_id) {
              setRoomThumbnail(null);
            } else {
              setRoomThumbnail(item.photo_id);
            }
          } else {
            setRoomThumbnail(item.photo_id);
          }
        }}
      >
        <ImageBackground
          // source={{ uri: item.story }}
          source={{ uri: item.photo_url }}
          style={{ width: "100%", height: "100%" }}
        >
          <View
            style={{
              flex: 1,
              ...StyleSheet.absoluteFillObject,

              backgroundColor:
                roomThumbnail === item.photo_id
                  ? "rgba(0, 0, 0, 0.5)"
                  : "rgba(0,0,0,0)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {roomThumbnail === item.photo_id ? (
              <Icon name="checkmark" size={27} color={"white"} />
            ) : null}
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {/* 전시회 이름 끝 */}
      <ScrollView
        style={{ backgroundColor: "black", flex: 1, paddingHorizontal: 20 }}
      >
        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            marginVertical: 15,
            color: "white",
          }}
        >
          Room Title
        </Text>
        <TextInput
          cursorColor={"#FFA800"}
          placeholder="전시실 제목을 입력하세요."
          style={{
            backgroundColor: "white",
            textAlign: "center",
            height: 35,
          }}
          value={roomTitle}
          onChangeText={(text) => setRoomTitle(text)}
        />

        <Text
          style={{
            fontSize: 17,
            fontWeight: "500",
            marginVertical: 15,
            color: "white",
          }}
        >
          Room Description
        </Text>
        <TextInput
          cursorColor={"#FFA800"}
          placeholder="전시회 설명을 입력하세요."
          style={{
            backgroundColor: "white",
            textAlign: "center",
            height: 100,
          }}
          value={roomDescription}
          onChangeText={(text) => setRoomDescription(text)}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            marginVertical: 15,
            gap: 10,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",

              color: "white",
            }}
          >
            Photographs
          </Text>
          <Text
            style={{
              fontSize: 12,
              color: "#c9c9c9",
            }}
          ></Text>
        </View>
        <FlatList
          scrollEnabled={false}
          data={myPhotoData.content}
          renderItem={renderItem}
          keyExtractor={(item) => item.photo_id}
          numColumns={3}
          style={{
            flex: 1,
            backgroundColor: "black",
            marginBottom: 20,
          }}
        />
      </ScrollView>
    </>
  );
};
