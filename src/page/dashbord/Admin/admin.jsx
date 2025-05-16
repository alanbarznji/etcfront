import React, { useState, useEffect } from "react";
import { auth, db } from "../../../firbase";
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, where, getDocs, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import ChatCast from "../../chat/components/ChatCast";
import Chatting from "./components/Chating";
import SlidBar from "./components/SlideBar";
import SlidBars from "../components/SlideBar";
import { useDispatch, useSelector } from "react-redux";
import { NavigationOpen_Action } from "../../../redux/action/NavigationAction";

const AdminChat = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const state=useSelector(state=>state.dashboard.dashboard)
  const dispatch=useDispatch()
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        dispatch(NavigationOpen_Action(false));  // Ensure sidebar is hidden when resizing to small screen
        setIsMobile(false);
      } else {
        setIsMobile(false);
        dispatch(NavigationOpen_Action(true)) // Show sidebar by default on large screens
      }
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const Page=useSelector(state=>state.pages.Page)
  console.log(Page);
  const SliderShow=()=>{
    dispatch(NavigationOpen_Action(!state))
  }
  const HandlePage=(e)=>{
    dispatch(ChangeDashboard_Action(e))
  }
console.log(state);
  const [messages, setMessages] = useState([]);
  const [Usermessages, setUserMessages] = useState([]);
  const [UniquUsermessages, setUniquUserMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdmins, setIsAdmins] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState("alanbarznji91@gmail.com");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [Sessions,setSessions]=useState("");
const loginAdmin = async () => {
  try {
    const email = "alanbarznji91@gmail.com"; // Admin Email
    const password = "YOUR_ADMIN_PASSWORD"; // Replace with your actual password

    await signInWithEmailAndPassword(auth, "alanbarznji91@gmail.com", "alanalan22");
    console.log("Admin logged in successfully!");
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};
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
  if (!auth.currentUser) {
    console.error("Admin not logged in. Logging in...");
    await loginAdmin(); // Log in first
  }
console.log(auth.currentUser,"adsdadsdasdasddddd");
  if (!auth.currentUser) {
    console.error("Failed to log in. Cannot delete messages.");
    return;
  }

  if (auth.currentUser.email !== "alanbarznji91@gmail.com") {
    console.error("You do not have permission to delete messages.");
    return;
  }

  if (!Sessions) {
    console.error("Session ID is missing");
    return;
  }

  try {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("sessionId", "==", Sessions));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.error("No messages found for session:", Sessions);
      return;
    }

    querySnapshot.forEach(async (docSnap) => {
      await deleteDoc(doc(db, "messages", docSnap.id));
    });

    console.log("Messages deleted successfully!");
  } catch (error) {
    console.error("Error deleting messages:", error);
  }
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
        await updateDoc(docRef, { SessionsChat: false });
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
      <div className="relative flex transition-all ">
      {/* Overlay for small screens */}
      {isMobile && state && (
        <div 
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={() => dispatch(NavigationOpen_Action(false)) } // Clicking outside closes sidebar
        ></div>
      )}
      
      {/* Sidebar */}
      <div 
        className={`transition-all duration-300 z-20 ${state ? (isMobile ? 'fixed left-0 top-0 w-3/4 h-full bg-white   text-white shadow-lg' : 'w-1/4') : 'w-0 overflow-hidden'}`}
      >
        <SlidBars handle={HandlePage}/>
   
      </div>

      {/* Main Content */}
      <div 
        className={`transition-all duration-300 ${state && !isMobile ? 'w-3/4' : 'w-full'} z-0 p-2`}
      >
        
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
 
      </div>
    </div>
 
  );
};

export default AdminChat;
