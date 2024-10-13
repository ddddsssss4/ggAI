import React from 'react'
import Navbar from '../../components/common/Header/Navbar'
import { kidProfile } from '../../assets/common'

const TeacherDashboard = () => {
    const students = [
        {
          id: 1,
          name: 'Anmol Singh',
          highestLevel: 0,
          accuracy: 0
        },
        
      ]
  return (
    <div className='bg-[#f4f4f4]'>
        <Navbar></Navbar>
        <div>
        <div className='w-full h-screen overflow-y-auto p-4 px-16 mt-12 '>
      <div className=' text-[37px] font-semibold'>
        LIST OF STUDENTS
      </div>
      <br /> <br />
      <div className='flex flex-wrap gap-12'>
        {students.map(({ id, profile, name, highestLevel, accuracy}) => (
          <div className='flex flex-wrap pl-4 pr-4 py-3 boxgradient w-[22rem] h-[13rem] overflow-hidden relative' key={id} >
            <div className='flex w-full gap-6 pr-4'>
              <div className=''>
                <img src={kidProfile} alt='profile' width={72} height={72} className='rounded-full border-[4px] border-[#4E4AEE] p-[2px]'></img>
              </div>
              <div className='text-[#4E4AEE] font-extrabold text-[24px] mt-2'>
                {name}
              </div>
            </div>
            <div>
              <p className='text-white font-medium'>Accuracy: {accuracy}%</p>
            </div>
            <p className='absolute text-[263px] text-white font-extrabold opacity-30 transform translate-x-[170px] -translate-y-[50px]'>
              {highestLevel}
            </p>
            <p className='absolute transform translate-x-[250px] translate-y-[140px] px-4 py-2 bg-[#4E4AEE] rounded-2xl text-white font-medium hover:bg-[#524fdf] cursor-pointer'>
              View
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  )
}

export default TeacherDashboard