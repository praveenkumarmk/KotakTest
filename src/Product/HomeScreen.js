import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { USER_NAME, CART_DATA } from '../util/Constant';
import { retrieveData, storeData } from "../util/LocalStorage";

function HomeScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [productDetails, setProductDetails] = useState([]);
  const [userName, setUserName] = useState("");

  let cartData = [];
  const getProducts = async () => {
    try {
      const response = await fetch('https://mocki.io/v1/d46dc365-f752-46ee-b0cd-c136aec38e00');
      const json = await response.json();
      setProductDetails(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    retrieveData(USER_NAME).then((userName) => {
      setUserName(userName)
    });
    retrieveData(CART_DATA).then((data) => {
      cartData = JSON.parse(data);
    });
    getProducts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
        <Text style={{ color: "red", fontSize: 20, textAlign: 'center', paddingBottom: 20 }}>
          User Name: {userName}
        </Text>
        <Button
          title="Go to Cart"
          onPress={() => goToCart()}
        />
      </View>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={productDetails}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(productDetail) => {
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
                  <Button
                    title="Add to cart"
                    onPress={() => addToCart(productDetail.item)}
                  />
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  )

  function productDetailPage(productDetail) {
    navigation.navigate('productDetail', {
      "productDetail": productDetail
    });
  }

  function addToCart(productDetail) {
    alert('Item Added to Cart');
    cartData.push(productDetail);
    storeData(CART_DATA, JSON.stringify(cartData));
  }


  function goToCart() {
    if (cartData.length == 0) {
      alert("Cart is empty");
      return;
    }
    navigation.navigate('cartProductDetail');
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

export default HomeScreen;