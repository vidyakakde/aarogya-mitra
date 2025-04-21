import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "@/lib/firebase";
import { router } from 'expo-router';

const PhoneAuth = () => {

  const userIdFromLocalStorage = localStorage.getItem("userId");

  const [userId, setUserId] = useState(userIdFromLocalStorage);

  if (userId) {
    alert("alreday logged in")
  }

  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirm, setConfirm] = useState<any>(null);
  const [code, setCode] = useState('');
  const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

  useEffect(() => {
    if (!recaptchaVerifierRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "normal",
        callback: (response: any) => {
          console.log("reCAPTCHA verified:", response);
        },
        "expired-callback": () => {
          console.log("reCAPTCHA expired, resetting...");
          recaptchaVerifierRef.current?.clear();
        },
      });
    }

    return () => {
      recaptchaVerifierRef.current?.clear();
    };
  }, []);

  // Send OTP
  const signInWithPhoneNumberFn = async (phoneNumber: string) => {
    try {
      if (recaptchaVerifierRef.current) {
        const confirmation = await signInWithPhoneNumber(auth, `+91${phoneNumber}`, recaptchaVerifierRef.current);
        setConfirm(confirmation);
      } else {
        console.warn('RecaptchaVerifier not initialized yet.');
      }
    } catch (error: any) {
      console.error("Error sending OTP:", error);
      alert('Error sending OTP: ' + error?.message);
    }
  };

  // Confirm OTP
  const confirmCode = async () => {
    try {
      await confirm.confirm(code);
      alert('Phone authentication successful!');
      localStorage.setItem("userId", phoneNumber);
      router.replace('/');
    } catch (error) {
      alert('Invalid code.');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      {/* Add a container for the RecaptchaVerifier (must be present in the DOM) */}
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
          {!confirm ? (
            <>
              <Text style={styles.label}>Enter Mobile Number</Text>
              <TextInput
                style={styles.input}
                value={phoneNumber}
                placeholder="Enter phone number"
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                maxLength={10}
              />
              <View id="recaptcha-container"></View>
              <TouchableOpacity
                style={[styles.button, phoneNumber.length !== 10 && styles.buttonDisabled]}
                onPress={() => signInWithPhoneNumberFn(phoneNumber)}
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
                value={code}
                onChangeText={setCode}
              />
              <TouchableOpacity
                style={[styles.button, code.length !== 6 && styles.buttonDisabled]}
                onPress={confirmCode}
                disabled={code.length !== 6}>
                <Text style={styles.buttonText}>Verify OTP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.resendButton}
                onPress={confirmCode}
              >
                <Text style={styles.resendText}>Resend OTP</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default PhoneAuth;


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
