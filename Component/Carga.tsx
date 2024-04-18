import React, { useEffect } from 'react';
import { View, Text, Image, StatusBar, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    const splashScreenHide = setTimeout(() => {
      SplashScreen.hide();
    }, 6000);

    return () => {
      clearTimeout(splashScreenHide);
    };
  }, []);

  const styles = StyleSheet.create({
    textColor: {
      color: '#89C2D9',
      fontSize: 39,
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F9FCFD',
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#89C2D9" hidden={false} />
      <Text style={styles.textColor}>AIRE</Text>
      <Image style={{ width: 100, height: 116 }} source={require("../imagenes/gob1.png")} />
    </View>
   );
};

export default App;