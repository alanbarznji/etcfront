import React, { useState } from 'react'

const ChatCast = () => {
  const [message, setMessage] = useState(
[ 
     {
    text: 'asdasdsdads',
    sender: 'aaaadasd',
    type: 'admin'  // 'user' or 'bot'
  },
    {
    text: 'asdasdsdads',
    sender: 'aaaadasd',
    type: 'user'  // 'user' or 'bot'
  },
     {
    text: 'asdasdsdads',
    sender: 'aaaadasd',
    type: 'admin'  // 'user' or 'bot'
  },
    {
    text: 'asdasdsdads',
    sender: 'aaaadasd',
    type: 'user'  // 'user' or 'bot'
  },
    {
    text: 'asdasdsdads',
    sender: 'aaaadasd',
    type: 'user'  // 'user' or 'bot'
  },
     {
    text: 'asdasdsdads',
    sender: 'aaaadasd',
    type: 'admin'  // 'user' or 'bot'
  },
    {
    text: 'asdasdsdads',
    sender: 'aaaadasd',
    type: 'user'  // 'user' or 'bot'
  },
]



)
  return (
    <div className='bg-primary h-full container   '>
     {
message.map((e,i)=>{
  return <div key={i} className={`flex items-center justify-between px-4 relative py-5 ${e.type==='admin'?'bg-red-700 relative  text-white':'bg-white text-gray-800'}  `}>
 
  <span className={e.type==='admin'?' absolute right-0 py-10':" absolute left-0 py-10"}>{e.text}</span>
  </div>
 
})
     }
     <div>
       <input onChange={(e)=>console.log(e.target.value )} className='border-2 border-gray-300 px-4 py-2 rounded-md w-full' type='text' />
       <button onClick={()=>console.log("semd")}
        className='bg-primary text-white px-4 py-2 rounded-md'>Send</button>
     </div>
    </div>
  )
}

export default ChatCast
