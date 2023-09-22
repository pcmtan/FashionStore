import React, { useEffect, useState } from "react";
import { SafeAreaView, TextInput, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Image, View, Platform } from "react-native"
import { goBack, navigate } from "../../navigators/root-navigator";
import { screenName } from "../../navigators/screens-name";
import { showError, showSuccess } from "../../ultils/typeS/helperFunc";
import { iconBack } from "../../url";
import { SelectList } from 'react-native-dropdown-select-list'

const CreateProduct = () => {

    const [checkValue, setCheckValue] = useState<boolean>()
    // check validate
    const [errorNameFood, setErrorNameFood] = useState('');
    const [errorTime, setErrorTime] = useState('');
    const [errorType, setErrorType] = useState('');
    const [errorPrice, setErrorPrice] = useState('');
    const [errorImage, setErrorImage] = useState('');
    const [errorListImage, setErrorListImage] = useState('');
    const [errorAddr, setErrorAddr] = useState('');
    const [errorDesc, setErrorDesc] = useState('');
    // set img
    const [image1, setImage1] = useState<string>("");
    const [image2, setImage2] = useState<string>("");
    const [image3, setImage3] = useState<string>("");
    // set info item
    const [timeCreate, setTimeCreate] = useState<string>("");
    const [descCreate, setDescCreate] = useState<string>("");
    const [typeCreate, setTypeCreate] = useState<string>("");
    const [nameCreate, setNameCreate] = useState<string>("");
    const [imageCreate, setImageCreate] = useState<string>("");
    const [priceCreate, setPriceCreate] = useState<string>("");
    const [addressCreate, setAddressCreate] = useState<string>("");
    const [listImage, setListImage] = useState<Array<string>>([""]);
    const [categoryCreate, setCategoryCreate] = useState<string>("");


    const BG_Image = "https://cdn.pixabay.com/photo/2021/08/20/07/13/bird-6559677_1280.jpg"

    const Category = ["Bún", "Bánh", "Chay", "Chè", "Cơm"]

    const createProductFood = () => {
        checkValidation()
        setListImage([image1, image2, image3])
        if (checkValue == true) {
            postProduct()
            showSuccess("Thêm Sản Phẩm Thành Công")
            clearText()
            navigate(screenName.HomePage)
        }
    };

    const postProduct = () => {
        return fetch('https://63ae5ea23e46516916702e14.mockapi.io/foods', {
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
        setImage2("")
        setImage1("")
        setImage3("")
        setTimeCreate("")
        setDescCreate("")
        setPriceCreate("")
        setNameCreate("")
        setAddressCreate("")
        setImageCreate("")
        setTypeCreate("")
        setCategoryCreate("")
        setCheckValue(true)
    };

    const checkValidation = () => {
        if (nameCreate != "" &&
            timeCreate != "" &&
            typeCreate != "" &&
            imageCreate != "" &&
            descCreate != "" &&
            addressCreate != "" &&
            priceCreate != "" &&
            (image1 && image2 && image3) != ""
        ) {
            setCheckValue(true)
        } else {
            setCheckValue(false)
            showError("Vui Lòng Nhập Thông Tin")
        };
        setErrorNameFood(nameCreate != "" ? "" : "Vui Lòng Nhập Tên Món");
        setErrorTime(timeCreate != "" ? "" : "Vui Lòng Nhập Thời Gian")
        setErrorType(typeCreate != "" ? "" : "Vui Lòng Nhập Tên Cửa Hàng")
        setErrorImage(imageCreate != "" ? "" : "Vui Lòng Nhập Link Ảnh")
        setErrorDesc(descCreate != "" ? "" : "Vui Lòng Nhập Mô Tả")
        setErrorAddr(addressCreate != "" ? "" : "Vui Lòng Nhập Địa Chỉ")
        setErrorPrice(priceCreate != "" ? "" : "Vui Lòng Nhập Giá")
        setErrorListImage(((image1 || image2 || image3) != "") ? "" : "Vui Lòng Nhập Link Danh Sách Ảnh")
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
                                <Image source={iconBack} style={styles.iconBackStyle} />
                            </TouchableOpacity>
                            <Text style={styles.textWC1}>Thêm Món Ăn</Text>
                            <View style={styles.textWC2} />
                        </View>
                        <View style={styles.inputView}>
                            <View>
                                <Text style={styles.textInput}>Tên Món Ăn</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Tên Món"
                                    value={nameCreate}
                                    onChangeText={(text) => setNameCreate(text)}
                                />
                            </View>
                            {
                                checkValue == false && errorNameFood != ""
                                    ?
                                    <Text style={styles.errorFormat}>{errorNameFood}</Text>
                                    : <View style={styles.itemInput} />
                            }
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Tên Cửa Hàng</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Tên Cửa Hàng"
                                    value={typeCreate}
                                    onChangeText={(text) => setTypeCreate(text)}
                                />
                            </View>
                            {
                                checkValue == false && errorNameFood != ""
                                    ?
                                    <Text style={styles.errorFormat}>{errorType}</Text>
                                    : <View style={styles.itemInput} />
                            }
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
                                        onChangeText={(text) => {
                                            if (Number(text) > -1) {
                                                setPriceCreate(text)
                                            }
                                        }}
                                    />
                                </View>
                            </View>
                            {
                                checkValue == false && errorNameFood != ""
                                    ?
                                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                        <Text style={styles.errorFormat}/>
                                        <Text style={styles.errorFormat}>{errorPrice}</Text>
                                    </View>
                                    : <View style={styles.itemInput} />
                            }

                            <View style={{ flexDirection: "row", justifyContent: "space-around"}}>
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
                            {
                                checkValue == false && errorNameFood != ""
                                    ?
                                    <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
                                        <Text style={styles.errorFormat}>{errorAddr}</Text>
                                        <Text style={styles.errorFormat}>{errorTime}</Text>
                                    </View>
                                    : <View style={styles.itemInput} />
                            }
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
                            {
                                checkValue == false && errorNameFood != ""
                                    ?
                                    <Text style={styles.errorFormat}>{errorImage}</Text>
                                    : <View style={styles.itemInput} />
                            }
                            <View style={styles.itemInput}>
                                <Text style={styles.textInput}>Danh Sách Ảnh</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Link Image 1"
                                    value={image1}
                                    onChangeText={(text) => setImage1(text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Link Image 2"
                                    value={image2}
                                    onChangeText={(text) => setImage2(text)}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholderTextColor={'#696969'}
                                    placeholder="Link Image 3"
                                    value={image3}
                                    onChangeText={(text) => setImage3(text)}
                                />
                            </View>
                            {
                                checkValue == false && errorNameFood != ""
                                    ?
                                    <Text style={styles.errorFormat}>{errorListImage}</Text>
                                    : <View style={styles.itemInput} />
                            }
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
                            {
                                checkValue == false && errorNameFood != ""
                                    ?
                                    <Text style={styles.errorFormat}>{errorDesc}</Text>
                                    : <View style={styles.itemInput} />
                            }
                        </View>
                        <View style={styles.viewButton}>
                            <TouchableOpacity
                                style={styles.loginButton}
                                onPress={() => {
                                    createProductFood()
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
    iconBackStyle: {
        height:50,
        aspectRatio: 1/1
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
        paddingVertical: 3
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
    },
    errorFormat: {
        color: "red",
        fontSize: 14,
        fontWeight: "400",
        marginVertical: 3,
    },
})