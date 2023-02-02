import React, { useState } from "react";
import { SafeAreaView, TextInput, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Image, View, TouchableHighlight, Platform } from "react-native"
import { goBack, navigate } from "../../navigators/root-navigator";
import { screenName } from "../../navigators/screens-name";
import { showSuccess } from "../../ultils/typeS/helperFunc";
import { iconBack } from "../../url";
import { SelectList } from 'react-native-dropdown-select-list'

const CreateProduct = () => {

    const [nameCreate, setNameCreate] = useState<string>("")
    const [imageCreate, setImageCreate] = useState<string>("")
    const [typeCreate, setTypeCreate] = useState<string>("")
    const [categoryCreate, setCategoryCreate] = useState<string>("")
    const [addressCreate, setAddressCreate] = useState<string>("")
    const [priceCreate, setPriceCreate] = useState<string>("")
    const [timeCreate, setTimeCreate] = useState<string>("")
    const [descCreate, setDescCreate] = useState<string>("")
    const [listImage, setListImage] = useState<Array<string>>([""])
    const [image1, setImage1] = useState<string>("")
    const [image2, setImage2] = useState<string>("")
    const [image3, setImage3] = useState<string>("")

    const BG_Image = "https://cdn.pixabay.com/photo/2021/08/20/07/13/bird-6559677_1280.jpg"

    const Category = ["Bún", "Bánh", "Cơm", "Chè", "Chay", "Ăn Vặt"]

    const imgCarousel: Array<string> = []

    const setImgListCarousel = () => {
        imgCarousel.push(image1)
        imgCarousel.push(image2)
        imgCarousel.push(image3)
        setListImage(imgCarousel)
    }

    const postProduct = async () => {
        await fetch('https://63ae5ea23e46516916702e14.mockapi.io/foods', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nameFood: nameCreate,
                image: imageCreate,
                address: addressCreate,
                price: priceCreate,
                time: timeCreate,
                desc: descCreate,
                type: typeCreate,
                category: categoryCreate,
                imageList: listImage
            }),
        })
            .then(response => {
                console.log(response.status, 'ok');
            }).catch(error => {
                console.log(error)
            });
    };
    const clearText = () => {
        setNameCreate(""),
            setAddressCreate(""),
            setDescCreate(""),
            setImageCreate(""),
            setTimeCreate(""),
            setPriceCreate(""),
            setTypeCreate("")
        setCategoryCreate(""),
            setImage1(""),
            setImage2(""),
            setImage3("")
    }

    const timePost = () => {
        setImgListCarousel()
        showSuccess("Thêm Sản Phẩm Thành Công")
        postProduct()
        clearText()
        setTimeout(() => {
            navigate(screenName.HomePage)
        },500)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Image source={{ uri: BG_Image }}
                style={StyleSheet.absoluteFillObject}
                blurRadius={40}
            />
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
                                    value={nameCreate}
                                    onChangeText={(text) => setNameCreate(text)}
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Tên Cửa Hàng</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Tên Cửa Hàng"
                                    value={nameCreate}
                                    onChangeText={(text) => setTypeCreate(text)}
                                />
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={[styles.itemInput, { flex: 1 }]}>
                                    <Text style={styles.textInput}>Thể Loại</Text>
                                    <SelectList
                                        setSelected={setCategoryCreate}
                                        boxStyles={styles.dropDown}
                                        inputStyles={styles.textDropDown}
                                        data={Category}
                                        placeholder="Ex: Bún, Bánh,..."
                                    />
                                </View>
                                <View style={styles.viewWhite} />
                                <View style={[styles.itemInput, { flex: 1 }]}>
                                    <Text style={styles.textInput}>Giá</Text>
                                    <TextInput
                                        style={styles.priceInput}
                                        placeholderTextColor={'#696969'}
                                        placeholder="20.000"
                                        value={priceCreate}
                                        onChangeText={(text) => setPriceCreate(text)}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <View style={[styles.itemInput, { flex: 1 }]}>
                                    <Text style={styles.textInput}>Địa Chỉ</Text>
                                    <TextInput
                                        style={styles.priceInput}
                                        placeholderTextColor={'#696969'}
                                        placeholder="Địa Chỉ..."
                                        value={addressCreate}
                                        onChangeText={(text) => setAddressCreate(text)}
                                    />
                                </View>
                                <View style={styles.viewWhite} />
                                <View style={[styles.itemInput, { flex: 1 }]}>
                                    <Text style={styles.textInput}>Giờ Mở Cửa</Text>
                                    <TextInput
                                        style={styles.priceInput}
                                        placeholderTextColor={'#696969'}
                                        placeholder="8AM - 10PM..."
                                        value={timeCreate}
                                        onChangeText={(text) => setTimeCreate(text)}
                                    />
                                </View>
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Ảnh Món Ăn</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Upload Link Image"
                                    value={imageCreate}
                                    onChangeText={(text) => setImageCreate(text)}
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Danh Sách Ảnh</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Link Image 1"
                                    value={image1}
                                    onChangeText={(text) => {
                                        setImage1(text)
                                    }}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Link Image 2"
                                    value={image2}
                                    onChangeText={(text) => {
                                        setImage2(text)
                                    }}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Link Image 3"
                                    value={image3}
                                    onChangeText={(text) => {
                                        setImage3(text)
                                    }}
                                />
                            </View>
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Mô Tả</Text>
                                <TextInput
                                    style={styles.inputDesc}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Mô Tả...."
                                    value={descCreate}
                                    onChangeText={(text) => setDescCreate(text)}
                                    multiline={true}
                                    numberOfLines={10}
                                />
                            </View>
                        </View>
                        <View style={styles.viewButton}>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => {
                                    // setImgListCarousel()
                                    // postProduct()
                                    // showSuccess("Thêm Sản Phẩm Thành Công")
                                    // clearText()
                                    // navigate(screenName.HomePage)
                                    timePost()
                                }}
                            >
                                <Text style={styles.textLogin}>Add</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => clearText()}
                            >
                                <Text style={styles.textLogin}>Reset</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.boxWhite}></View>
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
        backgroundColor: "white",
    },
    containerHeader: {
        flex: 1,
        alignItems: "center",
        paddingHorizontal: 20,
        backgroundColor: "red",
    },
    logo: {
        alignSelf: "center",
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
        fontWeight: "800",
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
    dropDown: {
        borderColor: "black",
        marginVertical: 5,
        padding: 14,
        paddingLeft: 25,
        borderWidth: 0.5,
        borderRadius: 10,
    },
    priceInput: {
        marginVertical: 5,
        padding: 14,
        paddingLeft: 25,
        borderWidth: 0.5,
        borderRadius: 10,
        fontWeight: "600",
    },
    viewWhite: {
        marginHorizontal: 5
    },
    textDropDown: {
        fontWeight: "600",
        color: "#696969",
    },
    input: {
        marginVertical: 5,
        padding: 12,
        paddingLeft: 25,
        borderWidth: 0.5,
        borderRadius: 10,
        width: "100%",
        fontWeight: "600",
    },
    inputDesc: {
        marginVertical: 5,
        paddingVertical: 20,
        paddingLeft: 25,
        borderWidth: 0.5,
        borderRadius: 10,
        width: "100%",
        fontWeight: "600",
        alignItems: "center",
        justifyContent: "center"
    },
    loginButton: {
        backgroundColor: "#F6A139",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginVertical: 10,
        marginHorizontal: 30,
        borderRadius: 20,
        flex: 1
    },
    textLogin: {
        fontSize: 20,
        fontWeight: "800",
        color: "white",
    },
    viewButton: {
        flexDirection: "row"
    },
    boxWhite: {
        width: "100%",
        height: 80
    }
})