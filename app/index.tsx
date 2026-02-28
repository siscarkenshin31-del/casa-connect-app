import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Alert,
  ImageBackground, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  TextInput
} from 'react-native';
import { useRouter } from 'expo-router';

// --- BACKEND SPECIFICATION SECTION ---
// This mimics the API calls your backend developer will need to implement.
interface LoginResponse {
  success: boolean;
  user?: { uid: string; role: string };
  message?: string;}
const MockAuthService = {
  login: async (email: string, password: string, role: string): Promise<LoginResponse> => {
    console.log(`API Call: POST /api/login | Data:`, { email, password, role });
    // Simulate a network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // For testing: accept any login that isn't empty
        if (email && password) {
          resolve({ success: true, user: { uid: '12345', role: role } });
        } else {
          resolve({ success: false, message: 'Invalid credentials' });
        }
      }, 1000);
    });
  }
};

export default function RoleSelection() {
  const router = useRouter();
  const [role, setRole] = useState<'tenant' | 'landowner'>('tenant');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const activeColor = role === 'tenant' ? '#2f95dc' : '#f4511e';

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    
    // Call the mock service instead of Firebase directly
    const response: any = await MockAuthService.login(email, password, role);
    
    setLoading(false);

    if (response.success) {
      Alert.alert("Success", `Frontend verified. Sending to ${role} dashboard.`);
      router.replace(`../${role}/dashboard`);
    } else {
      Alert.alert("Login Failed", response.message);
    }
  };

  return (
    <ImageBackground 
      source={require('./images.png')} 
      resizeMode="cover"   
      style={styles.background}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={styles.overlay}
      >
        <View style={styles.header}>
          <Text style={styles.appTitle}>CASA</Text>
          <Text style={[styles.appTitle, { marginTop: -15 }]}>CONNECT</Text>
          <Text style={styles.choose}>Choose a Role</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, role === 'tenant' && styles.activeTenant]}
              onPress={() => setRole('tenant')}
            >
              <Text style={styles.tabText}>Tenant Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tab, role === 'landowner' && styles.activeLandowner]}
              onPress={() => setRole('landowner')}
            >
              <Text style={styles.tabText}>Landowner Login</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#ccc"
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <TouchableOpacity 
            style={[styles.mainButton, { backgroundColor: activeColor }]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "AUTHENTICATING..." : `LOGIN AS ${role.toUpperCase()}`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push(`/${role}/signup`)}>
            <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push(`/${role}/forgot-password`)}>
            <Text style={styles.linkText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { 
    flex: 1,
    width: '100%',     
    height: '100%',    
  },
  imageStyle: {
    width: '100%',
    height: '100%',
  },
  overlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
    padding: 20,
    justifyContent: 'center' 
  },
  header: { 
    alignItems: 'center', 
    marginBottom: 60 
  },
  appTitle: { 
    color: '#fdfdfd', 
    fontSize: 48, 
    fontWeight: 'bold', 
    letterSpacing: 2 
  },
  choose: { 
    color: '#fdfdfd', 
    fontSize: 18, 
    padding: 30,
    fontWeight: 'bold', 
    letterSpacing: 2 
  },
  formContainer: { 
    width: '100%',
    maxWidth: 400,   
    alignSelf: 'center',
    gap: 20 
  },
  tabContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    marginBottom: 20 
  },
  tab: { 
    paddingVertical: 10, 
    width: '45%', 
    alignItems: 'center' 
  },
  tabText: { 
    color: '#fff', 
    fontWeight: '600',
    fontSize: 16 
  },
  mainButton: { 
    padding: 18, 
    borderRadius: 12, 
    alignItems: 'center',
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
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    fontSize: 16,
  },
  activeTenant: {
    backgroundColor: '#2f95dc',
    borderRadius: 10,   
  },
  activeLandowner: {
    backgroundColor: '#f4511e',
    borderRadius: 10,   
  },
});