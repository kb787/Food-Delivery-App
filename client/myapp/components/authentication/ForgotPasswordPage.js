import React, { useState } from 'react';
import { View,Text, TextInput, Button, Alert,TouchableOpacity } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

const ForgotPasswordPage = () => {
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = () => {
    // Add your logic to handle password reset here
    if (otp.trim() === '') {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }

    if (newPassword.trim() === '') {
      Alert.alert('Error', 'Please enter the new password.');
      return;
    }
    fetch('apiEndpoint/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        otp,
        newPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        Alert.alert('Success', 'Password reset successful.');
      })
      .catch((error) => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', marginTop: '10%' }}>
    <Text style={{ fontSize: 20 ,marginBottom: 10, fontWeight: 'bold' }}>Set Your New Password</Text>
      <TextInput
        placeholder="Enter OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: 'gray', width: 300 }}
      />
      <TextInput
        placeholder="Enter New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
        style={{ marginBottom: 20, padding: 10, borderWidth: 1, borderColor: 'gray', width: 300 }}
      />
      <TouchableOpacity
      style={{ backgroundColor: 'rgb(194 65 12)',width: '85%', padding: 10, borderRadius: 5 }}
      onPress={handleResetPassword}
    >
      <Text style={{ color: 'white', textAlign: 'center' }}>Reset Password</Text>
    </TouchableOpacity>
    </View>
  );
};

export default ForgotPasswordPage;
