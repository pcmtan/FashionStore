import React from "react";
import { View, StyleSheet, ImageBackground, SafeAreaView } from "react-native"

const HeaderNavigation = ({ childrenLeft, childrenMiddle, childrenRight, allViewHeader, imageUrl }: any) => {
    return (
        <View style={styles.container}>
            {
                React.isValidElement(allViewHeader) ?
                    <ImageBackground
                        source={{ uri: imageUrl }}
                        // resizeMode={"contain"}
                        style={styles.headerInSide}>
                        {allViewHeader}
                    </ImageBackground>
                    :
                    <View style={styles.headerInSide}>
                        <View style={styles.headerLeft}>
                            {childrenLeft}
                        </View>
                        <View style={styles.headerMiddle}>
                            {childrenMiddle}
                        </View>
                        <View style={styles.headerRight}>
                            {childrenRight}
                        </View>
                    </View>
            }

        </View>
    )
}
export default HeaderNavigation

const styles = StyleSheet.create({

    container: {
        flexDirection: "row",
        height: 50,
        position: "absolute",
        top: 30,
        right: 1,
        zIndex: 1,
        width: "100%"
    },
    headerInSide: {
        flexDirection: "row",
        flex: 1
    },
    headerLeft: {
        flex: 1,
    },
    headerMiddle: {
        flex: 2,
    },
    headerRight: {
        flex: 1
    }
})