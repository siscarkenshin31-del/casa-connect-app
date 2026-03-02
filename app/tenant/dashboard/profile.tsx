import React, { useState } from 'react';
import { 
  StyleSheet, View, Text, ScrollView, TouchableOpacity, 
  Image, TextInput, SafeAreaView, StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { 
  Camera, Edit2, Check, CreditCard, 
  Settings, ShieldCheck, Wallet, ChevronRight 
} from 'lucide-react-native';

export default function TenantProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Kenshin Siscar',
    bio: 'Looking for a cozy place near the Metro. Architecture student and minimalist.',
    email: 'kenshin.siscar@example.com'
  });

  return (
    <LinearGradient colors={['#1e3a8a', '#3b82f6']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        
        {/* Top Header Icons */}
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.iconCircle}>
            <Settings color="#FFF" size={20} />
          </TouchableOpacity>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          {/* Profile Image Section */}
          <View style={styles.profileHeader}>
            <View style={styles.imageContainer}>
              <View style={styles.avatarCircle}>
                <Image 
                  source={{ uri: 'https://i.pinimg.com/736x/fd/f4/37/fdf437ac958add68426bfe169cbec1de.jpg' }} 
                  style={styles.avatarImage} 
                />
                <TouchableOpacity style={styles.cameraBadge}>
                  <Camera color="#FFF" size={16} />
                </TouchableOpacity>
              </View>
            </View>

            {isEditing ? (
              <TextInput 
                style={styles.nameInput}
                value={userInfo.name}
                onChangeText={(t) => setUserInfo({...userInfo, name: t})}
              />
            ) : (
              <Text style={styles.userName}>{userInfo.name}</Text>
            )}
            
            <View style={styles.badgeRow}>
              <ShieldCheck color="#60a5fa" size={16} />
              <Text style={styles.verifiedText}>Verified Tenant</Text>
            </View>
          </View>

          {/* Bio Section */}
          <BlurView intensity={60} tint="light" style={styles.glassCard}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>About Me</Text>
              <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
                {isEditing ? <Check color="#1e3a8a" size={20} /> : <Edit2 color="#1e3a8a" size={18} />}
              </TouchableOpacity>
            </View>
            
            {isEditing ? (
              <TextInput 
                style={styles.bioInput}
                value={userInfo.bio}
                multiline
                onChangeText={(t) => setUserInfo({...userInfo, bio: t})}
              />
            ) : (
              <Text style={styles.bioText}>{userInfo.bio}</Text>
            )}
          </BlurView>

          {/* Payment Methods Section */}
          <Text style={styles.listLabel}>Linked E-Wallets</Text>
          <View style={styles.paymentRow}>
            {['GCash', 'Maya', 'GrabPay'].map((wallet) => (
              <BlurView key={wallet} intensity={40} tint="light" style={styles.paymentBox}>
                <Wallet color="#FFF" size={24} />
                <Text style={styles.walletLabel}>{wallet}</Text>
              </BlurView>
            ))}
          </View>

          {/* Featured Connection: Loyalty/History */}
          <BlurView intensity={80} tint="light" style={styles.featureCard}>
            <View style={styles.featureIcon}>
              <CreditCard color="#1e3a8a" size={24} />
            </View>
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={styles.featureTitle}>Tenant Score: 850</Text>
              <Text style={styles.featureSub}>High score unlocks lower security deposits!</Text>
            </View>
            <ChevronRight color="#94a3b8" size={20} />
          </BlurView>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topHeader: { flexDirection: 'row', justifyContent: 'flex-end', padding: 20 },
  iconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  profileHeader: { alignItems: 'center', marginBottom: 25 },
  imageContainer: { marginBottom: 15 },
  avatarCircle: { width: 110, height: 110, borderRadius: 55, borderWidth: 4, borderColor: '#FFF', overflow: 'visible' },
  avatarImage: { width: '100%', height: '100%', borderRadius: 55 },
  cameraBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#3b82f6', padding: 8, borderRadius: 20, borderWidth: 2, borderColor: '#FFF' },
  userName: { fontSize: 24, fontWeight: '800', color: '#FFF' },
  nameInput: { fontSize: 24, fontWeight: '800', color: '#FFF', borderBottomWidth: 1, borderBottomColor: '#FFF', textAlign: 'center' },
  badgeRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  verifiedText: { color: '#bfdbfe', marginLeft: 6, fontSize: 14, fontWeight: '600' },
  glassCard: { padding: 20, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#1e3a8a' },
  bioText: { fontSize: 14, color: '#475569', lineHeight: 20 },
  bioInput: { fontSize: 14, color: '#1e3a8a', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: 8, padding: 10 },
  listLabel: { color: '#FFF', fontSize: 16, fontWeight: '700', marginTop: 25, marginBottom: 15 },
  paymentRow: { flexDirection: 'row', justifyContent: 'space-between' },
  paymentBox: { width: '30%', padding: 15, borderRadius: 20, alignItems: 'center', overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  walletLabel: { color: '#FFF', fontSize: 12, marginTop: 8, fontWeight: '600' },
  featureCard: { marginTop: 20, padding: 15, borderRadius: 20, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' },
  featureIcon: { width: 50, height: 50, backgroundColor: '#dbeafe', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  featureTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  featureSub: { fontSize: 12, color: '#64748b', marginTop: 2 }
});