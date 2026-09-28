import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, onSnapshot, deleteDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../lib/firebase';

export interface UserTargetProfile {
  targetSat?: number;
  targetToefl?: number;
  dreamCountry?: string;
  intakeYear?: string;
  intendedMajor?: string;
  highSchoolBoard?: string;
}

export interface SavedCollegeItem {
  id: string;
  name: string;
  country?: string;
  satRequirement?: string;
  toeflRequirement?: string;
  deadline?: string;
  savedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  savedColleges: SavedCollegeItem[];
  isCollegeSaved: (id: string) => boolean;
  toggleSaveCollege: (college: { id: string; name: string; country?: string; satRequirement?: string; toeflRequirement?: string; deadline?: string }) => Promise<void>;
  milestones: string[];
  toggleMilestone: (milestoneId: string) => Promise<void>;
  profile: UserTargetProfile;
  updateProfile: (profile: Partial<UserTargetProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [savedColleges, setSavedColleges] = useState<SavedCollegeItem[]>([]);
  const [milestones, setMilestones] = useState<string[]>([]);
  const [profile, setProfile] = useState<UserTargetProfile>({});

  // 1. Listen for Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (currentUser) {
        // Sync user profile document
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const docSnap = await getDoc(userDocRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            setProfile(data.profile || {});
            if (Array.isArray(data.milestones)) {
              setMilestones(data.milestones);
            }
          } else {
            // Initialize document
            await setDoc(userDocRef, {
              email: currentUser.email,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
              createdAt: new Date().toISOString(),
              profile: {},
              milestones: []
            });
          }
        } catch (err) {
          console.warn('Error fetching user profile doc from Firestore:', err);
        }
      } else {
        // User logged out: fallback to local storage
        try {
          const localSaved = localStorage.getItem('globalpath_saved_colleges');
          if (localSaved) setSavedColleges(JSON.parse(localSaved));
          const localMilestones = localStorage.getItem('globalpath_milestones');
          if (localMilestones) setMilestones(JSON.parse(localMilestones));
        } catch {
          // ignore
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // 2. Real-time Firestore sync for saved colleges when logged in
  useEffect(() => {
    if (!user) return;

    try {
      const colRef = collection(db, 'users', user.uid, 'shortlist');
      const unsubscribe = onSnapshot(colRef, (snapshot) => {
        const items: SavedCollegeItem[] = [];
        snapshot.forEach((d) => {
          items.push({ id: d.id, ...d.data() } as SavedCollegeItem);
        });
        setSavedColleges(items);
        localStorage.setItem('globalpath_saved_colleges', JSON.stringify(items));
      }, (err) => {
        console.warn('Firestore snapshot error on shortlist:', err);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn('Failed to listen to shortlist collection:', e);
    }
  }, [user]);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Google Sign-in failed:', error);
      throw error;
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      setSavedColleges([]);
      setMilestones([]);
      setProfile({});
    } catch (error) {
      console.error('Sign-out failed:', error);
      throw error;
    }
  };

  const isCollegeSaved = (id: string) => {
    return savedColleges.some((c) => c.id === id);
  };

  const toggleSaveCollege = async (college: { id: string; name: string; country?: string; satRequirement?: string; toeflRequirement?: string; deadline?: string }) => {
    const exists = isCollegeSaved(college.id);
    const updated = exists
      ? savedColleges.filter((c) => c.id !== college.id)
      : [...savedColleges, { ...college, savedAt: new Date().toISOString() }];

    setSavedColleges(updated);
    try {
      localStorage.setItem('globalpath_saved_colleges', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (user) {
      try {
        const itemRef = doc(db, 'users', user.uid, 'shortlist', college.id);
        if (exists) {
          await deleteDoc(itemRef);
        } else {
          await setDoc(itemRef, {
            name: college.name,
            country: college.country || 'Global',
            satRequirement: college.satRequirement || 'Optional',
            toeflRequirement: college.toeflRequirement || '80+',
            deadline: college.deadline || 'Regular Decision',
            savedAt: new Date().toISOString()
          });
        }
      } catch (err) {
        console.warn('Firestore college save sync error:', err);
      }
    }
  };

  const toggleMilestone = async (milestoneId: string) => {
    const updated = milestones.includes(milestoneId)
      ? milestones.filter((m) => m !== milestoneId)
      : [...milestones, milestoneId];

    setMilestones(updated);
    try {
      localStorage.setItem('globalpath_milestones', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          milestones: updated,
          lastUpdated: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Firestore milestone sync error:', err);
      }
    }
  };

  const updateProfile = async (newProfile: Partial<UserTargetProfile>) => {
    const merged = { ...profile, ...newProfile };
    setProfile(merged);

    if (user) {
      try {
        const userDocRef = doc(db, 'users', user.uid);
        await updateDoc(userDocRef, {
          profile: merged,
          lastUpdated: new Date().toISOString()
        });
      } catch (err) {
        console.warn('Firestore profile update error:', err);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle,
        signOutUser,
        savedColleges,
        isCollegeSaved,
        toggleSaveCollege,
        milestones,
        toggleMilestone,
        profile,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
