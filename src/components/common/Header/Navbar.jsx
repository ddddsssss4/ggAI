import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logo } from '../../../assets/common';
import { NavbarLinks } from '../../../data/NavbarLinks';

const Navbar = () => {
  return (
    <div className='w-full px-12 pt-4'>
        <div className='flex h-14 items-center justify-between bg-[#F4F4F4] px-8'>

            <Link to="/">
            <img src={logo} width={160} height={42} loading="lazy" alt="logo" />
            </Link>
            <nav>
                <ul className='flex gap-x-8'>
                    {NavbarLinks.map((link, index) => (
                    <li key={index} className='flex'>
                        <NavLink 
                        to={link.path}
                        className={({ isActive }) => isActive ? 'text-[#5B9CF9] font-semibold text-lg' : 'text-black font-semibold text-lg'}
                        >
                        {link.title}
                        </NavLink>
                    </li>
                    ))}
                </ul>
            </nav>
            {/* login signup button */}

            <div className='flex gap-8'>
                <Link to="/login">
                    <button className='  bg-[#5B9CF9] px-[16px] py-[8px] text-black rounded-md font-semibold'>
                        Log in
                    </button>
                </Link>

                <Link to="/signup">
                    <button  className='bg-[#5B9CF9] px-[16px] py-[8px] text-black rounded-md font-semibold'>
                        Sign Up
                    </button>
                </Link>
            </div>

        </div>
    </div>
  );
};

export default Navbar;
