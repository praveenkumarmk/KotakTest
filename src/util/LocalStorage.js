import { AsyncStorage } from "react-native";

export async function storeData(key, userData) {
    try {
      await AsyncStorage.setItem(
        key,
        userData
      );
    } catch (error) {
      // Error saving data
    }
  };

  export async function retrieveData(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        // We have data!!
        console.log(value);
        return value;
      }
    } catch (error) {
      // Error retrieving data
    }
  };