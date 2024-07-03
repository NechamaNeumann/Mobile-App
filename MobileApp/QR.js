import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';

const QRCodeScanner = () => {
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setScanned(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`סוג ברקוד: ${type}\nנתונים: ${data}`);
   
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        onBarCodeRead={scanned ? undefined : handleBarCodeScanned}
      >
        <Text style={styles.infoText}>ממתין לסריקת ברקוד...</Text>
      </RNCamera>
      {scanned && (
        <TouchableOpacity style={styles.rescanButton} onPress={() => setScanned(false)}>
          <Text style={styles.buttonText}>סרוק שוב</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  infoText: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
  rescanButton: {
    padding: 15,
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
});

export default QRCodeScanner;

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Webcam from 'react-webcam';

// const QRCodeScanner = ({ navigation }) => {
//   const [scanned, setScanned] = useState(false);

//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       setScanned(false);
//     });

//     return unsubscribe;
//   }, [navigation]);

//   const handleBarCodeScanned = (data) => {
//     setScanned(true);
//     alert(`נתונים: ${data}`);
//     // ניתן להשתמש בנתונים כדי לבצע פעולות נוספות כמו אימות ועוד
//   };

//   const handleUserMedia = (stream) => {
//     // Handle the stream, process the frame and decode the QR code
//     // Note: This is a simplified example and might require additional work to decode QR code from stream
//   };

//   return (
//     <View style={styles.container}>
//       {!scanned && (
//         <Webcam
//           audio={false}
//           height={720}
//           width={1280}
//           screenshotFormat="image/jpeg"
//           onUserMedia={handleUserMedia}
//           style={styles.webcam}
//         />
//       )}
//       {scanned && (
//         <TouchableOpacity style={styles.rescanButton} onPress={() => setScanned(false)}>
//           <Text style={styles.buttonText}>סרוק שוב</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: 'black',
// //   },
// //   webcam: {
// //     width: '100%',
// //     height: '100%',
// //   },
// //   rescanButton: {
// //     padding: 15,
// //     backgroundColor: '#4CAF50',
// //     borderRadius: 5,
// //     marginTop: 20,
// //   },
// //   buttonText: {
// //     color: 'white',
// //     fontSize: 20,
// //   },
// // });

// export default QRCodeScanner;
