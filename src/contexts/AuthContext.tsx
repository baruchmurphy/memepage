import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../services/firebase';
import { firestore } from '../services/firebase';

const AuthContext = React.createContext<any>('');

// export type FirebaseUser = {
//     currentUser: any,
//     profile: any,
//     authLoading: boolean,
//     login: (
//         email: string, 
//         password: string
//     ) => void,
//     signup: (
//         email: string, 
//         password: string
//     ) => void,
//     logout: () => Promise<void>;
//     resetPassword: (
//         email: string
//     ) => void,
//     updateEmail: (
//         email: string
//     ) => any,
//     updatePassword: (
//         password: string
//     ) => any,
//     updateFavorites: (meme: {
//         url: string
//         name: string
//     }) => void,
// }

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
    const [authLoading, setAuthLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>();
    const [profile, setProfile] = useState<any>();

    const createProfile = async(user: any) => {
        try {
            const newUser = {
                uid: user.uid,
                email: user.email,
                favorites:[]
            };
            await firestore.collection('Users').doc(user.uid).set(newUser);
        } catch (error) {
            console.log(error)
        }
    };

    const signup = async(email: string, password: string) => {
        const { user }:any = await auth.createUserWithEmailAndPassword(email, password);
        if (user) {
            const providerData: string[] = []
            user.providerData.forEach((data: any) => {
                providerData.push(data.providerId)
            });
            const firebaseUser: any = {
                uid: user.uid,
                providerData,
                email: user.email,
            };
            await createProfile(firebaseUser)
            await getProfile(user.uid)
        } else {
            console.log('failed')
        }
    };

    const getProfile = async (id: string) => {
        const retrievedProfile = await firestore.collection('Users').doc(id).get();
        setProfile(retrievedProfile.data())
    }

    const resetPassword = (email: string) => {
        return auth.sendPasswordResetEmail(email)
    };

    const login = async(email: string, password: string) => {
       const userlogin = await auth.signInWithEmailAndPassword(email, password)
       try {
            if (userlogin) {
                const firestoreProfile = await firestore.collection('Users').where("email", "==", email).get()
                let docId = '';
                firestoreProfile.forEach((doc : any) => {
                    docId = doc.id
                });
                await getProfile(docId)
            } else {
                console.log('failed')
            }
        } catch (error) {
           return error
        }
    };

    const updateFavorites = (meme: {url:string, name:string}) => {   
        firestore.collection('Users').doc(currentUser.uid).update({favorites: [...profile.favorites, meme]})
    }

    const logout = () => {
       return auth.signOut()
    };

    const updateEmail = (email: string) => {
        return currentUser.updateEmail(email)
    };

    const updatePassword = (password: string) => {
        return currentUser.updatePassword(password)
    };

    useEffect(() =>{
        console.log(currentUser)
        const unsubscribe = auth.onAuthStateChanged(async function(user) {
            if (user) {
                if(!profile) {
                    await getProfile(user.uid)
                }
                setCurrentUser(user)
                setAuthLoading(false)
            } else {
                setCurrentUser(null)
                setAuthLoading(false)
            }
        });
        return unsubscribe
    }, [authLoading, profile, currentUser]);
    
    const value = {
        currentUser,
        profile,
        authLoading,
        login,
        signup,
        logout, 
        resetPassword,
        updateEmail,
        updatePassword,
        updateFavorites
    };

    return( 
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
