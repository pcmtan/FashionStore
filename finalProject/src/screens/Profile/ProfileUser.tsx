import { useNavigation } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import HeaderNavigation from "../../components/Header/Header";
import { goBack, navigate } from "../../navigators/root-navigator";
import { screenName } from "../../navigators/screens-name";
import { iconBack, iconAvatar, avatarUser, iconRight, iconProfile, iconCart, iconFavorites, iconHistory } from "../../url";

const data = [
    {
        img: iconProfile,
        nameTag: "Profile Detail",
        namePage: ""
    },
    {
        img: iconCart,
        nameTag: "My Card",
        namePage: ""

    },
    {
        img: iconFavorites,
        nameTag: "My Favorites",
        namePage: ""

    },
    {
        img: iconHistory,
        nameTag: "History Order",
        namePage: "HistoryOrder"

    },

]

const ProfileUser = () => {
    const navigation = useNavigation<any>()
    const HeaderLeft = () => {
        return (
            <TouchableOpacity
                style={[styles.containerHeader, { alignItems: "flex-start" }]}
                onPress={goBack}>
                <Image
                    source={iconBack} />
            </TouchableOpacity>
        )
    }

    const HeaderRight = () => {
        return (
            <View style={[styles.containerHeader, { alignItems: "flex-end" }]}>
                <Image
                    source={iconAvatar}
                />
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
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
                                onPress={() => {navigate(item.namePage)}}
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
                <TouchableOpacity style={styles.buttonLogout} onPress={() => {
                    navigation.popToTop()
                }}>
                        <Text style={styles.textLogout}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default ProfileUser
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerHeader: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    viewInfo: {
        flex: 1,
        marginHorizontal: 20,
    },
    headerInfo: {
        flexDirection: "row",
        marginTop: 30,
        height:100,
        backgroundColor: "#dcdcdc",
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
        height: 300,
        marginTop: 20,
        backgroundColor: "#dcdcdc",
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
        flex:3
    },
    viewIcon: {
        backgroundColor: "#a9a9a9",
        padding:10,
        borderRadius: 15
    },
    icon: {
        justifyContent: "flex-end",
    },
    buttonLogout: {
        backgroundColor: "#00bfff" , 
        marginTop:30, 
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 40,
        borderRadius: 20,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 1
        },
        shadowRadius: 3,
        shadowOpacity: 0.5,
    },
    textLogout: {
        fontSize:20, 
        fontWeight: "800",
        paddingHorizontal: 20,
        paddingVertical: 20
    }
})