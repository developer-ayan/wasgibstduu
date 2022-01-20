import { Button, View } from 'react-native';
import React from 'react';

function Profile({ navigation }) {

    return (
        <View>
            <Button onPress={navigation.goBack} title='hello'/>
        </View>
        
  );
};

export default Profile;