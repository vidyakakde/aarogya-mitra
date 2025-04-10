import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';

export default function LoginScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);

  const handleSendOtp = () => {
    // TODO: Implement OTP sending logic
    setShowOtp(true);
  };

  const handleVerifyOtp = () => {
    // TODO: Implement OTP verification logic
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=800' }}
          style={styles.headerImage}
        />
        <Text style={styles.title}>Aarogya Mitra</Text>
        <Text style={styles.subtitle}>Your Health Friend in Need</Text>
      </View>

      <View style={styles.form}>
        {!showOtp ? (
          <>
            <Text style={styles.label}>Enter Mobile Number</Text>
            <TextInput
              style={styles.input}
              placeholder="10-digit mobile number"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
            <TouchableOpacity
              style={[styles.button, phoneNumber.length !== 10 && styles.buttonDisabled]}
              onPress={handleSendOtp}
              disabled={phoneNumber.length !== 10}>
              <Text style={styles.buttonText}>Send OTP</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.label}>Enter OTP</Text>
            <TextInput
              style={styles.input}
              placeholder="6-digit OTP"
              keyboardType="number-pad"
              maxLength={6}
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity
              style={[styles.button, otp.length !== 6 && styles.buttonDisabled]}
              onPress={handleVerifyOtp}
              disabled={otp.length !== 6}>
              <Text style={styles.buttonText}>Verify OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={() => {
                setOtp('');
                handleSendOtp();
              }}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  headerImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E53935',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#E53935',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ffcdd2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  resendText: {
    color: '#E53935',
    fontSize: 14,
    fontWeight: '500',
  },
});