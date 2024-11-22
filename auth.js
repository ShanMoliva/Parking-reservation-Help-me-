import { auth, database, storage } from './firebaseconfig.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";
export { auth, database, storage };

// Sign in function
async function signIn(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log("User signed in:", userCredential.user);
    } catch (error) {
        console.error("Error signing in:", error);
    }
}

// Sign up function
async function signUp(email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("User signed up:", userCredential.user);
    } catch (error) {
        console.error("Error signing up:", error);
    }
}

// Register a new user
export const registerUser = async (email, password, fullName, role, profilePic) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const storageRefProfile = storageRef(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRefProfile, profilePic);
        const profilePicURL = await getDownloadURL(storageRefProfile);

        await set(ref(database, 'users/' + user.uid), {
            fullName: fullName,
            email: email,
            role: role,
            profilePic: profilePicURL
        });

        return user;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error; // Rethrow the error to handle it in the calling code
    }
};

// Log in a user
export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// Fetch user data
export const getUserData = async (userId) => {
    try {
        const userRef = ref(database, 'users/' + userId);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
            return snapshot.val();
        } else {
            console.error("No data available for user:", userId);
            return null;
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};

export { signIn, signUp };

// Function to send a request to become a Parking Manager
export const sendAdminRequest = async (userId, username) => {
    const request = {
        userId: userId,
        username: username, // Include username for tracking
        requestType: 'becomeParkingManager',
        status: 'pending',
        timestamp: Date.now(),
    };

    try {
        const requestsRef = ref(database, 'adminRequests'); // Path to admin requests
        const newRequestRef = push(requestsRef); // Generate a new reference
        await set(newRequestRef, request); // Save the request
        return true; // Indicate success
    } catch (error) {
        console.error("Error sending admin request:", error);
        return false; // Indicate failure
    }
};