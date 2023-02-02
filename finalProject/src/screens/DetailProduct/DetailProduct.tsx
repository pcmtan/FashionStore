import React, { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  FlatList,
  Animated,
} from 'react-native';
import { goBack, navigate } from '../../navigators/root-navigator';
import HeaderNavigation from '../../components/Header/Header';
import { iconStar, iconBack, iconHeart, iconHeaderRed } from '../../url';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { screenName } from '../../navigators/screens-name';
import { getItemStorage, setItemStorage } from '../../components/AsyncStorage/AsyncStorage';
// redux
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-community/async-storage';
import { showSuccess, showWarning } from '../../ultils/typeS/helperFunc';

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
  imageList: Array<string>;
}

const DetailProduct = () => {
  const route = useRoute<any>();
  const windowWidth = Dimensions.get('window').width;
  const { productID } = route.params;
  const [detailFood, setDetailFood] = useState<IFoods>();
  const [favoriteItem, setFavoriteItem] = useState();
  const [heart, setHeart] = useState<boolean>(false);
  const [refreshControl, setRefreshControl] = useState(true);
  const navigation = useNavigation()
  const BG_Image =
    'https://cdn.pixabay.com/photo/2021/08/20/07/13/bird-6559677_1280.jpg';

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={[styles.containerHeader, { alignItems: 'flex-start' }]}
        onPress={goBack}>
        <Image source={iconBack} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const focusData = navigation.addListener('focus', () => {
      getDataFoods()
      checkItemFavorite(productID)
    });
    return focusData
  },[navigation])


  const HeaderRight = () => {
    return (
      <TouchableOpacity
        style={[styles.containerHeader, { alignItems: 'flex-end' }]}
        onPress={() => {
          if (heart == false) {
            setHeart(true);
            addItemToFavorite(productID)
          } else {
            setHeart(false);
            deleteFavorite(productID)
          }
        }}>
        <Image source={heart ? iconHeaderRed : iconHeart} />
      </TouchableOpacity>
    );
  };

  const getDataFoods = () => {
    return fetch(
      'https://63ae5ea23e46516916702e14.mockapi.io/foods/' + productID,
    )
      .then(response => response.json())
      .then(responseJson => {
        setDetailFood(responseJson);
        setFavoriteItem(responseJson);
        setRefreshControl(false);
      })
      .catch(error => {
        console.log('Error');
      });
  };

// add to cart
  const addToCart = async id => {
    getItemStorage('cartItems').then(result => {
      let itemArray = JSON.parse(result || '[]')
      console.log("item Add To Cart", itemArray);
      if (itemArray != undefined) {
        let array = itemArray
        let newArray = array.some(item => item == id)
        if(newArray == true){
          showSuccess('Sản Phẩm Đã Tồn Tại')
          
        }else{
          array.push(id)
            try {
              setItemStorage('cartItems',array)
              showSuccess('Thêm Thành Công');
            } catch (error) {
              console.log("error");
            }
        }
      } else {
        let array: Array<string> = []
        array.push(id)
        try {
          setItemStorage('cartItems',array)
          showSuccess('Thêm Thành Công');
        } catch (error) {
          console.log("error");
        }
      }
    })
  };

// Favorite
  const addItemToFavorite = id => {
    getItemStorage('itemFavorite').then(result => {
      let itemArray = JSON.parse(result || '[]')
      if (itemArray != undefined) {
        let array = itemArray
        array.push(id)
        try {
          setItemStorage('itemFavorite',array)
          showSuccess('Đã Yêu Thích');
        } catch (error) {
          console.log("error");
        }
        console.log("12345", array);
      } else {
        let array: Array<string> = []
        array.push(id)
        try {
          setItemStorage('itemFavorite', array)
          showSuccess('Đã Yêu Thích');
        } catch (error) {
          console.log("error");
        }
      }
    })
  }
  const checkItemFavorite = async id => {
    getItemStorage('itemFavorite').then(item => {
      let itemArray = JSON.parse(item || '[]')
      if(itemArray != undefined){
        let array = itemArray.some(item => item == id)
          if(array == true){
            setHeart(true)
          }else{
            setHeart(false);
          }
      }
    })
  }

  const deleteFavorite = async id => {
    getItemStorage('itemFavorite').then(result => {
      let item = JSON.parse(result || '[]');
      if (item != undefined) {
        let newArray = item.filter(item => !id.includes(item))
        setItemStorage('itemFavorite',newArray)
        showWarning('Đã Xóa Khỏi Danh Sách Yêu Thích')
        getDataFoods()
      }
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      {refreshControl ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <>
          <Image
            source={{ uri: BG_Image }}
            style={StyleSheet.absoluteFillObject}
            blurRadius={40}
          />
          <View style={styles.headerAction}>
            <HeaderNavigation
              childrenLeft={<HeaderLeft />}
              childrenRight={<HeaderRight />}
            />
          </View>
          <View style={{ flex: 2 }}>
            <FlatList
              data={detailFood?.imageList ? detailFood.imageList : null}
              horizontal
              showsHorizontalScrollIndicator={false}
              decelerationRate={5}
              snapToInterval={windowWidth}
              bounces={false}
              renderItem={({ item }) => {
                return (
                  <View style={[styles.viewImage, { width: windowWidth }]}>
                    <Image source={{ uri: item }} style={styles.image} />
                  </View>
                )
              }}
            />
          </View>
          <View style={styles.viewInfo}>
            <View style={styles.row1}>
              <View style={styles.infoRow1CL1}>
                <Text style={styles.textRow1}>{detailFood?.type}</Text>
                <Text style={styles.address1}>
                  Món:{' '}
                  <Text style={styles.typeRow1}>{detailFood?.nameFood}</Text>
                </Text>
              </View>
              <View style={styles.infoRow1CL2}>
                <View style={styles.rate}>
                  <Image source={iconStar} />
                  <Text style={styles.rateNumber}>4.9</Text>
                </View>
                <Text style={styles.rateText}>170 Review</Text>
              </View>
            </View>
            <View style={styles.row2}>
              <Text style={styles.address}>
                Địa Chỉ:{' '}
                <Text style={styles.typeRow1}>{detailFood?.address}</Text>
              </Text>
              <Text style={styles.address}>
                Thời Gian Mở Cửa:{' '}
                <Text style={styles.typeRow1}>{detailFood?.time}</Text>
              </Text>
              <Text style={styles.address}>
                Giá:{' '}
                <Text style={styles.typeRow1}>{detailFood?.price}</Text> VNĐ
              </Text>
              <Text style={styles.tittleDesc}>Mô Tả</Text>
              <ScrollView style={styles.viewDesc}
                showsVerticalScrollIndicator={false}
              >
                <Text style={styles.textDesc}>{detailFood?.desc}</Text>
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.row3}
              onPress={() => {
                addToCart(productID)
                // navigate(screenName.CartProduct)
              }}>
              <Text style={[styles.textPrice, { fontWeight: "800" }]}>Thêm Sản Phẩm</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  containerHeader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    marginTop: 40,
  },
  headerAction: {
    position: "absolute",
    top: 40,
    zIndex: 1,
    height: 50,
    width: "100%",
  },
  viewImage: {
    flex: 1,
    paddingHorizontal: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    borderRadius: 10,
  },
  viewInfo: {
    flex: 3,
    height: 100,
    width: "100%",
    paddingHorizontal: 15,
    marginTop: 20,
  },
  row1: {
    flexDirection: "row",
    // flex: 1
  },
  infoRow1CL1: {
    flex: 3,
  },
  textRow1: {
    fontSize: 22,
    fontWeight: "800",
    paddingVertical: 10,
    color: "#ff4500",
  },
  typeRow1: {
    color: "#800000",
    fontSize: 16,
    fontWeight: "600",
  },
  infoRow1CL2: {
    flex: 1,
    backgroundColor: "black",
    paddingVertical: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  rate: {
    flexDirection: "row",
    paddingBottom: 5,
    alignItems: "center",
  },
  rateNumber: {
    color: "white",
    paddingHorizontal: 10,
    fontSize: 16,
    fontWeight: "600",
  },
  rateText: {
    color: "white",
  },
  row2: {
    marginBottom: 20,
  },
  address: {
    fontWeight: "600",
    paddingTop: 10,
    fontSize: 16,
  },
  address1: {
    fontWeight: "600",
    fontSize: 16,
  },
  tittleDesc: {
    fontSize: 20,
    fontWeight: "800",
    paddingVertical: 10,
  },
  row3: {
    flexDirection: "row",
    backgroundColor: "black",
    justifyContent: "center",
    paddingVertical: 15,
    width: "70%",
    borderRadius: 20,
    alignSelf: "center",
  },
  textPrice: {
    color: "white",
    fontSize: 20,
    fontWeight: "400",
  },
  viewDesc: {
    borderWidth: 1,
    padding: 5,
    borderColor: "gray",
    borderRadius: 10,
    height: 150
  },
  textDesc: {
    fontSize: 16,
    fontWeight: "500",
  },
});
