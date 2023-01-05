import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Image, FlatList} from 'react-native';

const ListItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Image
          source={{
            uri: item.image,
          }}
          style={styles.itemPhoto}
          resizeMode="cover"
        />
      </View>
    );
  };

  export interface ILocal {
    name: string;
    avatar: string;
  }

const LocalBrand = () => {
  const [dataLocal, setDataLocal] = useState<ILocal[]>([])

  useEffect(() => {
    getDataLocal()
  },[])

  const getDataLocal = async () => {
    const res = await fetch(
      'https://63ae5ea23e46516916702e14.mockapi.io/local'
    ).then(response => response.json())
    setDataLocal(res)
  }

  return (
    <View style = {{flex:1, marginVertical:10}}>
      <FlatList
        horizontal
        data={dataLocal}
        renderItem={({item}) => <ListItem item={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
export default LocalBrand;
const styles = StyleSheet.create({
  item: {
    marginRight: 15,
  },
  itemPhoto: {
    width: 250,
    height: 150,
    borderRadius: 15,
  }
});
