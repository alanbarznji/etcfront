import React, { useState, useEffect, useRef } from "react";
import { auth, db } from "../../firbase";
import { collection, addDoc, onSnapshot, deleteDoc, doc, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import ChatCast from "./components/ChatCast";
 
const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [isGuestMode, setIsGuestMode] = useState(true); // Toggle between guest and admin
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [input, setInput] = useState("");
  const refsmooth=useRef(null)
  useEffect(() => {
    // Listen for authentication changes
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setIsAdmin(currentUser.email === "alanbarznji91@gmail.com"); // Replace with your admin email
        setIsGuestMode(false); // If logged in, switch to admin mode
      } else {
 
        setUser(null);
        setIsAdmin(false);
        setIsGuestMode(true); // If not logged in, stay in guest mode
      }
    });
    
    const sessionId = localStorage.getItem("chatSessionId");
    // Fetch messages in real-time
    const messagesRef = collection(db, "messages");
    console.log(sessionId);
 
  const q =query(messagesRef, where("sessionId", "==", sessionId))  // Guests see only their messages

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => {
        console.log(doc);
        
        return { id: doc.id, ...doc.data() }}));
    });

    return () => unsubscribe();
  }, [isAdmin]);

  useEffect(()=>{
refsmooth.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])
  const sendMessage = async () => {
    
    if (newMessage.trim() === "") return;

 
    const sessionKey = "chatSessionId"; // Key for storing session ID in localStorage
    let sessionId = localStorage.getItem(sessionKey);

    const senderName ="Guest";
    const senderEmail = null; // Store email only for admin
    if(!isAdmin ){
  
  if (!sessionId) {
    sessionId = Math.random().toString(36).substr(2, 9); // Generate unique session ID
    localStorage.setItem(sessionKey, sessionId);
  }
  
  console.log("Session ID:", sessionId);
 }
  
      
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        role: senderName,
        email: senderEmail, // Email only for admin
        sessionId, // Store session ID for each message
        timestamp: Date.now(),
              name:"alan",
        SessionsChat:true
      });
    
    setNewMessage("");
  };

  const handleDelete = async () => {
    if (!isAdmin) return; // Ensure only the admin can delete
  
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, where("sessionId", "==", "gy8v4yxhz")); // Find messages from "12q12q"
  
    const querySnapshot = await getDocs(q);
    console.log('====================================');
    console.log(querySnapshot);
    console.log('====================================');
    querySnapshot.forEach(async (message) => {
      await deleteDoc(doc(db, "messages", message.id)); // Delete each matching message
    });}

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
 
  const [dropdownOpen, setDropdownOpen] = useState(false);
  console.log(messages);
  
  return (
   <div className="w-full h-screen flex justify-center overflow-y-scroll ">
  <div className="bg-gray-100 h-full flex flex-col container">
      <div className="bg-blue-500 p-4 text-white flex justify-between items-center">
        <button className="hover:bg-blue-400 rounded-md p-1">
          <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="6" r="4" stroke="#ffffff" strokeWidth="1.5" />
            <path d="M15 20.6151C14.0907 20.8619 13.0736 21 12 21C8.13401 21 5 19.2091 5 17C5 14.7909 8.13401 13 12 13C15.866 13 19 14.7909 19 17C19 17.3453 18.9234 17.6804 18.7795 18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <span>Chat App</span>
        <div className="relative inline-block text-left">
          <button onClick={() => setDropdownOpen(!dropdownOpen)} className="hover:bg-blue-400 rounded-md p-1">
            <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M14.1395 12.0002C14.1395 13.1048 13.2664 14.0002 12.1895 14.0002C11.1125 14.0002 10.2395 13.1048 10.2395 12.0002C10.2395 10.8957 11.1125 10.0002 12.1895 10.0002C13.2664 10.0002 14.1395 10.8957 14.1395 12.0002Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
 
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex flex-col space-y-2">
          {messages.sort((a,b)=>a.timestamp - b.timestamp).map((msg, index) => (
            <div key={index} className={`flex w-52 ${msg.role === "Admin" ? "justify-end" : ""} w-full`}>
              <div className={`p-2 rounded-lg max-w-xs ${msg.role === "Admin" ? "bg-blue-200" : "bg-gray-300"} w-full break-words`}> 
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div ref={refsmooth} />
         
      </div>
      
      <div className="bg-white p-4 flex items-center">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
          value={newMessage}
          onChange={(e) =>setNewMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white rounded-full p-2 ml-2 hover:bg-blue-600 focus:outline-none"
        >
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.5003 12H5.41872M5.24634 12.7972L4.24158 15.7986C3.69128 17.4424 3.41613 18.2643 3.61359 18.7704C3.78506 19.21 4.15335 19.5432 4.6078 19.6701C5.13111 19.8161 5.92151 19.4604 7.50231 18.7491L17.6367 14.1886C19.1797 13.4942 19.9512 13.1471 20.1896 12.6648C20.3968 12.2458 20.3968 11.7541 20.1896 11.3351C19.9512 10.8529 19.1797 10.5057 17.6367 9.81135L7.48483 5.24303C5.90879 4.53382 5.12078 4.17921 4.59799 4.32468C4.14397 4.45101 3.77572 4.78336 3.60365 5.22209C3.40551 5.72728 3.67772 6.54741 4.22215 8.18767L5.24829 11.2793C5.34179 11.561 5.38855 11.7019 5.407 11.8459" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
  );
};

export default Chat;

//     <div classNameName="h-[95vh] w-full flex      justify-center" >
//     <div classNameName='bg-primary h-full container   '>
//      {
  // messages.map((e,i)=>{
    //   return <div key={i} classNameName={`flex items-center justify-between px-4 relative py-5 ${e.sender==='admin'?'bg-red-700 relative  text-white':'bg-white text-gray-800'}  `}>
 
//   <span classNameName={e.type==='admin'?' absolute right-0 py-10':" absolute left-0 py-10"}>{e.text}</span>
//   </div>
 
// })
//      }
//      <div>
//        <input onChange={(e)=>setNewMessage(e.target.value )} classNameName='border-2 border-gray-300 px-4 py-2 rounded-md w-full' type='text' />
//        <button onClick={sendMessage}
//         classNameName='bg-primary text-white px-4 py-2 rounded-md'>Send</button>
//      </div>
//     </div>
//     </div>