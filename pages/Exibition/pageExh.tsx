import React, { useState, useRef, useEffect } from "react";

//요소
import {
  Alert,
  Image,
  Text,
  KeyboardAvoidingView,
  View,
  Platform,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions,
  ActivityIndicator as Spinner,
  ScrollView,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Random from "./random";
import Icon from "react-native-vector-icons/Ionicons";

//animation
import { Extrapolate, interpolate } from "react-native-reanimated";
import { NavBar, SvgType } from "../../components/navbar";

import Carousel from "react-native-reanimated-carousel";

//Redux
import { useSelector } from "react-redux";
import { State } from "../../storage/reducers";

//api
import axios from "axios";
import { SERVER_IP } from "../../components/utils";

//navigation
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Exhibition: {
    exhibition_id: string;
    title: string;
    description: string;
    thumbnail: string;
    profile_img: string;
    nickname: string;
    user_id: string;
  };
};
const PageExhibition: React.FC = () => {
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  //Cube Animation
  const animationStyle: any = React.useCallback(
    (value: number) => {
      "worklet";
      const zIndex = interpolate(value, [-1, 0, 1], [-1200, 0, -1200]);

      const rotateY = `${interpolate(
        value,
        [-1, 0, 1],
        [-90, 0, 90],
        Extrapolate.CLAMP
      )}deg`;

      const perspective = 1000;

      const transform = {
        transform: [
          { perspective },
          { rotateY },
          { translateX: value * width },
        ],
      };

      return {
        ...transform,
        zIndex,
      };
    },
    [height, width]
  );

  //Start Logics-------------------------------------------------------------------------------

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  //리덕스 유저 아이디 가져오기`
  const userId = useSelector((state: State) => state.USER);
  useEffect(() => {
    getRandom();
  }, []);

  //getRandom function
  const [exhibitionData, setExhibitionData] = useState<Array<object>>([]);
  const getRandom = async () => {
    try {
      const responses = await Promise.all([
        axios.get(`${SERVER_IP}core/exhibitions/random`),
        axios.get(`${SERVER_IP}core/exhibitions/random`),
        axios.get(`${SERVER_IP}core/exhibitions/random`),
      ]);

      const newExhibitionData = responses.map((response) => response.data);
      setExhibitionData([...exhibitionData, ...newExhibitionData]);
    } catch (e) {
      console.log(e);
    }
  };
  //현재 데이터 인덱스
  const [now, setNow] = useState<number>(0);
  const [auto, setAuto] = useState<boolean>(true);

  const [enabled, setEnabled] = useState<boolean>(true);

  const handleVisit = () => {
    const currentExhibition = exhibitionData[now];
    if (currentExhibition) {
      navigation.push("Exhibition", {
        exhibition_id: currentExhibition.exhibition_id,
        title: currentExhibition.title,
        description: currentExhibition.description,
        thumbnail: currentExhibition.thumbnail,
        profile_img: currentExhibition.profile_img,
        nickname: currentExhibition.nickname,
        user_id: currentExhibition.user_id,
      });
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "black",
      }}
    >
      <ExpoStatusBar style="dark" />
      {exhibitionData.length > 0 ? (
        <Carousel
          width={width}
          height={height - 70 - 49}
          autoPlay={auto}
          autoPlayInterval={2000}
          data={exhibitionData}
          loop={false}
          snapEnabled={false}
          enabled={enabled}
          overscrollEnabled={false}
          onSnapToItem={(index) => setNow(index)}
          scrollAnimationDuration={500}
          customAnimation={animationStyle}
          // onSnapToItem={(index) => console.log("current index:", index)}
          renderItem={({ item, index }: any) => (
            <Random
              exhibition_id={item.exhibition_id}
              title={item.title}
              description={item.description}
              thumbnail={item.thumbnail}
              profile_img={item.profile_img}
              nickname={item.nickname}
              user_id={userId}
            />
          )}
        />
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "black",
          }}
        >
          <Spinner size="large" color="white" />
        </View>
      )}

      {/* 밑에 버튼 시작 */}

      {exhibitionData.length > 0 && (
        <>
          <View
            style={{
              position: "absolute",
              bottom: Platform.OS === "ios" ? 130 : 100,
              width: "100%",
              alignItems: "center",
            }}
          >
            <TouchableOpacity style={styles.button} onPress={handleVisit}>
              <Text style={styles.buttonText}>Visit</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              backgroundColor: "white",
              position: "absolute",
              top: 20,
              right: 20,
              paddingVertical: 6,
              paddingHorizontal: 15,
              borderRadius: 20,
            }}
            onPress={() => {
              setAuto(!auto);
            }}
          >
            {auto ? (
              <Icon name="pause-sharp" size={27} color={"black"} />
            ) : (
              <Icon name="play" size={27} color={"black"} />
            )}
          </TouchableOpacity>
          {/* 밑에 버튼 끝 */}
        </>
      )}

      <NavBar type={SvgType.Exibition} />
    </SafeAreaView>
  );
};

export default PageExhibition;

const styles = StyleSheet.create({
  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "500",
    letterSpacing: 1,
  },
});
