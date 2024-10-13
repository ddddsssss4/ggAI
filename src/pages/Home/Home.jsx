import React from 'react'
import Navbar from '../../components/common/Header/Navbar'
import Goku from '../../components/common/Goku'
import { GroupImage, level1Image } from '../../assets/common'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='w-full bg-[#F4F4F4]'>
        <Navbar></Navbar>
  
        <div className='flex w-full px-12'>
            <div className='w-[80%] h-[30%]'>
                <Goku/>
            </div>
            <div className=' w-[60%] relative mt-24'>
                <div className='bg-[#5B9CF9] rotate-[18deg] absolute z-[10] w-[51%] h-[70%] top-[1.6rem]   rounded-xl'>
                </div>
                <div className='bg-white text-base text-black z-[20] absolute w-[45%] left-8 rounded-xl p-4 top-4'>
                    <p className='text-center font-bold text-3xl'>Hello Goku Here</p>
                    <div className='mt-2 text-xl'>
                        Welcome to our magical learning adventure! I’m Goku, and I’m so excited to help you discover new things.
                        So get ready to use your imagination and dive into a world where learning is an adventure.
                        Let’s start this amazing journey together and see all the cool things you can do!
                    </div>
                </div>
                
            </div>
      </div>


      <div className='px-24 mt-24 flex justify-center'>
       
            <div className='flex gap-20 items-center'>
                <div className='w-[40%]'>
                        <h1 className='text-3xl font-bold text-[#5B9CF9]'>LEARNING</h1>
                        <p className='text-5xl font-bold text-black mt-4'> Discover the Magic of Learning And Watch Your Imagination Soar!</p>
                        <p className='text-base font-normal mt-3'>Explore, Play, and Learn Where every day is a new adventure!</p>
                </div>
                <div className='bg-white'>
                    
                </div>
            </div>
   
      </div>
    
    <div className='px-12 mt-40'>
        <p className='text-2xl font-semibold text-center'>CLICK ON THE LEVEL TO PLAY</p>
        <div className='flex gap-6 mb-6 justify-center items-center'>
            <div className='w-[30%]'>
                <img src={level1Image} alt="leve1" />
            </div>
            <div className='flex flex-col items-center w-[20%]'>
                <div className='rounded-full w-8 h-8 bg-[#5B9CF9]' >
                </div>
                <div className='h-40  bg-[#5B9CF9] w-4 rounded-xl '>
                </div>
            </div>

            <div className='bg-white text-base p-6 rounded-xl w-[30%]'>
                <Link to={'/level1'} className='text-[#5B9CF9] font-bold text-3xl' >LEVEL 01</Link>
                <p className='mt-4 font-semibold text-2xl '>The Power of Phonemes :</p>
                <p className='text-xl  mt-2 font-medium text-justify'>Start your adventure by learning how to pronounce basic sounds, called phonemes! Get ready for fun challenges that help you build the foundations of language, setting you up for success as you progress through the game.</p>
            </div>
        </div>
    </div>

    </div>
  )
}

export default Home