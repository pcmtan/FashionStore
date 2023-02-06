import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  TextInput,
  Animated,
  RefreshControl,
  ScrollView,
  SectionList,
  ActivityIndicator,
} from 'react-native';

import HeaderNavigation from '../../components/Header/Header';
import { goBack, navigate } from '../../navigators/root-navigator';
import { screenName } from '../../navigators/screens-name';
import { iconAdd, iconBack, iconCreate, iconSearched } from '../../url';
import AnimatedTyping from '../../components/AnimationText/AnimationType';
import { useNavigation } from '@react-navigation/native';


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
const ITEM_MRBottom = 10;

const ListProduct = () => {
  const [searchText, setSearchText] = useState('');
  const [refreshControl, setRefreshControl] = useState(true);
  const [dataFoods, setDataFoods] = useState<IFoods[]>([]);
  const [dataBackup, setDataBackup] = useState<IFoods[]>([]);
  const navigation = useNavigation()

  // Section
  const [bunFoods, setBunFoods] = useState<IFoods[]>([]);
  const [banhFoods, setBanhFoods] = useState<IFoods[]>([]);
  const [comFoods, setComFoods] = useState<IFoods[]>([]);
  const [chayFoods, setChayFoods] = useState<IFoods[]>([]);
  const [cheFoods, setCheFoods] = useState<IFoods[]>([]);

  const getDataCategory = () => {
    let bunFoodsList: IFoods[] = [];
    let banhFoodsList: IFoods[] = [];
    let comFoodsList: IFoods[] = [];
    let chayFoodsList: IFoods[] = [];
    let cheFoodsList: IFoods[] = [];

    for (let index = 0; index < dataFoods.length; index++) {
      if (dataFoods[index].category == 'Bún') {
        bunFoodsList.push(dataFoods[index]);
      } else if (dataFoods[index].category == 'Bánh') {
        banhFoodsList.push(dataFoods[index]);
      } else if (dataFoods[index].category == 'Cơm') {
        comFoodsList.push(dataFoods[index]);
      } else if (dataFoods[index].category == 'Chay') {
        chayFoodsList.push(dataFoods[index]);
      } else if (dataFoods[index].category == 'Chè') {
        cheFoodsList.push(dataFoods[index]);
      } else {
        console.log('No Category');
      }
    }
    setBunFoods(bunFoodsList);
    setBanhFoods(banhFoodsList);
    setComFoods(comFoodsList);
    setChayFoods(chayFoodsList);
    setCheFoods(cheFoodsList);
  };

  useEffect(() => {
    const focusData = navigation.addListener('focus', () => {
      getDataFoods()
    });
    return focusData
  }, [navigation]);

  useEffect(() => {
    getDataCategory();
  }, [dataFoods]);

  useEffect(() => {
    if (searchText == '') {
      setDataFoods(dataBackup);
    }
  }, [searchText]);

  const BG_Image =
    'https://cdn.pixabay.com/photo/2021/08/20/07/13/bird-6559677_1280.jpg';

  const HeaderMiddle = () => {
    return (
      <View style={styles.containerHeader}>
        <Text style={styles.text}>Danh Sách</Text>
      </View>
    );
  };

  const getDataFoods = () => {
    return fetch('https://63ae5ea23e46516916702e14.mockapi.io/foods')
      .then(response => response.json())
      .then(responseJson => {
        setDataFoods(responseJson);
        setDataBackup(responseJson);
        setRefreshControl(false);
      })
      .catch(error => {
        console.log('Error');
      });
  };

  const filterFood = text => {
    if (text) {
      let searchData = dataFoods.filter(item => {
        return item.nameFood.toLowerCase().includes(text.toLowerCase());
      });
      setDataFoods(searchData);
      setSearchText(text);
    } else {
      setDataFoods(dataFoods);
      setSearchText(text);
    }
  };

  const Category = (item: IFoods, index) => {
    return (

      <TouchableOpacity
        style={styles.item}
        key={index}
        onPress={() => navigate(screenName.DetailProduct, { productID: item.id })}>
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

  const ItemSeparatorView = () => {
    return <View style={{ height: 1, width: '100%' }} />;
  };
  const onRefresh = () => {
    setDataFoods([]);
    getDataFoods();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: BG_Image }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={40}
      />
      <HeaderNavigation
        childrenMiddle={<HeaderMiddle />}
      />
      {refreshControl ? (
        <View style={styles.refControl}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <>
        <View style={styles.viewList}>
          <View style={styles.viewSearch}>
            <View style={styles.search}>
              <Image source={iconSearched} />
              <TextInput
                autoCorrect={false}
                value={searchText}
                onChangeText={text => {
                  filterFood(text);
                }}
                placeholderTextColor={'#696969'}
                placeholder="Search..."
                style={styles.input}
              />
            </View>
            <TouchableOpacity
              style={styles.add}
              onPress={() => navigate(screenName.CreateProduct)}>
              <Image source={iconCreate} style={styles.iconCr} />
            </TouchableOpacity>
          </View>
          <SectionList
            ItemSeparatorComponent={ItemSeparatorView}
            sections={[
              { title: 'Bún', data: bunFoods },
              { title: 'Bánh', data: banhFoods },
              { title: 'Cơm', data: comFoods },
              { title: 'Đồ Chay', data: chayFoods },
              { title: 'Chè', data: cheFoods },
            ]}
            renderSectionHeader={({ section }) => (
              <View style={styles.sectionHeaderStyle}>
                <AnimatedTyping text={[section.title]} textStyle={styles.textHeaderSection} />
              </View>
            )}
            renderItem={({ item, index }) => Category(item, index)}
            refreshControl={
              <RefreshControl refreshing={refreshControl} onRefresh={onRefresh} />
            }
          />
        </View>
        <View style={styles.boxWhite}></View>
        </>
      )}
    </SafeAreaView>
  );
};
export default ListProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewSearch: {
    flexDirection: "row",
    marginVertical: 10,
  },
  refControl: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    flex: 4,
    // backgroundColor: "#d3d3d3",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
  },
  iconCr: {
    height: 50,
    aspectRatio: 1 / 1,
  },
  add: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 5,
  },
  input: {
    paddingLeft: 10,
    borderRadius: 100,
    fontWeight: "500",
  },
  headerCategory: {
    // marginHorizontal:10,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "gray",
    width: "50%",
    borderRadius: 10,
  },
  viewList: {
    flex: 1,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "800",
  },
  containerHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  headerProduct: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  textHeader: {
    fontSize: 18,
    fontWeight: "600",
  },
  item: {
    backgroundColor: "#E8E5E5C9",
    marginBottom: ITEM_MRBottom,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    height: 120,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 15,
    padding: ITEM_PADDING,
  },
  itemPhoto: {
    height: ITEM_IMAGE,
    aspectRatio: 1 / 1,
    borderRadius: 10,
    resizeMode: "cover",
  },
  viewInfo: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  nameProduct: {
    alignSelf: "center",
    fontWeight: "600",
    fontSize: 18,
    paddingVertical: 5,
    color: "red",
  },
  tagName: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: "gray",
    fontWeight: "bold",
  },
  infoTag: {
    fontSize: 14,
    color: "black",
  },
  boxWhite: {
    width: "100%",
    height: 80,
  },

  sectionHeaderStyle: {
    backgroundColor: "#f4a460",
    marginVertical: 8,
    borderRadius: 15,
  },
  textHeaderSection: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 15,
    marginVertical: 5,
    color: "#FFFFFF",
  }
});
