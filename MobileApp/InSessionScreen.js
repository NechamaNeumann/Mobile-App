// screens/InSessionScreen.js
import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const InSessionScreen = ({ navigation }) => {
  const [shots, setShots] = useState([]);

  const endSession = () => {
    navigation.navigate('SessionSummary', { shots });
  };

  const renderShots = () => {
    return shots.map((shot, index) => (
      <View
        key={index}
        style={[
          styles.shotIndicator,
          {
            backgroundColor: shot.made ? 'green' : 'red',
            left: shot.x,
            top: shot.y,
          },
        ]}
      />
    ));
  };

  const averageGrade = shots.length ? (shots.reduce((acc, shot) => acc + shot.grade, 0) / shots.length).toFixed(2) : 0;
  const averageRange = shots.length ? (shots.reduce((acc, shot) => acc + shot.range, 0) / shots.length).toFixed(2) : 0;

  return (
    <View style={styles.container}>
      <Image source={require('../assets/basket.png')} style={styles.basketImage} />
      {renderShots()}
      <Text style={styles.dataText}>Grade: {averageGrade}</Text>
      <Text style={styles.dataText}>Range: {averageRange}</Text>
      <Text style={styles.dataText}>Shot Counter: {shots.length}</Text>
      <Button title="End Session" onPress={endSession} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  basketImage: {
    width: 300,
    height: 300,
  },
  shotIndicator: {
    position: 'absolute',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  dataText: {
    fontSize: 16,
    marginVertical: 5,
  },
});

export default InSessionScreen;
