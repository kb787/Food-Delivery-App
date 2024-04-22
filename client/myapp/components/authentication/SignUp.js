import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {Link, useNavigation} from '@react-navigation/native';
import axios from 'axios';

const SignUp = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigation = useNavigation();

  const handleUserSignUp = async () => {
    if (!userName || !userEmail || !userPassword) {
      Alert.alert('Entering all fields is mandatory');
    }
    try {
      const registerResponse = await axios.post(
        'http://192.168.159.177:3500/v1/api/auth/signup-user',
        {
          userName: userName,
          userEmail: userEmail,
          userPassword: userPassword,
        },
      );
      if (registerResponse.data.success) {
        Alert.alert('Sign-Up successfull');
        navigation.navigate('SignIn');
      } else {
        Alert.alert('User Already Exists');
      }
    } catch (error) {
      Alert.alert(` Unable to login due to error ${error}`);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.headingText}>
          Create your account in simple steps !
        </Text>
        <TextInput
          type="text"
          style={styles.textInputStyling}
          value={userName}
          onChangeText={text => setUserName(text)}
          placeholder="Enter your user name"
        />
        <TextInput
          keyboardType="email-address"
          style={styles.textInputStyling}
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
          placeholder="Enter your email address"
        />
        <TextInput
          type="password"
          style={styles.textInputStyling}
          value={userPassword}
          onChangeText={text => setUserPassword(text)}
          placeholder="Enter your password"
          secureTextEntry={true}
        />
        <TouchableOpacity
          style={styles.textButtonOuterStyling}
          onPress={handleUserSignUp}>
          <Text style={styles.textButtonInnerStyling}>Sign Up</Text>
        </TouchableOpacity>
        <Link to={{screen: 'SignIn'}} style={styles.bottomTextStyling}>
          Already having an account Sign In Here !
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgb(248 250 252)',
  },
  formContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: '2%',
  },
  headingCollection: {
    display: 'flex',
    justifyContent: 'center',
    padding: '5%',
    flexDirection: 'row',
    gap: 8,
  },
  headingText: {
    fontSize: 18,
    paddingTop: 1,
    textAlign: 'center',
  },
  fontIconContainer: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    borderRadius: 50,
  },
  textInputStyling: {
    display: 'flex',
    width: '85%',
    height: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '5%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 6,
    textAlign: 'center',
  },
  textButtonOuterStyling: {
    backgroundColor: 'rgb(194 65 12)',
    color: 'white',
    width: '85%',
    height: '12%',
    marginTop: '5%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButtonInnerStyling: {
    textAlign: 'center',
    fontSize: 18,
    color: 'white',
  },
  bottomTextStyling: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: '7%',
  },
});
