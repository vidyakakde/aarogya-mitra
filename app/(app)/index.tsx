import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ambulance, Building2, ChevronFirst as FirstAid, Phone } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState } from 'react';

const EMERGENCY_SERVICES = [
  {
    id: 1,
    title: 'Ambulance',
    icon: Ambulance,
    color: '#E53935',
  },
  {
    id: 2,
    title: 'Nearby Hospital',
    icon: Building2,
    color: '#1E88E5',
  },
  {
    id: 3,
    title: 'First Aid',
    icon: FirstAid,
    color: '#43A047',
  },
  {
    id: 4,
    title: 'Emergency Contact',
    icon: Phone,
    color: '#FB8C00',
  },
];

export default function EmergencyScreen() {

  const userIdFromLocalStorage = localStorage.getItem("userId");

  const [userId, setUserId] = useState(userIdFromLocalStorage);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    router.push("/(auth)/login");
  }

  return (
    <View style={styles.container}>

      <View style={{
          display: 'flex',
          marginTop: 60,
          marginHorizontal: 20,
          justifyContent: 'center',
        }}>
        <View style={{
          alignItems: 'flex-end',
          marginHorizontal: 20,
          justifyContent: 'center',
        }}>
          {userId &&
            <p>User ID: {userId}</p>
          }
          {
            userId ?
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff', backgroundColor: '#008000', padding: 10, borderRadius: 10 }} onPress={() => handleLogout()}>Logout</Text>
              :
              <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff', backgroundColor: '#008000', padding: 10, borderRadius: 10 }} onPress={() => router.push('/(auth)/login')}>Login</Text>
          }
        </View>

        <View style={styles.header} >
          <Text style={styles.headerTitle}>Emergency Services</Text>
          <Text style={styles.headerSubtitle}>Quick access to emergency assistance</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.servicesGrid}>
          {EMERGENCY_SERVICES.map(service => (
            <TouchableOpacity
              key={service.id}
              style={[styles.serviceCard, { borderColor: service.color }]}>
              <View style={[styles.iconContainer, { backgroundColor: service.color }]}>
                <service.icon size={32} color="#fff" />
              </View>
              <Text style={styles.serviceTitle}>{service.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.helpSection}>
          <Text style={styles.sectionTitle}>Need Immediate Help?</Text>
          <TouchableOpacity style={styles.sosButton}>
            <Text style={styles.sosButtonText}>SOS</Text>
          </TouchableOpacity>
          <Text style={styles.helpText}>
            Press the SOS button to alert nearby Aarogya Mitras
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f1f1f1',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  serviceCard: {
    width: '45%',
    margin: '2.5%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    borderWidth: 2,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  helpSection: {
    padding: 20,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  sosButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E53935',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E53935',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  sosButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    paddingHorizontal: 40,
  },
});