import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  RefreshControl,
  Animated,
  ActivityIndicator,
} from 'react-native';
import HeaderNavigation from '../../components/Header/Header';
import { goBack, navigate } from '../../navigators/root-navigator';
import { homeTab, iconBack } from '../../url';
import { responsive } from '../../ultils/typeS/reponsive';
import { screenName } from '../../navigators/screens-name';
import { getItemStorage } from '../../components/AsyncStorage/AsyncStorage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

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

const ITEM_IMAGE = 120;
const ITEM_PADDING = 10;
const ITEM_MRBottom = 15;
const ITEM_SIZE = ITEM_IMAGE - 30 + ITEM_PADDING * 2 + ITEM_MRBottom;

export const FavoriteProduct = () => {
  const [refreshControl, setRefreshControl] = useState(true);
  const [favorite, setFavorite] = useState<IFoods[]>([]);
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation()
  const BG_Image ='https://cdn.pixabay.com/photo/2021/08/20/07/13/bird-6559677_1280.jpg';
  
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
          <Text style={styles.textHeader}>My Favorite</Text>
        </View>
      );
    };
    const HeaderRight = () => {
      return (
        <TouchableOpacity
          style={[styles.containerHeader, { alignItems: 'flex-end' }]}
          onPress={() => {
            navigate(screenName.HomePage);
          }}>
          <Image source={homeTab} style={{ height: 50, aspectRatio: 1 / 1 }} />
        </TouchableOpacity>
      );
    };

    const onRefresh = () => {
      getDataFavorite()
    };

    useEffect(() => {
      const focusData = navigation.addListener('focus', () => {
        getDataFavorite()
        console.log("here 1");
      });
      return focusData
    }, [navigation])    

  const getDataFavorite = () => {
    return fetch(
      'https://63ae5ea23e46516916702e14.mockapi.io/foods',
    )
      .then(response => response.json())
      .then(responseJson => {
        getItemStorage('itemFavorite').then(result => {
          let items = JSON.parse(result || '[]');
          console.log("result", result);
          let favoriteData: IFoods[] = [];
          if (items) {
            responseJson.forEach(data => {
              if (items.includes(data.id)) {
                favoriteData.push(data);
              }
            });
            setFavorite(favoriteData);   
          }
          setRefreshControl(false);
        });
      })
      .catch(error => {
        console.log('Error');
      })
  }

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
          transform: [{ scale }],
          opacity,
        }}>
        <TouchableOpacity
          style={styles.viewItem}
          key={index}
        onPress={() => navigate(screenName.DetailProduct, {productID : item.id})}
        >
          <View style={styles.shadowImg}>
            <Image
              source={{
                uri: item.image,
              }}
              style={styles.itemPhoto}
              resizeMode="cover"
            />
          </View>
          <View style={styles.viewInfo}>
            <Text style={styles.nameProduct}>{item.nameFood}</Text>
            <Text style={styles.infoTag}>{item.type}</Text>
            <Text style={styles.infoTag}>{item.price} VND</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{ uri: BG_Image }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={40}
      />
      {refreshControl ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <>
          <HeaderNavigation
            childrenLeft={<HeaderLeft />}
            childrenMiddle={<HeaderMiddle />}
            childrenRight={<HeaderRight />}
          />
          <View style={styles.item}>
            <Animated.FlatList
              data={favorite}
              renderItem={({ item, index }) => renderItems(item, index)}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true },
              )}
              refreshControl={
                <RefreshControl
                  refreshing={refreshControl}
                  onRefresh={onRefresh}
                />
              }
            />
          </View>
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  textHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  viewItem: {
    width: (responsive.WIDTH - 10) / 2 - 2 * 6,
    backgroundColor: "#ffdab9",
    marginHorizontal: 4,
    marginBottom: ITEM_MRBottom,
    padding: ITEM_PADDING,
    borderRadius: 20,
    shadowColor: "#ffa500",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.5,
  },
  item: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  itemPhoto: {
    height: ITEM_IMAGE,
    aspectRatio: 1 / 1,
    borderRadius: 100,
    resizeMode: "cover",
    alignSelf: "center",
  },
  shadowImg: {
    shadowColor: "#800000",
    shadowOffset: {
      width: 2,
      height: 8,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.5,
  },
  viewInfo: {
    // marginHorizontal: 5,
    marginVertical: 8,
  },
  nameProduct: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
    paddingVertical: 5,
    color: "#663399",
  },
  infoTag: {
    fontSize: 14,
    color: "black",
    alignSelf: "center",
  },
});
