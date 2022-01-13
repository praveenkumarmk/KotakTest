import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import App from './App'
import { USER_NAME } from './src/util/Constant';
import { retrieveData } from './src/util/LocalStorage';

function Root() {
  const [initialPage, setInitialPage] = useState("login");

  useEffect(() => {
    retrieveData(USER_NAME).then((userName) => {
      if (userName) {
        setInitialPage("home");
      }
    })
  })
  return (
    <App initialPage={initialPage}/>
  )
}

export default Root;
