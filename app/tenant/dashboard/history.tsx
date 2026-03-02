import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  SafeAreaView, 
  StatusBar,
  TouchableOpacity 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Calendar, MapPin, CheckCircle2, Clock, ChevronRight } from 'lucide-react-native';

const BOOKINGS = [
  { 
    id: '1', 
    property: 'Skyline Apartments', 
    date: 'Oct 12, 2023', 
    status: 'Confirmed', 
    amount: '₱15,000',
    location: 'Quezon City'
  },
  { 
    id: '2', 
    property: 'Greenview Terrace', 
    date: 'Sept 05, 2023', 
    status: 'Completed', 
    amount: '₱12,500',
    location: 'Makati'
  },
  { 
    id: '3', 
    property: 'Urban Loft Unit 4', 
    date: 'Aug 20, 2023', 
    status: 'Cancelled', 
    amount: '₱18,000',
    location: 'Taguig'
  },
];

export default function BookingHistory() {
  const renderBookingItem = ({ item }: any) => (
    <View style={styles.cardWrapper}>
      {/* The BlurView creates the "Glass" effect */}
      <BlurView intensity={80} tint="light" style={styles.glassCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.propertyName}>{item.property}</Text>
            <View style={styles.locationRow}>
              <MapPin size={14} color="#64748b" />
              <Text style={styles.locationText}>{item.location}</Text>
            </View>
          </View>
          <Text style={styles.amountText}>{item.amount}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.cardFooter}>
          <View style={styles.infoRow}>
            <Calendar size={16} color="#1e3a8a" />
            <Text style={styles.footerText}>{item.date}</Text>
          </View>
          
          <View style={[
            styles.statusBadge, 
            { backgroundColor: item.status === 'Cancelled' ? '#fee2e2' : '#dcfce7' }
          ]}>
            <Text style={[
              styles.statusText, 
              { color: item.status === 'Cancelled' ? '#ef4444' : '#16a34a' }
            ]}>
              {item.status}
            </Text>
          </View>
        </View>
      </BlurView>
    </View>
  );

  return (
    <LinearGradient colors={['#1e3a8a', '#3b82f6']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        
        <View style={styles.header}>
          <Text style={styles.title}>Booking History</Text>
          <Text style={styles.subtitle}>Manage your past and upcoming stays</Text>
        </View>

        <FlatList
          data={BOOKINGS}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: 25, paddingTop: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#FFF' },
  subtitle: { fontSize: 14, color: 'rgba(255,255,255,0.8)', marginTop: 5 },
  listContent: { padding: 20, paddingBottom: 100 },
  cardWrapper: {
    marginBottom: 20,
    borderRadius: 24,
    overflow: 'hidden', 
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  glassCard: {
    padding: 20,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  propertyName: { fontSize: 18, fontWeight: '700', color: '#1e293b' },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  locationText: { fontSize: 13, color: '#64748b', marginLeft: 4 },
  amountText: { fontSize: 16, fontWeight: '800', color: '#1e3a8a' },
  divider: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    marginVertical: 15,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: { flexDirection: 'row', alignItems: 'center' },
  footerText: { fontSize: 14, color: '#475569', marginLeft: 8, fontWeight: '500' },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: { fontSize: 12, fontWeight: '700' },
});