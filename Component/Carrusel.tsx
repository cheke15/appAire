import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  SafeAreaView,
  Animated,
} from "react-native";

const Imagenes = [
  require('../imagenes/img1.png'),
  require('../imagenes/img2.png'),
  require('../imagenes/img3.png')
];

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const ANCHO_CONTENEDOR = width * 0.6;
const ESPACIO_CONTENEDOR = (width - ANCHO_CONTENEDOR) /3 ;
const ESPACIO = 5;
const ALTURA_BACKDROP = height * 800;

function Backdrop({ scrollX }) {


  return (
    <View
      style={{
        position: "absolute",
        backgroundColor: "#89C2D9",
        height: ALTURA_BACKDROP,
        top: 9,
        width: width,
      }}
    >
      {Imagenes.map((imagen, index) => {
        const inputRange = [
          (index - 2) * ANCHO_CONTENEDOR,
          index * ANCHO_CONTENEDOR,
          (index + 2) * ANCHO_CONTENEDOR,
        ];

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0, 0, 0],
        });

        return (
          <Animated.Image
            key={index}
            source={imagen}
            style={[
              { width: width, height: ALTURA_BACKDROP, opacity },
              StyleSheet.absoluteFillObject,
            ]}
          />
        );
      })}
    </View>
  );
}

export default function Carrusel() {
  const scrollX = React.useRef(new Animated.Value(50)).current;

  return (
    <SafeAreaView style={styles.container}>
      <Backdrop scrollX={scrollX} />

      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        data={Imagenes}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        snapToAlignment="start"
        contentContainerStyle={{
          paddingTop: 20,
          paddingHorizontal: ESPACIO_CONTENEDOR,
        }}
        snapToInterval={ANCHO_CONTENEDOR}
        decelerationRate={0}
        scrollEventThrottle={10}
        keyExtractor={(item) => item}
        renderItem={({ item, index }) => {
          const inputRange = [
            (index - 1) * ANCHO_CONTENEDOR,
            index * ANCHO_CONTENEDOR,
            (index + 1) * ANCHO_CONTENEDOR,
          ];

          const scrollY = scrollX.interpolate({
            inputRange,
            outputRange: [0, 0, 0],
          });
          return (
            <View style={{ width: ANCHO_CONTENEDOR }}>
              <Animated.View
                style={{
                  marginHorizontal: ESPACIO,
                  padding: ESPACIO,
                  borderRadius: 10,
                  backgroundColor: "#89C2D9",
                  alignItems: "center",
                  transform: [{ translateY: scrollY }],
                }}
              >
                <Image source={item} style={styles.posterImage} />
                <Text style={{ fontWeight: "bold", fontSize: 30 }}>
                  {" "}
                  hola pichancha
                </Text>
              </Animated.View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 56,
    backgroundColor: "#89C2D9",
    justifyContent: "center",
  },
  posterImage: {
    width: "100%",
    height: ANCHO_CONTENEDOR * 1.5,
    resizeMode: "cover",
    borderRadius: 10,
    margin: 0,
    marginBottom: 50,
  },
});