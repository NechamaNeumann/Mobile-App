import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import axios from 'axios';

const ScanScreen = ({ navigation }) => {
  const [ipAddress, setIpAddress] = useState('');
  const [manualIP, setManualIP] = useState('');

  const onSuccess = e => {
    const qrCodeData = e.data;
    const ip = extractIPAddress(qrCodeData);
    if (ip) {
      setIpAddress(ip);
      sendRestRequest(ip);
    } else {
      Alert.alert('Error', 'No IP address found in QR code');
    }
  };

  const extractIPAddress = qrCodeData => {
    const ipRegex = /(\d{1,3}\.){3}\d{1,3}/;
    const match = qrCodeData.match(ipRegex);
    return match ? match[0] : null;
  };

  const sendRestRequest = ip => {
    axios.post(`http://${ip}/connect`, { device: 'mobile' })
      .then(response => {
        if (response.status === 200) {
          navigation.navigate('DefaultBasketScreen');
        } else {
          Alert.alert('Error', 'Failed to connect to device');
        }
      })
      .catch(error => {
        Alert.alert('Error', `Failed to connect to device: ${error.message}`);
      });
  };

  const handleManualIPSubmit = () => {
    sendRestRequest(manualIP);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={<Text style={styles.centerText}>Scan the QR code to connect to the machine</Text>}
        bottomContent={
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter IP manually"
              value={manualIP}
              onChangeText={setManualIP}
              keyboardType="numeric"
            />
            <Button title="Submit" onPress={handleManualIPSubmit} />
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerText: {
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '80%',
  },
});

export default ScanScreen;
