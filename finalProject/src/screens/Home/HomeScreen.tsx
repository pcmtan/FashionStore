import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import {goBack, navigate} from '../../navigators/root-navigator';
import {screenName} from '../../navigators/screens-name';
import {iconAvatar, iconBack, iconCreate, iconSearched} from '../../url';
import LocalBrand from './LocalBrand/Brand';
import {useFocusEffect, useNavigation, useRoute} from '@react-navigation/native';
import AnimatedTyping from '../../components/AnimationText/AnimationType';
import { getItemStorage } from '../../components/AsyncStorage/AsyncStorage';

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
  imageList: Array<string>
}
const ITEM_IMAGE = 100;
const ITEM_PADDING = 10;
const ITEM_MRBottom = 10;
const ITEM_SIZE = ITEM_IMAGE + ITEM_PADDING * 2 + ITEM_MRBottom;

const HomePage = () => {
  const BG_Image =
    'https://cdn.pixabay.com/photo/2021/08/20/07/13/bird-6559677_1280.jpg';
  const [searchText, setSearchText] = useState('');
  const [dataFoods, setDataFoods] = useState<IFoods[]>([]);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const [refreshControl, setRefreshControl] = useState(true);
  const navigation = useNavigation()

    useEffect(() => {
      getLocalData()
    })
      const getLocalData = () => {
        getItemStorage('email').then(result => {
          let emailLocal = JSON.parse(result || "")
          console.log("valueEmail", emailLocal);
        });
        getItemStorage('password').then(result => {
          let passLocal = JSON.parse(result || "")
          console.log("valuePass", passLocal);
        })
      };  
      
  useEffect(() => {
    const focusData = navigation.addListener('focus', () => {
      getDataFoods()
    });
    return focusData
  },[navigation])

  const getDataFoods = () => {
    return fetch('https://63ae5ea23e46516916702e14.mockapi.io/foods')
      .then(response => response.json())
      .then(responseJson => {
        setDataFoods(responseJson);
        setRefreshControl(false);
      })
      .catch(error => {
        console.log('Error');
      });
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
          onPress={() => navigate(screenName.DetailProduct, {productID: item.id})}>
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

  const ItemSeparatorView = () => {
    return <View style={{height: 5, width: '100%'}} />;
  };
  const onRefresh = () => {
    setDataFoods([])
    getDataFoods()
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{uri: BG_Image}}
        style={StyleSheet.absoluteFillObject}
        blurRadius={40}
      />
      <View style={{flex: 1, marginHorizontal: 20}}>
        <View style={styles.viewHeaderHome}>
          <View style={{flex: 1}}>
            <AnimatedTyping text={["Huế Cuisine"]} textStyle = {styles.textWC1}/>
          </View>
          <TouchableOpacity
            onPress={() => navigate(screenName.ProfileUser)}
            style={styles.user}>
            <Image source={iconAvatar} style={styles.avatarUser} />
          </TouchableOpacity>
        </View>
        <View style={styles.viewSearch}>
          <View style={styles.search}>
            <Image source={iconSearched} />
            <TextInput
              autoCorrect={false}
              value={searchText}
              onChangeText={text => {
                setSearchText(text);
              }}
              placeholderTextColor={'#696969'}
              placeholder="Search..."
              style={styles.input}
            />
          </View>
          <TouchableOpacity
            style={styles.trade}
            onPress={() => navigate(screenName.CreateProduct)}>
            <Image source={iconCreate} style={styles.iconCr} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.viewItem}>
        <View style={{flex: 2}}>
          <LocalBrand />
        </View>
        <View style={styles.viewListProduct}>
          {refreshControl ? (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <View style = {styles.flatlist}>
              <Animated.FlatList
                data={dataFoods}
                renderItem={({item, index}) => renderItems(item, index)}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event(
                  [{nativeEvent: {contentOffset: {y: scrollY}}}],
                  {useNativeDriver: true},
                )}
                ItemSeparatorComponent={ItemSeparatorView}
                refreshControl = {
                  <RefreshControl
                    refreshing = {refreshControl}
                    onRefresh = {onRefresh}
                    />
                }
              />
            </View>
          )}
        </View>
      </View>
      <View style={styles.boxWhite}></View>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  avatarUser: {
    height: 45,
    aspectRatio: 1 / 1,
    borderRadius: 60,
  },
  viewHeaderHome: {
    flex: 1,
    flexDirection: "row",
  },
  user: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  viewItem: {
    flex: 5,
    marginHorizontal: 20
  },
  textWC1: {
    fontSize: 22,
    fontWeight: "800",
    paddingVertical: 5,
    color: "#191970"
  },
  viewSearch: {
    flexDirection: "row",
    marginVertical: 10,
  },
  search: {
    flex: 4,
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth:1
  },
  trade: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  input: {
    paddingLeft: 10,
    borderRadius: 100,
    fontWeight: "500",
  },
  boxWhite: {
    width: "100%",
    height: 40,
  },
  iconCr: {
    height: 50,
    aspectRatio: 1 / 1,
  },
  viewListProduct: {
    flex: 5,
  },
  flatlist: {
    marginVertical:20
  },
  item: {
    backgroundColor: "#c0c0c0",
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
  },
  tagName: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    fontWeight: "bold",
  },
  infoTag: {
    fontSize: 14,
    // paddingLeft:10,
    color: "#800000",
  },
});
