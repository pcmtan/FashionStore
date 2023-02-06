import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image, Alert } from "react-native";
import HeaderNavigation from "../../components/Header/Header";
import { goBack, navigate } from "../../navigators/root-navigator";
import { screenName } from "../../navigators/screens-name";
import { showWarning } from "../../ultils/typeS/helperFunc";
import { iconBack, iconAvatar, avatarUser, iconRight, iconProfile, iconCart, iconFavorites, iconMaps } from "../../url";
import { removeItemStored } from "../../components/AsyncStorage/AsyncStorage";

const data = [
    {
        img: iconCart,
        nameTag: "My Card",
        namePage: "CartProduct"

    },
    {
        img: iconFavorites,
        nameTag: "My Favorites",
        namePage: "Favorite"

    }
];

const ProfileUser = () => {
    const navigation = useNavigation<any>()
    const BG_Image = "https://cdn.pixabay.com/photo/2021/08/20/07/13/bird-6559677_1280.jpg"
    const HeaderLeft = () => {
        return (
            <TouchableOpacity
                style={[styles.containerHeader, { alignItems: "flex-start" }]}
                onPress={goBack}>
                <Image
                    source={iconBack} />
            </TouchableOpacity>
        )
    };
    const HeaderRight = () => {
        return (
            <View style={[styles.containerHeader, { alignItems: "flex-end" }]}>
                <Image
                    source={iconAvatar}
                />
            </View>
        )
    };
    const notificationRemove = (() => {
        Alert.alert('Xác Thực', 'Bạn Muốn Đăng Xuất ???', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            {
                text: 'OK', onPress: () => {
                    navigation.replace(screenName.WelcomePage)
                    removeItemStored('email')
                    removeItemStored('password')
                    // removeItemStored('itemFavorite')
                    // removeItemStored('cartItems')
                    showWarning("Đăng Xuất Thành Công")
                }
            },
        ]);
    })
    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: BG_Image }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={40}
            />
            <HeaderNavigation
                childrenLeft={<HeaderLeft />}
                childrenRight={<HeaderRight />}
            />
            <View style={styles.viewInfo}>
                <View style={styles.headerInfo}>
                    <Image style={styles.avatarUser} source={avatarUser} />
                    <View style={styles.infoUser}>
                        <Text style={styles.textName}>User Name</Text>
                        <Text style={styles.textEmail}>Email</Text>
                    </View>
                </View>
                <View style={styles.bodyInfo}>
                    {
                        data.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    style={styles.funcUser}
                                    onPress={() => { navigate(item.namePage) }}
                                    key={index}>
                                    <View style={styles.viewIcon}>
                                        <Image source={item.img} />
                                    </View>
                                    <Text style={styles.textFunc}>{item.nameTag}</Text>
                                    <Image source={iconRight} style={styles.icon} />
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <TouchableOpacity style={styles.buttonLogout}
                    onPress={() => {
                        notificationRemove()
                    }}>
                    <Text style={styles.textLogout}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
};

export default ProfileUser

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerHeader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    viewInfo: {
        flex: 1,
        marginHorizontal: 20
    },
    headerInfo: {
        flexDirection: "row",
        marginTop: 30,
        height: 100,
        borderWidth: 0.5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    avatarUser: {
        flex: 1,
        aspectRatio: 1 / 1,
        borderRadius: 20,
    },
    infoUser: {
        flex: 3,
        paddingHorizontal: 20,
        justifyContent: "center",
    },
    textName: {
        fontSize: 20,
        fontWeight: "600",
        paddingVertical: 5,

    },
    textEmail: {
        paddingVertical: 5,
        color: "#696969"
    },
    bodyInfo: {
        height: 170,
        marginTop: 20,
        borderWidth: 0.5,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 10
    },
    funcUser: {
        flex: 2,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 10,
        justifyContent: "space-around"
    },
    textFunc: {
        paddingHorizontal: 20,
        fontSize: 18,
        fontWeight: "600",
        flex: 3
    },
    viewIcon: {
        backgroundColor: "#778899",
        padding: 10,
        borderRadius: 15
    },
    icon: {
        justifyContent: "flex-end",
    },
    buttonLogout: {
        backgroundColor: "#00bfff",
        marginTop: 30,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 40,
        borderRadius: 20,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    textLogout: {
        fontSize: 20,
        fontWeight: "800",
        paddingHorizontal: 20,
        paddingVertical: 20
    }
})