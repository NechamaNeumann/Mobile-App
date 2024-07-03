// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import axios from 'axios';

// const DefaultBasketScreen = ({ route }) => {
//   const { ipAddress } = route.params;

//   useEffect(() => {
//     const listenForShots = () => {
//       axios.get(`http://${ipAddress}/listen`)
//         .then(response => {
//           // Handle incoming shots
//         })
//         .catch(error => {
//           console.error('Error listening for shots:', error);
//         });
//     };

//     listenForShots();
//   }, [ipAddress]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.text}>Listening for incoming shots...</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//   },
// });

// export default DefaultBasketScreen;
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, FlatList } from 'react-native';
import axios from 'axios';

const DefaultBasketScreen = ({ route, navigation }) => {
  const { ipAddress } = route.params;
  const [shots, setShots] = useState([]);
  const [averageScore, setAverageScore] = useState(0);
  const [averageDistance, setAverageDistance] = useState(0);

  useEffect(() => {
    const fetchShots = () => {
      axios.get(`http://${ipAddress}/listen`)
        .then(response => {
          const newShots = response.data.shots;
          setShots(newShots);
          calculateAverages(newShots);
        })
        .catch(error => {
          console.error('Error listening for shots:', error);
        });
    };

    const intervalId = setInterval(fetchShots, 3000); // Fetch shots every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, [ipAddress]);

  const calculateAverages = (shots) => {
    const totalShots = shots.length;
    const totalScore = shots.reduce((sum, shot) => sum + shot.score, 0);
    const totalDistance = shots.reduce((sum, shot) => sum + shot.distance, 0);

    setAverageScore(totalShots ? (totalScore / totalShots).toFixed(2) : 0);
    setAverageDistance(totalShots ? (totalDistance / totalShots).toFixed(2) : 0);
  };

  const renderShot = ({ item }) => {
    const shotStyle = item.made ? styles.shotMade : styles.shotMissed;
    return (
      <View style={[styles.shot, shotStyle, { left: item.x, top: item.y }]}>
        <Text style={styles.shotText}>{item.made ? '✔' : '✘'}</Text>
      </View>
    );
  };

  const startSession = () => {
    navigation.navigate('InSession', { ipAddress });
  };

  const disconnect = () => {
    navigation.navigate('ScanScreen');
  };

  return (
    <View style={styles.container}>
      <Image source={require('./assets/basket.png')} style={styles.basketImage} />
      <FlatList
        data={shots}
        renderItem={renderShot}
        keyExtractor={(item, index) => index.toString()}
      />
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Average Score: {averageScore}</Text>
        <Text style={styles.dataText}>Average Distance: {averageDistance}m</Text>
        <Text style={styles.dataText}>Total Shots: {shots.length}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Start Session" onPress={startSession} />
        <Button title="Disconnect" onPress={disconnect} />
      </View>
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
    marginBottom: 20,
  },
  shot: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shotMade: {
    backgroundColor: 'green',
  },
  shotMissed: {
    backgroundColor: 'red',
  },
  shotText: {
    color: 'white',
    fontWeight: 'bold',
  },
  dataContainer: {
    marginVertical: 20,
  },
  dataText: {
    fontSize: 16,
    marginVertical: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
});

export default DefaultBasketScreen;
