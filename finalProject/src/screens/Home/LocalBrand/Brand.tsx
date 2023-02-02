import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

export interface ILocal {
  name: string;
  image: string;
}



const LocalBrand = () => {
  const width = Dimensions.get('window').width;
  const widthImg = width - 40
  const [dataLocal, setDataLocal] = useState<ILocal[]>([])

  const ListItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Image
          source={{
            uri: item.image,
          }}
          style={[styles.itemPhoto, { width: widthImg }]}
          resizeMode="cover"
        />
      </View>
    );
  };

  useEffect(() => {
    getDataLocal()
  }, [])

  const getDataLocal = () => {
    return fetch(
      'https://63ae5ea23e46516916702e14.mockapi.io/local'
    ).then(response => response.json())
      .then(responseJson => {
        setDataLocal(responseJson)
      })
  };

  return (
    <View style={{ flex: 1, marginVertical: 10 }}>
      <Carousel
        loop
        width= {width - 20}
        autoPlay={true}
        data={dataLocal}
        scrollAnimationDuration={4000}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.item} key={index}>
              <Image
                source={{
                  uri: item.image,
                }}
                style={[styles.itemPhoto, { width: widthImg }]}
                resizeMode="cover"
                />
            </View>
          )
        }}
      />
    </View>
  );
};
export default LocalBrand;
const styles = StyleSheet.create({
  item: {
    marginRight: 15,
    flex:1,
    alignSelf: "center"
  },
  itemPhoto: {
    flex: 1,
    borderRadius: 15,
  }
});
