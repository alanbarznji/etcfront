import React from 'react'

const SlideBar = ({
  messages,
  getSessions,
}) => {
  return (
    <div className=' w-full grid  '>
      {
        messages.map((message, index) => (
          <div onClick={e=>getSessions(message.sessionId)} key={index} className='w-full text-white bg-primary py-2'>
            {message?.name}
          </div>
        ))
      }
      
    </div>
  )
}

export default SlideBar
