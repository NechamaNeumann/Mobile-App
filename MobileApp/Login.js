import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


 

const LoginScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [groupName, setGroupName] = useState('');

  const handleLogin = () => {
    if (name && groupName) {
      navigation.navigate('QRCode', { name, groupName });
    } else {
      alert('Please enter your name and your group name');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <Text style={styles.label}>Group Name:</Text>
      <TextInput
        style={styles.input}
        value={groupName}
        onChangeText={setGroupName}
        placeholder="Enter group name"
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
  },
});

export default LoginScreen;

