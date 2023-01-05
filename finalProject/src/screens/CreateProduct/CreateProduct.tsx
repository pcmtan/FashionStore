import React, { useState } from "react";
import { SafeAreaView, TextInput, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Image, View, TouchableHighlight, Platform } from "react-native"
import HeaderNavigation from "../../components/Header/Header";
import { goBack } from "../../navigators/root-navigator";
import { iconBack } from "../../url";

const CreateProduct = () => {

    const [nameCreate, setNameCreate] = useState("Name")
    const [imageCreate, setImageCreate] = useState("https://img.freepik.com/vecteurs-libre/illustration-icone-galerie_53876-27002.jpg?w=2000")
    const [typeCreate, setTypeCreate] = useState("Type")
    const [addressCreate, setAddressCreate] = useState("Address")
    const [priceCreate, setPriceCreate] = useState("Price")
    const [timeCreate, setTimeCreate] = useState("Time")
    const [descCreate, setDescCreate] = useState("Desc")

    const postProduct = async () => {
        await fetch('https://63ae5ea23e46516916702e14.mockapi.io/foods', {
          method: 'POST',
          headers: {
            // "Content-Type": "application/x-www-form-urlencoded"
            'Content-Type': 'application/json',
          },
    
          body: JSON.stringify({
            nameFood: nameCreate,
            image: imageCreate,
            address: addressCreate,
            price: priceCreate,
            time: timeCreate,
            desc: descCreate,
            type: typeCreate
          }),
        })
          .then(response => {
            console.log(response.status, 'ok');
          })
          .catch(error => {
            // console.log(error)
            // alert("Lỗi nè");
          });
      };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView>
                    <View style={styles.viewInfo}>
                        <View style={styles.headerView}>
                            <TouchableOpacity style={styles.textWC2} onPress={() => goBack()}>
                                <Image source={iconBack} />
                            </TouchableOpacity>
                            <Text style={styles.textWC1}>Thêm Món Ăn</Text>
                            <View style={styles.textWC2} />
                        </View>
                        <View style={styles.inputView}>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Tên Món Ăn</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Tên Món"
                                    onChangeText={(text) => setNameCreate(text)}
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Ảnh Món Ăn</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Upload Link Image"
                                    onChangeText={(text) => setImageCreate(text)}
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Thể Loại</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Ex: Bún, Bánh..."
                                    onChangeText={(text) => setTypeCreate(text)}
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Địa Chỉ</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Địa Chỉ..."
                                    onChangeText={(text) => setAddressCreate(text)}
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Giá</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="20.000"
                                    onChangeText={(text) => setPriceCreate(text)}
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Giờ Mở Cửa</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="8AM - 10PM..."
                                    onChangeText={(text) => setTimeCreate(text)}
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Mô Tả</Text>
                                <TextInput
                                    style={styles.inputDesc}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Mô Tả...."
                                    onChangeText={(text) => setDescCreate(text)}
                                    multiline = {true}
                                    numberOfLines = {10}
                                />
                            </View>
                        </View>
                        <View style={styles.viewButton}>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => postProduct()}
                            >
                                <Text style={styles.textLogin}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.loginButton}
                            >
                                <Text style={styles.textLogin}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
export default CreateProduct

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: "center"
    },
    containerHeader: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: "red",
    },
    logo: {
        alignSelf: 'center',
        width: 200,
        height: 200,
        borderRadius: 100,
    },
    viewInfo: {
        flex: 1,
        marginVertical: 10,
        marginHorizontal: 20,
    },
    headerView: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textWC1: {
        fontSize: 24,
        paddingVertical: 10,
        flex: 2,
        fontWeight: '800',
        textAlign: "center"
    },
    textWC2: {
        flex: 1
    },
    inputView: {
        paddingVertical: 10,
    },
    itemInput: {
        paddingVertical: 5,

    },
    textInput: {
        fontSize: 18,
        fontWeight: "600",
    },
    input: {
        marginVertical: 5,
        padding: 15,
        paddingLeft: 25,
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
        width: '100%',
        fontWeight: '600',
    },
    inputDesc: {
        marginVertical: 5,
        paddingVertical:20 ,
        paddingLeft: 25,
        backgroundColor: '#d3d3d3',
        borderRadius: 10,
        width: '100%',
        fontWeight: '600',
        alignItems: 'center',
        justifyContent: "center"
    },
    loginButton: {
        backgroundColor: '#F6A139',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: 20,
        flex: 1
    },
    textLogin: {
        fontSize: 20,
        fontWeight: '800',
        color: 'white',
    },
    viewButton: {
        flexDirection: 'row'
    }
})