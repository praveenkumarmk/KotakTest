import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { USER_NAME, CART_DATA } from '../util/Constant';
import { retrieveData, storeData } from "../util/LocalStorage";

let cartData = [];
function CartProductDetail({ navigation }) {
  const [productDetails, setProductDetails] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    retrieveData(USER_NAME).then((userName) => {
      setUserName(userName)
    });
    retrieveData(CART_DATA).then((cartData) => {
      setProductDetails(JSON.parse(cartData))
      cartData = JSON.parse(cartData);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }}>

        <Text style={{ color: "red", fontSize: 20, textAlign: 'center', paddingBottom: 20 }}>
          User Name: {userName}
        </Text>
      </View>
        <FlatList
          data={productDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(productDetail, index) => {
            return (
              <View style={styles.listItem}>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }}>
                  <Text style={styles.text}>{productDetail.item.productName}</Text>
                  <Text style={styles.text}>₹ {productDetail.item.price}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly" }}>
                  <Button
                    title="Detail"
                    onPress={() => productDetailPage(productDetail.item)}
                  />
                  {/* <Button
                    title="Remove cart"
                    onPress={() => removeCart(productDetail)}
                  /> */}
                </View>
              </View>
            );
          }}
        />
    </View>
  )

  function productDetailPage(productDetail) {
    navigation.navigate('productDetail', {
      "productDetail": productDetail
    });
  }

  function removeCart(item) {
    alert('Item Removed from cart>>>>>>>>'+ Number(item.index));
    const data = productDetails.splice(Number(item.index), 1);
    alert(JSON.stringify(data));
    setProductDetails(data)
    storeData(CART_DATA, data);
  }

}
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    paddingTop: 10,
  },
  listItem: {
    backgroundColor: "#F7F1F0",
    borderWidth: .5,
    borderColor: "#00000",
    padding: 10,
  },
  text: {
    fontSize: 12,
    padding: 8
  },
});

export default CartProductDetail;