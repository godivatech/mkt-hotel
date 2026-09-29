import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot, 
  serverTimestamp 
} from 'firebase/firestore';

// Configuration read strictly from environment variables (.env)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const hasValidConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.projectId);

// Initialize Firebase safely
let app = null;
let db = null;

if (hasValidConfig) {
  app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  db = getFirestore(app);
} else {
  console.warn('[Firebase] Missing environment variables. Please check your .env configuration.');
}

export { db };

// Multi-tenant collection path for MKT Shanthi Nivas under websites collection:
// websites/mkt-shanthi-nivas/bookings
// websites/mkt-shanthi-nivas/enquiries
const SITE_DOCUMENT_ID = 'mkt-shanthi-nivas';

/**
 * Save a room booking request to Firestore
 */
export async function saveBooking(bookingData) {
  if (!db) {
    console.warn('[Firebase] Database not initialized. Booking not saved to Firestore.');
    return { success: false, error: 'Database not initialized' };
  }

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
    return { success: false, error: error.message };
  }
}

/**
 * Save a contact enquiry to Firestore
 */
export async function saveEnquiry(enquiryData) {
  if (!db) {
    console.warn('[Firebase] Database not initialized. Enquiry not saved to Firestore.');
    return { success: false, error: 'Database not initialized' };
  }

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

/**
 * Subscribe to real-time Bookings list
 */
export function subscribeToBookings(onData, onError) {
  if (!db) {
    if (onData) onData([]);
    return () => {};
  }

  try {
    const bookingsColRef = collection(db, 'websites', SITE_DOCUMENT_ID, 'bookings');
    return onSnapshot(bookingsColRef, (snapshot) => {
      const bookings = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAtFormatted: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleString() : new Date().toLocaleString()
      }));
      bookings.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      onData(bookings);
    }, (error) => {
      console.error('Error listening to bookings:', error);
      if (onError) onError(error);
    });
  } catch (err) {
    console.error('Error setting up bookings listener:', err);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Subscribe to real-time Enquiries list
 */
export function subscribeToEnquiries(onData, onError) {
  if (!db) {
    if (onData) onData([]);
    return () => {};
  }

  try {
    const enquiriesColRef = collection(db, 'websites', SITE_DOCUMENT_ID, 'enquiries');
    return onSnapshot(enquiriesColRef, (snapshot) => {
      const enquiries = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAtFormatted: doc.data().createdAt?.toDate ? doc.data().createdAt.toDate().toLocaleString() : new Date().toLocaleString()
      }));
      enquiries.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      onData(enquiries);
    }, (error) => {
      console.error('Error listening to enquiries:', error);
      if (onError) onError(error);
    });
  } catch (err) {
    console.error('Error setting up enquiries listener:', err);
    if (onError) onError(err);
    return () => {};
  }
}

/**
 * Update booking status ('confirmed' | 'cancelled' | 'pending')
 */
export async function updateBookingStatus(bookingId, status) {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const bookingDocRef = doc(db, 'websites', SITE_DOCUMENT_ID, 'bookings', bookingId);
    await updateDoc(bookingDocRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating booking status:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete a booking document
 */
export async function deleteBooking(bookingId) {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const bookingDocRef = doc(db, 'websites', SITE_DOCUMENT_ID, 'bookings', bookingId);
    await deleteDoc(bookingDocRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting booking:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Update enquiry status ('read' | 'replied' | 'unread')
 */
export async function updateEnquiryStatus(enquiryId, status) {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const enquiryDocRef = doc(db, 'websites', SITE_DOCUMENT_ID, 'enquiries', enquiryId);
    await updateDoc(enquiryDocRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating enquiry status:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Delete an enquiry document
 */
export async function deleteEnquiry(enquiryId) {
  if (!db) return { success: false, error: 'Database not initialized' };

  try {
    const enquiryDocRef = doc(db, 'websites', SITE_DOCUMENT_ID, 'enquiries', enquiryId);
    await deleteDoc(enquiryDocRef);
    return { success: true };
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return { success: false, error: error.message };
  }
}
