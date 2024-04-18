import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Carga from './Component/Carga';
import Carrusel from './Component/Carrusel';


const App = () => {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoad(true);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  const carrusel = load ? <Carrusel /> : '';

  const styles = StyleSheet.create({
    container: {
      headerShown: true,
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  const carga = true ? <Carga/> : '';

  return (
    <View style={styles.container}>
      {carga}
      {carrusel}
    </View>
     
  );
};

export default App;