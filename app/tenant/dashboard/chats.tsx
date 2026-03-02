import React, { useState, useMemo } from 'react';
import { 
  StyleSheet, View, Text, TextInput, FlatList, 
  TouchableOpacity, SafeAreaView, StatusBar, Image 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search, User } from 'lucide-react-native';

// BACKEND SPEC: This is the expected interface for a Chat Object
interface ChatItem {
  id: string;
  name: string;
  message: string;
  time: string;
  online: boolean;
  avatar: string | null;
}

const MOCK_CHATS: ChatItem[] = [
  { id: '1', name: 'Jomar Tolentino', message: 'The sink is fixed now, thanks!', time: '2:45 PM', online: true, avatar: null },
  { id: '2', name: 'Pazon Nathaniel', message: 'When is the next inspection?', time: 'Yesterday', online: false, avatar: null },
  { id: '3', name: 'Kenshin Siscar', message: 'Wheres my key auh', time: 'Mon', online: true, avatar: null },
];

export default function TenantChats() {
  const [search, setSearch] = useState('');

  // FRONTEND LOGIC: Filtering the list based on search input
  const filteredChats = useMemo(() => {
    return MOCK_CHATS.filter(chat => 
      chat.name.toLowerCase().includes(search.toLowerCase()) ||
      chat.message.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity 
      style={styles.chatCard}
      onPress={() => console.log(`Maps to chat with ${item.id}`)}
    >
      <View style={styles.avatarContainer}>
        <View style={styles.avatarPlaceholder}>
          {item.avatar ? (
            <Image source={{ uri: item.avatar }} style={styles.avatarImage} />
          ) : (
            <User color="#666" size={24} />
          )}
        </View>
        {item.online && <View style={styles.onlineBadge} />}
      </View>
      
      <View style={{ flex: 1 }}>
        <View style={styles.chatHeader}>
          <Text style={styles.personName}>{item.name}</Text>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <Text style={styles.messagePreview} numberOfLines={1}>
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={['#4568c9', '#2c72e4']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        
        <View style={styles.headerSection}>
          <Text style={styles.title}>Messages</Text>
          <View style={styles.searchBar}>
            <Search color="#888" size={20} style={{ marginLeft: 10 }} />
            <TextInput 
              placeholder="Search conversations..." 
              placeholderTextColor="#888"
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={filteredChats}
            keyExtractor={(item) => item.id}
            renderItem={renderChatItem}
            contentContainerStyle={{ paddingBottom: 100, paddingTop: 10 }}
            ListEmptyComponent={
              <Text style={styles.emptyText}>No conversations found</Text>
            }
          />   
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerSection: { padding: 20, paddingTop: 20 },
  title: { fontSize: 28, fontWeight: '800', color: '#FFF', marginBottom: 15 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 12,
    height: 45,
    paddingHorizontal: 10,
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 16 },
  listContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 10,
    paddingTop: 20,
  },
  chatCard: {
    flexDirection: 'row',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 12,
    backgroundColor: '#FFF',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  avatarContainer: { position: 'relative', marginRight: 15 },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },
  avatarImage: { width: '100%', height: '100%' },
  onlineBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#22c55e',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  chatHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  personName: { fontSize: 16, fontWeight: '700', color: '#1e293b' },
  timeText: { fontSize: 12, color: '#94a3b8' },
  messagePreview: { fontSize: 14, color: '#64748b', marginTop: 2 },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 80,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9'
  },
  navItem: { alignItems: 'center' },
  activeIndicator: {
    backgroundColor: '#3b82f6',
    padding: 8,
    borderRadius: 12,
    marginBottom: 2
  },
  navText: { fontSize: 11, color: '#A0AEC0' },
  emptyText:{
    backgroundColor: '#3b82f6',
    padding: 8,
    borderRadius: 12,
    marginBottom: 2
  }
});