import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar, Image, TouchableOpacity } from 'react-native';

const Item = ({ category, title, discription, image, city, price, navigation }) => (

    <View style={{ width: '50%', marginHorizontal: 1, backgroundColor: 'white', borderRadius: 2, marginTop: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('Categories_detail',
            {
                IMAGE: image,
                TITLE: title,
                PRICE: price,
                DISCRIPTION: discription,
                CITY: city,
                CATEGORY: category,
            }
        )}>
            <Image
                style={{ width: '100%', height: 120 }}
                source={{ uri: image }}
            />
            <View style={{ paddingHorizontal: 8 }}>
                <Text style={{ paddingVertical: 5, color: '#d3d3d3', fontSize: 8 }}>{category} - {city}</Text>
                <Text numberOfLines={2} style={{ color: 'black', fontWeight: '500', fontSize: 12 }}>{title}</Text>
                <Text style={{ color: 'green', fontWeight: '700', paddingVertical: 5 }}>{price}</Text>
            </View>
        </TouchableOpacity>
    </View>
);

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