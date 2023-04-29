import React from 'react'
import CustomersList from '../../components/admin/CustomersList'
import ExampleSidebar from '../../components/admin/Sidebar'

export default function AdminHomePage() {
  return (
    <div className='flex justify-center mx-10 my-8 w-full container'>
        <ExampleSidebar/>

        <div className='ml-16 w-full h-full'>
          <CustomersList />
        </div>
    </div>
  )
}
