import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {screenName} from '../../../navigators/screens-name';
import {responsive} from '../../../ultils/reponsive';
import {navigate} from '../../../navigators/root-navigator';

export interface IFoods {
  address: string;
  desc: string;
  id: string;
  image: string;
  nameFood: string;
  price: number;
  type: string;
  time: string;
}

const ProductList = () => {
  const [dataFoods, setDataFoods] = useState<IFoods[]>([]);

  useEffect(() => {
      getDataFoods();
    }, []);

    
    const getDataFoods = async () => {
        const res = await fetch(
            'https://63ae5ea23e46516916702e14.mockapi.io/foods',
            ).then(response => response.json());
            setDataFoods(res);            
        };     
        
  const renderItems = (item: IFoods, index) => {
      return (
          <TouchableOpacity
          style={styles.item}
          key={index}
          onPress={() => navigate(screenName.DetailProduct, {item})}>
        <Image
          source={{
              uri: item.image,
            }}
            style={styles.itemPhoto}
            resizeMode="cover"
        />
        <View style={styles.viewInfo}>
          <Text style={styles.nameProduct}>{item.nameFood}</Text>
          <Text style={styles.tagName}>
            Tên: <Text style={styles.infoTag}>{item.type}</Text>
          </Text>
          <Text style={styles.tagName}>
            Giá: <Text style={styles.infoTag}>{item.price}</Text>
          </Text>
          <Text style={styles.tagName}>
            Giờ Mở: <Text style={styles.infoTag}>{item.time}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.listView}>
      <View style={styles.headerProduct}>
        <Text style={styles.textHeader}>New Arrivals</Text>
        <TouchableOpacity
          onPress={() => {
            navigate(screenName.ListProduct);
          }}>
          <Text style={styles.textHeader}>View All</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.menu}>

        <View style={{height:1, backgroundColor: "black"}}></View>
          <View style={styles.carol}></View>
          <View style={{height:1, backgroundColor: "black"}}></View>
      </View> */}
      <FlatList
        data={dataFoods}
        renderItem={({item, index}) => renderItems(item, index)}
        numColumns={1}
        showsVerticalScrollIndicator={false}
      />
      
    </View>
  );
};
export default ProductList;

const styles = StyleSheet.create({
  listView: {
    flex: 3,
  },
  headerProduct: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: '600',
  },
  item: {
    backgroundColor: '#E8E5E5C9',
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    height: 120,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 15,
    paddingLeft: 10,
  },
  itemPhoto: {
    height: 100,
    aspectRatio: 1 / 1,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  viewInfo: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  nameProduct: {
    alignSelf: 'center',
    fontWeight: '600',
    fontSize: 18,
    paddingVertical: 5,
    color: '#F6A139',
  },
  tagName: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: 'gray',
    fontWeight: 'bold',
  },
  infoTag: {
    fontSize: 14,
    color: 'black',
  },
//   menu: {
//     height: 80,
//     paddingVertical: 5
// }, 
// carol: {
// flex:1,
// backgroundColor: "red"

// }
});
