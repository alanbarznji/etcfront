import React from 'react'
import Header from './Header'
import PackageAllow from './PackageAllow'

const PackageScreen = ({
    page,OnOpen,packages,OpenDeleteHandle,OnUpdate
}) => {
  return (
    <div className='w-full h-screen '>
<Header OnOpen={OnOpen}/>
<PackageAllow OpenDeleteHandle={OpenDeleteHandle} packages={packages} OnUpdate={OnUpdate}/>

    </div>
  )
}

export default PackageScreen
