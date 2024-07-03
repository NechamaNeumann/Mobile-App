// screens/SessionSummaryScreen.js
import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';

const SessionSummaryScreen = ({ route, navigation }) => {
  const { shots } = route.params;

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
  const averageArc = shots.length ? (shots.reduce((acc, shot) => acc + shot.arc, 0) / shots.length).toFixed(2) : 0;

  return (
    <View style={styles.container}>
      <Image source={require('../assets/basket.png')} style={styles.basketImage} />
      {renderShots()}
      <Text style={styles.dataText}>Total Shots: {shots.length}</Text>
      <Text style={styles.dataText}>Average Grade: {averageGrade}</Text>
      <Text style={styles.dataText}>Average Range: {averageRange}</Text>
      <Text style={styles.dataText}>Average Arc: {averageArc}</Text>
      <Button title="Share Results" onPress={() => {}} />
      <Button title="Back to Default Basket Screen" onPress={() => navigation.navigate('DefaultBasket')} />
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

export default SessionSummaryScreen;
