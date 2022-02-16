import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';



const All_Ads = ({ data, navigation }) => {

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                numColumns={2}
                renderItem={({ item }) => (
                    <Item
                        discription={item.DISCRIPTION}
                        image={item.ADS_IMAGES}
                        category={item.CATEGORY}
                        city={item.CITY}
                        price={item.PRICE}
                        title={item.TITLE}
                        navigation={navigation}
                    />)}
                keyExtractor={item => item.USER_UID}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 32,
    },
});

export default All_Ads;