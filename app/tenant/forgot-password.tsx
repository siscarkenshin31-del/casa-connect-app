import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
  const router = useRouter();

  // Logic Steps: 1 (Request), 2 (Verify), 3 (Reset)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const [contact, setContact] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOTP, setGeneratedOTP] = useState(''); // MOCK STORAGE
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  /** * BACKEND HANDOVER: Step 1
   * The developer will replace this with an API call to:
   * POST /api/auth/forgot-password { contact: string }
   */
  const handleSendOTP = () => {
    if (!contact) {
      Alert.alert("Error", "Please enter your email or phone number");
      return;
    }

    // Pure Frontend Simulation:
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOTP(mockOtp);
    
    Alert.alert("Demo Mode", `OTP sent to ${contact}: ${mockOtp}`);
    setStep(2);
  };

  /** * BACKEND HANDOVER: Step 2
   * The developer will replace this with an API call to:
   * POST /api/auth/verify-otp { contact: string, otp: string }
   */
  const handleVerifyOTP = () => {
    if (otp !== generatedOTP) {
      Alert.alert("Error", "Invalid OTP. In a real app, the backend checks this.");
      return;
    }

    Alert.alert("Success", "OTP Verified!");
    setStep(3);
  };

  /** * BACKEND HANDOVER: Step 3
   * The developer will replace this with an API call to:
   * POST /api/auth/reset-password { contact: string, newPassword: string }
   */
  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    Alert.alert("Success", "Password updated in mock database!");
    router.back();
  };

  return (
    <ImageBackground
      source={require('../images.png')}
      resizeMode="cover"
      style={styles.background}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.overlay}
      >
        <View style={styles.header}>
          <Text style={styles.appTitle}>FORGOT PASSWORD</Text>
          <Text style={styles.infoText}>Step {step} of 3</Text>
        </View>

        <View style={styles.formContainer}>
          {step === 1 && (
            <>
              <TextInput
                placeholder="Email or Phone Number"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={contact}
                onChangeText={setContact}
              />
              <TouchableOpacity style={styles.mainButton} onPress={handleSendOTP}>
                <Text style={styles.buttonText}>REQUEST OTP</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 2 && (
            <>
              <Text style={styles.infoText}>Enter the 6-digit code sent to you</Text>
              <TextInput
                placeholder="000000"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
              />
              <TouchableOpacity style={styles.mainButton} onPress={handleVerifyOTP}>
                <Text style={styles.buttonText}>VERIFY CODE</Text>
              </TouchableOpacity>
            </>
          )}

          {step === 3 && (
            <>
              <TextInput
                placeholder="New Password"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
              <TextInput
                placeholder="Confirm New Password"
                placeholderTextColor="#ccc"
                style={styles.input}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />
              <TouchableOpacity style={styles.mainButton} onPress={handleResetPassword}>
                <Text style={styles.buttonText}>UPDATE PASSWORD</Text>
              </TouchableOpacity>
            </>
          )}

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.linkText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, width: '100%', height: '100%' },
  imageStyle: { width: '100%', height: '100%' },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    justifyContent: 'center'
  },
  header: { alignItems: 'center', marginBottom: 40 },
  appTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    gap: 20
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
  },
  mainButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#2f95dc',
    elevation: 5
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    textDecorationLine: 'underline',
    opacity: 0.8
  },
  infoText: {
    color: '#fff',
    textAlign: 'center',
    opacity: 0.8
  }
});