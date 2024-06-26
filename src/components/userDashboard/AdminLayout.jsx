import  { useState } from 'react'
import Header from './Header'
import SideBar from './SideBar'
import { Outlet } from 'react-router-dom'
import './Admin.css'

const AdminLayout = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div className='admin-layout w-full font-roboto'>
      <section className='admin-header z-50 w-full'>
        <Header toggle={toggle} handleToggle={handleToggle} />
      </section>
        <section className={`admin-sidebar w-[250px] z-20 duration-500 ease-in-out sm:block ${toggle ? 'block' : 'hidden'}`}>
          <SideBar handleToggle={handleToggle} toggle={toggle} />
        </section>
        <section className='admin-outlet w-full md:w-auto '>
        <Outlet />
        </section>
        
    </div>
  )
}

export default AdminLayout
