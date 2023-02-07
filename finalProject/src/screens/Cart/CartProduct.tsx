import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  getItemStorage,
  removeItemStored,
  setItemStorage,
} from '../../components/AsyncStorage/AsyncStorage';
import HeaderNavigation from '../../components/Header/Header';
import { goBack, navigate } from '../../navigators/root-navigator';
import { screenName } from '../../navigators/screens-name';
import { showError, showSuccess } from '../../ultils/typeS/helperFunc';
import { homeTab, iconBack, iconDelete } from '../../url';

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
  quantity: number;
}

export const CartProduct = () => {
  const [refreshControl, setRefreshControl] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [dataCart, setDataCart] = useState<IFoods[]>([]);
  const [total, setTotal] = useState<number>();
  const [totalShip, setTotalShip] = useState<number>();
  const [refresh, setRefresh] = useState<number>(0)
  const navigation = useNavigation()
  const BG_Image =
    'https://cdn.pixabay.com/photo/2021/08/20/07/13/bird-6559677_1280.jpg';

  const HeaderLeft = () => {
    return (
      <TouchableOpacity
        style={[styles.containerHeader, { alignItems: 'flex-start' }]}
        onPress={goBack}>
        <Image source={iconBack} style={styles.iconBackStyle} />
      </TouchableOpacity>
    );
  };
  const HeaderMiddle = () => {
    return (
      <View style={styles.containerHeader}>
        <Text style={styles.textHeader}>My Order</Text>
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
        <Image source={homeTab} style={{ height: 45, aspectRatio: 1 / 1 }} />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    const focusData = navigation.addListener('focus', () => {
      getDataCart()
      setTimeout(() => {
        setRefreshControl(false);
      }, 1000)
      setTimeout(() => {
        setIsLoading(false)
      }, 2000)
    });
    return focusData
  }, [navigation])

  const getDataCart = () => {
    return fetch(
      'https://63ae5ea23e46516916702e14.mockapi.io/foods',
    )
      .then(response => response.json())
      .then(responseJson => {
        getItemStorage('cartItems').then(result => {
          let items = JSON.parse(result || '[]');
          let productData: IFoods[] = [];
          if (items) {
            responseJson.forEach(data => {
              if (items.includes(data.id)) {
                let newItem = {
                  ...data,
                  quantity: 1
                }
                productData.push(newItem);
              }
              setDataCart(productData);
            });
            getTotal(productData);
            getShipper(productData);
          } else {
            getTotal(productData);
            getShipper(productData);
          }
        });
      })
      .catch(error => {
        console.log('Error');
      });
  };


  const handlePlus = (index) => {
    const temp = dataCart;
    temp[index].quantity = temp[index].quantity + 1;
    setDataCart(temp);
    setRefresh(Math.random());
    getTotal(temp)

  };
  const handleMinus = (index) => {
    const temp = dataCart;
    if (temp[index].quantity <= 1) {
      notificationRemove(temp[index].id)
    } else {
      temp[index].quantity = temp[index].quantity - 1
    }
    setDataCart(temp);
    setRefresh(Math.random());
    getTotal(temp)
  };

  const onRefresh = () => {
    setDataCart([])
    getDataCart()
  };

  const getTotal = productData => {
    let total = 0;
    for (let i = 0; i < productData.length; i++) {
      let productPrice = productData[i].price * productData[i].quantity;
      total += productPrice;
    }
    setTotal(total);
    setRefresh(Math.random());
  };

  const getShipper = priceShipper => {
    let totalShip = 0;
    for (let i = 0; i < priceShipper.length; i++) {
      let priceShip = priceShipper[i].price
      totalShip += priceShip
    }
    setTotalShip(totalShip)
    setRefresh(Math.random());
  }

  const deleteItemFromCart = ID => {
    const newArray = dataCart.filter(item => !ID.includes(item.id));
    setDataCart(newArray);

    getItemStorage('cartItems').then(result => {
      let items = JSON.parse(result || '[]')
      let newItems = items.filter(index => !ID.includes(index))
      getDataCart()
      setItemStorage('cartItems', newItems)
    })
  };

  const notificationRemove = ((ID) => {
    Alert.alert('Alert', 'Xóa Sản Phẩm', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      { text: 'OK', onPress: () => deleteItemFromCart(ID) },
    ]);
  });

  const payOrder = () => {
    if (dataCart.length < 1) {
      showError("Không Có Sản Phẩm")
    } else {
      removeItemStored('cartItems')
      getDataCart()
      navigate(screenName.HomePage)
      showSuccess("Thanh Toán Thành Công")
    };
  }

  const renderItems = (item: IFoods, index) => {
    return (
      <View
        style={styles.item}
        key={index}
      >
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
            Giá: <Text style={styles.infoTag}>{item.price} VND</Text>
          </Text>
          <View style={styles.viewAction}>
            <View style={styles.viewCount}>
              <TouchableOpacity
                style={styles.iconCount}
                onPress={() => handleMinus(index)}>
                <Text style={{ alignSelf: 'center' }}>-</Text>
              </TouchableOpacity>
              <Text>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.iconCount}
                onPress={() => handlePlus(index)}>
                <Text style={{ alignSelf: 'center' }}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={{ flex: 1, alignItems: 'flex-end' }}
              onPress={() => notificationRemove(item.id)}>
              <Image
                source={iconDelete}
                style={{ height: 20, aspectRatio: 1 / 1 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{ uri: BG_Image }}
        style={StyleSheet.absoluteFillObject}
        blurRadius={40}
      />
      {refreshControl ? (
        <View style={styles.refControl}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <>
          <HeaderNavigation
            childrenLeft={<HeaderLeft />}
            childrenMiddle={<HeaderMiddle />}
            childrenRight={<HeaderRight />}
          />
          {isLoading ? (
            <View style={styles.refControl}>
              <ActivityIndicator size="large" color="red" />
            </View>
          ) : (
            <View style={styles.viewFlat}>
              <FlatList
                style={styles.flatList}
                data={dataCart}
                renderItem={({ item, index }) => renderItems(item, index)}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshControl}
                    onRefresh={onRefresh}
                  />
                }
              />
            </View>
          )}
          {
            isLoading ? (
              <View style={styles.refControl}>
                <ActivityIndicator color="red" />
              </View>
            ) : (
              <View style={{ flex: 2 }}>
                <View style={styles.mrTotalView}>
                  <Text style={styles.titlePrice}>Order Info</Text>
                  <View style={styles.totalTag}>
                    <Text style={styles.fontS}>SubTotal:</Text>
                    <Text style={styles.fontS}>{total || 0} VND</Text>
                  </View>
                  <View style={styles.totalTag}>
                    <Text style={styles.fontS}>Shipping Tax:</Text>
                    <Text style={styles.fontS}>{(totalShip || 0) * 0.2} VND</Text>
                  </View>
                  <View style={[styles.totalTag, { paddingVertical: 10 }]}>
                    <Text style={styles.fontS}>Total:</Text>
                    <Text style={styles.totalSt}>
                      {(total || 0) + (total || 0) * 0.2} VND
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.viewCheckout}
                  onPress={() => {
                    payOrder()
                  }}
                >
                  <Text style={styles.textCheckout}>CHECKOUT</Text>
                </TouchableOpacity>
              </View>
            )
          }
          <View style={{ flex: 0.5 }} />
        </>
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fontS: {
    fontSize: 16
  },
  totalSt: {
    fontSize: 18,
    fontWeight: "600"
  },
  iconBackStyle: {
    height: 50,
    aspectRatio: 1 / 1
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
  flatList: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  refControl: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  item: {
    backgroundColor: "#c0c0c0",
    marginBottom: 10,
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
    padding: 10,
  },
  itemPhoto: {
    height: 100,
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
  titlePrice: {
    fontSize: 20,
    fontWeight: "800",
    paddingBottom: 10,
  },
  viewFlat: {
    flex: 3,
    borderWidth: 0.5,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  viewCount: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    flex: 1,
  },
  viewAction: {
    flexDirection: "row",
    paddingVertical: 3,
    justifyContent: "space-around",
  },
  iconCount: {
    borderWidth: 0.5,
    borderRadius: 100,
    height: 20,
    aspectRatio: 1 / 1,
  },
  mrTotalView: {
    marginVertical: 5,
    marginHorizontal: 10,
  },
  totalTag: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  viewCheckout: {
    backgroundColor: "#F6A139",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  textCheckout: {
    fontSize: 16,
    fontWeight: "800",
    paddingVertical: 15,
  },
});
