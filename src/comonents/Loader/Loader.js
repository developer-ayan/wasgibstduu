import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import ContentLoader from "react-native-easy-content-loader";


function Loader() {
    return (
        <View style={{flex : 1, height: '100%', alignItems: 'center', justifyContent: 'center' , backgroundColor : 'white' }}>
            {/* <ActivityIndicator size="small" color="#0000ff" />
             */}
             <ActivityIndicator size="large" color="green" />
        </View>
        // <ContentLoader
        //     pRows={10}
        //     pHeight={[150, 150, 30]}
        //     pWidth={[50, 30,20]}
        //     pWidth={[400, 70, 100]}
        // />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
});

export default Loader;