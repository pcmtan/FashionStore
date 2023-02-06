import {useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  ViewToken,
  Animated,
} from 'react-native';
import {screenName} from '../../../navigators/screens-name';
import {useSharedValue} from 'react-native-reanimated';
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
  category: string;
}
const ITEM_IMAGE = 100;
const ITEM_PADDING = 10;
const ITEM_MRBottom = 15;
const ITEM_SIZE = ITEM_IMAGE + ITEM_PADDING * 2 + ITEM_MRBottom;

const ProductList = () => {
  const route = useRoute<any>()
  const isCreateProduct = route?.params?.isCreateProduct || false
  console.log("....", route);  
  
  const [dataFoods, setDataFoods] = useState<IFoods[]>([]);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [create, setCreate] = useState(false);

  useEffect(() => {
    getDataFoods();
  }, [isCreateProduct]);

  // useLayoutEffect(()=>{
  //   console.log(123123);
  // }, [])

  const getDataFoods = async () => {
    const res = await fetch(
      'https://63ae5ea23e46516916702e14.mockapi.io/foods',
    ).then(response => response.json());
    setDataFoods(res);
  };

  const renderItems = (item: IFoods, index) => {
    const scale = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)],
      outputRange: [1, 1, 1, 0],
    });
    const opacity = scrollY.interpolate({
      inputRange: [-1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 0.6)],
      outputRange: [1, 1, 1, 0],
    });
    return (
      <Animated.View
        style={{
          transform: [{scale}],
          opacity,
        }}>
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
      </Animated.View>
    );
  };

  return (
    <View style={styles.listView}>
      <View style={styles.headerProduct}>
        <Text style={styles.textHeader}>New Arrivals</Text>
        <TouchableOpacity
          onPress={() => {
            navigate(
              screenName.ListProduct,
              //   {
              //   handleCreate: (text) => handleCreate(text)
              // }
            );
          }}>
          <Text style={styles.textHeader}>View All</Text>
        </TouchableOpacity>
      </View>
      {/* <View style={styles.menu}>

        <View style={{height:1, backgroundColor: "black"}}></View>
          <View style={styles.carol}></View>
          <View style={{height:1, backgroundColor: "black"}}></View>
      </View> */}
      <Animated.FlatList
        data={dataFoods}
        renderItem={({item, index}) => renderItems(item, index)}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollY}}}],
          {useNativeDriver: true},
        )}
      />
    </View>
  );
};
export default ProductList;

const styles = StyleSheet.create({
  listView: {
    flex: 1,
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
    marginBottom: ITEM_MRBottom,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    height: 120,
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 15,
    padding: ITEM_PADDING,
  },
  itemPhoto: {
    height: ITEM_IMAGE,
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
