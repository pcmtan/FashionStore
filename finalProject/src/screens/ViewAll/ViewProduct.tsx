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
} from 'react-native';
import HeaderNavigation from '../../components/Header/Header';
import { goBack, navigate } from '../../navigators/root-navigator';
import { screenName } from '../../navigators/screens-name';
import { iconAdd, iconBack, iconSearched } from '../../url';

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
const ListProduct = () => {
  const [searchText, setSearchText] = useState('');
  const [dataFoods, setDataFoods] = useState<IFoods[]>([]);
  const [dataBackup, setDataBackup] = useState<IFoods[]>([]);
  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={[styles.containerHeader, { alignItems: 'flex-start' }]}
        onPress={goBack}>
        <Image source={iconBack} />
      </TouchableOpacity>
    );
  };
  const HeaderMiddle = () => {
    return (
      <View style={styles.containerHeader}>
        <Text style={styles.text}>Menu</Text>
      </View>
    );
  };

  useEffect(() => {
    getDataFoods();
  }, []);

  useEffect(() => {
    if (searchText == "") {
      setDataFoods(dataBackup)
      console.log("111");
    }
  }, [searchText])

  const getDataFoods = async () => {
    const res = await fetch(
      'https://63ae5ea23e46516916702e14.mockapi.io/foods',
    ).then(response => response.json());
    setDataFoods(res);
    setDataBackup(res)
  };

  const filterFood = (text) => {
    if (text) {
      let searchData = dataFoods.filter((item) => {
        return item.nameFood.toLowerCase().includes(text.toLowerCase());
      })
      setDataFoods(searchData);
      setSearchText(text);
    } else {
      setDataFoods(dataFoods);
      setSearchText(text);
    }
  };

  const renderItems = (item: IFoods, index) => {
    return (
      <TouchableOpacity
        style={styles.item}
        key={index}
        onPress={() => navigate(screenName.DetailProduct, { item })}>
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
    <SafeAreaView style={styles.container}>
      <HeaderNavigation
        childrenLeft={<HeaderLeft />}
        childrenMiddle={<HeaderMiddle />}
      />
      <View style={styles.viewList}>
        <View style={styles.viewSearch}>
          <View style={styles.search}>
            <Image source={iconSearched} />
            <TextInput
              autoCorrect={false}
              value={searchText}
              onChangeText={(text) => {
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
            <Image source={iconAdd} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={dataFoods}
          renderItem={({ item, index }) => renderItems(item, index)}
          numColumns={1}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};
export default ListProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  viewSearch: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  search: {
    flex: 4,
    backgroundColor: '#d3d3d3',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
  },
  add: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  input: {
    paddingLeft: 10,
    borderRadius: 100,
    fontWeight: '500',
  },
  viewList: {
    marginTop: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: '800',
  },
  containerHeader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
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
    elevation: 5,
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
});
