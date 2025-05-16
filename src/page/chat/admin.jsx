import React, { useState, useEffect } from "react";
import { auth, db } from "../../firbase";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [isGuestMode, setIsGuestMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Listen for authentication changes
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(currentUser.email === "alanbarznji91@gmail.com"); // Set your admin email
        setIsGuestMode(false); // If logged in, switch to admin mode
      } else {
        setUser(null);
        setIsAdmin(false);
        setIsGuestMode(true); // If not logged in, stay in guest mode
      }
    });

    // Fetch messages in real-time
    const messagesRef = collection(db, "messages");
    const unsubscribe = onSnapshot(messagesRef, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    if (isGuestMode && guestName.trim() === "") {
      alert("Please enter your name before sending a message.");
      return;
    }

    const senderName = isAdmin ? "Admin" : guestName || "Guest";

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      sender: senderName,
      timestamp: Date.now(),
    });

    setNewMessage("");
  };

  const handleDelete = async (id) => {
    if (!isAdmin) return; // Ensure only admins can delete messages
    await deleteDoc(doc(db, "messages", id));
  };

  const handleSignOut = () => {
    signOut(auth);
    setIsGuestMode(true); // Go back to guest mode on sign out
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <h2>Live Chat</h2>

      {/* Toggle between Guest and Admin Mode */}
      <button onClick={() => setIsGuestMode(!isGuestMode)}>
        {isGuestMode ? "Switch to Admin Login" : "Continue as Guest"}
      </button>

      {/* Admin Login Form */}
      {!isGuestMode && !user && (
        <form onSubmit={handleSignIn}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Admin Email"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit">Login</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      )}

      {/* Guest Name Input */}
      {isGuestMode && !user && (
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Enter your name (required)"
        />
      )}

      {/* If user is admin, show logout button */}
      {user && isAdmin && (
        <>
          <p>Welcome, {user.email} (Admin)!</p>
          <button onClick={handleSignOut}>Sign Out</button>
        </>
      )}

      {/* Chat messages */}
      <div>
        {messages.map((msg) => (
          <p key={msg.id}>
            <strong>{msg.sender}: </strong>
            {msg.text}
            {isAdmin && <button onClick={() => handleDelete(msg.id)}>🗑 Delete</button>}
          </p>
        ))}
      </div>

      {/* Message Input */}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
