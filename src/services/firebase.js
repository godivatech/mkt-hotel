import { initializeApp, getApps } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyB1AzcVwWPTXDT3Hm2F6CpJ2IxqtNCZKnk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "godivatech-websites.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "godivatech-websites",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "godivatech-websites.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1000295393026",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1000295393026:web:f7a6539d53e64ce858841b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DS3GEEV8LG"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);

// Multi-tenant collection path for MKT Shanthi Nivas under websites collection:
// websites/mkt-shanthi-nivas/bookings
// websites/mkt-shanthi-nivas/enquiries
const SITE_DOCUMENT_ID = 'mkt-shanthi-nivas';

/**
 * Save a room booking request to Firestore
 */
export async function saveBooking(bookingData) {
  try {
    const bookingsColRef = collection(db, 'websites', SITE_DOCUMENT_ID, 'bookings');
    const docRef = await addDoc(bookingsColRef, {
      ...bookingData,
      siteId: SITE_DOCUMENT_ID,
      hotelName: 'MKT Shanthi Nivas',
      status: 'pending',
      paymentStatus: 'Pay at Hotel',
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving booking to Firestore:', error);
    // Return gracefully so user experience doesn't break even if network/rules restrict
    return { success: false, error: error.message };
  }
}

/**
 * Save a contact enquiry to Firestore
 */
export async function saveEnquiry(enquiryData) {
  try {
    const enquiriesColRef = collection(db, 'websites', SITE_DOCUMENT_ID, 'enquiries');
    const docRef = await addDoc(enquiriesColRef, {
      ...enquiryData,
      siteId: SITE_DOCUMENT_ID,
      hotelName: 'MKT Shanthi Nivas',
      status: 'unread',
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving enquiry to Firestore:', error);
    return { success: false, error: error.message };
  }
}
