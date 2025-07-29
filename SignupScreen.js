import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { auth, db } from '../firebaseConfig';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSignup = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      // Save user info in Firestore
      await db.collection('users').doc(uid).set({
        fullName,
        phone,
        email,
        createdAt: new Date(),
        isVerifiedHost: false
      });

      navigation.replace('Home');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View>
      <Text>Sign Up</Text>
      <TextInput placeholder="Full Name" value={fullName} onChangeText={setFullName} />
      <TextInput placeholder="Phone Number" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignup} />
      <Text onPress={() => navigation.navigate('Login')}>Already have an account? Log in</Text>
    </View>
  );
}
