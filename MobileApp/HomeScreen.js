import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import logo from '../MobileApp.js/logo.png'

const HomeScreen = ({ navigation }) => {
  
  const handleStartPress = () => {
    navigation.navigate('ConnectToBasketScreen'); 
  };

  return (
    <View >
      <Image src={logo} />
      <TouchableOpacity onPress={handleStartPress} >
        <Text>Connect to basket Screen</Text>
      </TouchableOpacity>
     </View>
  );
};

export default HomeScreen;