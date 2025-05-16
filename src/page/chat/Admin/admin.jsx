import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firbase";
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import ChatCast from "../components/ChatCast";
import Chatting from "./components/Chating";
import SlidBar from "./components/SlideBar";

const AdminChat = () => {
  const [messages, setMessages] = useState([]);
  const [Usermessages, setUserMessages] = useState([]);
  const [UniquUsermessages, setUniquUserMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Sessions,setSessions]=useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
 
        setUser(currentUser);
        setIsAdmin("alanbarznji91@gmail.com");
        setIsGuestMode(false);
 
    });

    const sessionId = localStorage.getItem("chatSessionId");
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("sessionId", "==", Sessions));
 
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    console.log('====================================');
    console.log(Sessions);
    console.log('====================================');
    return () => unsubscribe();
  }, [isAdmin,Sessions]);
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(currentUser.email === "alanbarznji91@gmail.com");
        setIsGuestMode(false);
      } else {
        setUser(null);
        setIsAdmin(false);
        setIsGuestMode(true);
      }
    });

 
    const messagesRefuser = collection(db, "messages");
    const qu = query(messagesRefuser,where("role","==","Guest"));
 
 
    const unsubscribeuser = onSnapshot(qu, (snapshot) => {
      setUserMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

    });

    return () =>  unsubscribeuser();
  }, [isAdmin]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;

    const sessionKey = "chatSessionId";
    let sessionId = localStorage.getItem(sessionKey);

    if (!isAdmin && !sessionId) {
      sessionId = Math.random().toString(36).substr(2, 9);
      localStorage.setItem(sessionKey, sessionId);
    }

    await addDoc(collection(db, "messages"), {
      text: newMessage,
      role:  "Admin" ,
      email:  "alanbarznji91@gmail.com" ,
      sessionId:Sessions,
      timestamp: Date.now(),
    });

    setNewMessage("");
  };

  const handleDelete = async () => {
    if (!isAdmin) return;

    const sessionId = localStorage.getItem("chatSessionId");
    if (!sessionId) return;

    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("sessionId", "==", Sessions));
console.log('====================================');
console.log(Sessions);
console.log('====================================');
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (message) => {
      await deleteDoc(doc(db, "messages", message.id));
    });
  };

  const handleSignOut = () => {
    signOut(auth);
    setIsGuestMode(true);
  };
  useEffect(()=>{
    setUniquUserMessages(
      [...new Set(Usermessages.map((item) => item.name))].map((email) =>
        Usermessages.find((item) => item.name === email)
      )
    );
  },[Usermessages])
 

  const updateSessionId = async (sessionId) => {
    try {
      // ✅ Query all messages with the sessionId
      console.log('====================================');
      console.log(Sessions);
      console.log('====================================');
      const messagesRef = collection(db, "messages");
      const q = query(messagesRef, where("sessionId", "==", Sessions));
  
      // ✅ Get matching documents
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        console.log("No messages found with this sessionId.");
        return;
      }
  console.log('====================================');
  console.log(querySnapshot);
  console.log('====================================');
      // ✅ Update each document in Firestore
      querySnapshot.forEach(async (docSnap) => {
        const docRef = doc(db, "messages", docSnap.id);
        await updateDoc(docRef, { sessionId: "" });
      });
  
      console.log("Session ID updated successfully!");
    } catch (error) {
      console.error("Error updating messages: ", error);
    }
  };
  

// Call the function
 
  // console.log('====================================');
  // console.log(Usermessages.sort((a,b)=>a.timestamp-b.timestamp),"sdkdsjsdk");
  // console.log('====================================');
  console.log('====================================');
  console.log(UniquUsermessages,"fdfdfddf",Sessions);
  console.log('====================================');
  return (
    <div className="w-full h-screen grid grid-cols-4">
      <div className="w-full col-span-1 bg-gray-300 border-l-2">
        <SlidBar 
        getSessions={setSessions} messages={UniquUsermessages.sort((a, b) => a.timestamp - b.timestamp)}
        
        />
      </div>
      <div className="w-full col-span-3">
        <Chatting
          messages={messages.sort((a, b) => a.timestamp - b.timestamp)}
          setMessages={setMessages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          user={user}
          isAdmin={isAdmin}
          isGuestMode={isGuestMode}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AdminChat;
