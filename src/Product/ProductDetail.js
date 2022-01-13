import React, { useState, useCallback, useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
import YoutubePlayer from "react-native-youtube-iframe";
import { USER_NAME } from '../util/Constant';
import { retrieveData } from '../util/LocalStorage';

function productDetail({ route }) {
  const [playing, setPlaying] = useState(false);
  const [userName, setUserName] = useState(false);


  useEffect(() => {
    retrieveData(USER_NAME).then((userName) => {
      setUserName(userName)
    })
  }, []);
  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);
  const { productDetail } = route.params;
  return(
    <View style={styles.container}>
      <Text style={{ color: "red", fontSize: 20, textAlign: 'center', paddingBottom: 20 }}>
        User Name: {userName}
      </Text>
      <View style={styles.listItem}>
      <View style={styles.rowStyle}>
        <Text>Product Name: </Text>
        <Text>{productDetail.productName}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Price: </Text>
        <Text>{productDetail.price}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>CPU: </Text>
        <Text>{productDetail.cpu}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>RAM: </Text>
        <Text>{productDetail.ram}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Storage: </Text>
        <Text>{productDetail.storage}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Screen: </Text>
        <Text>{productDetail.screen}</Text>
      </View>
      <View style={styles.rowStyle}>
        <Text>Video Link: </Text>
        <Text style={{width: 180}}>{productDetail.video}</Text>
      </View>
      <YoutubeIframe
        height={300}
        play={playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    paddingTop: 10,
    flex: 1,
    borderColor: 'gray'
  },
  listItem: {
    backgroundColor: "#F7F1F0",
    borderWidth: .5,
    borderColor: "#00000",
    padding: 10,
    justifyContent: 'space-around'
  },
  rowStyle: {
    padding: 10, 
    flexDirection: 'row'
  }

});

export default productDetail;