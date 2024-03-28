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

const SignIn = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigation = useNavigation();

  const handleUserSignIn = async () => {
    if (!userEmail || !userPassword) {
      Alert.alert('Entering all fields is mandatory');
    }
    try {
      const postResponse = await axios.post(
        'http://192.168.79.116:3500/v1/api/auth/signin-user ',
        {
          userEmail: userEmail,
          userPassword: userPassword,
        },
      );
      if (postResponse.data.success) {
        Alert.alert('Sign-In Successfull');
      } else {
        Alert.alert('Invalid credentials for the user');
      }
    } catch (error) {
      Alert.alert(` Unable to login due to error ${error}`);
    }
  };
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.headingText}>Verify your Credentials here !</Text>
        <TextInput
          style={styles.textInputStyling}
          value={userEmail}
          onChangeText={text => setUserEmail(text)}
          placeholder="Enter your email address"
        />
        <TextInput
          style={styles.textInputStyling}
          value={userPassword}
          onChangeText={text => setUserPassword(text)}
          placeholder="Enter your password"
        />
        <TouchableOpacity
          style={styles.textButtonOuterStyling}
          onPress={handleUserSignIn}>
          <Text style={styles.textButtonInnerStyling}>Sign In</Text>
        </TouchableOpacity>
        <Link to={{screen: 'SignUp'}} style={styles.bottomTextStyling}>
          Not having an account Sign Up Here !
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

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
    borderWidth: 4,
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
