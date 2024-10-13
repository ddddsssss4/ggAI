import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ACCOUNT_TYPE } from '../../utils/constants';
import Tab from '../../components/common/Tab';
import { StudentPic, TeacherPic } from '../../assets/common';  // Import images

const Login = () => {
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    
    // Handle login logic here
    const loginData = {
      ...formData,
      accountType,
    };
    console.log('Login Data: ', loginData);
    
    setFormData({
      email: '',
      password: '',
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  // Data to pass to Tab component
  const tabData = [
    {
      id: 1,
      tabName: 'Student',
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: 'Instructor',
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div className="flex px-12 justify-center mt-24">
      <div className="w-[35%] border-black border-y-2 border-l-2 px-20 py-12">
        <h1 className="text-center font-bold text-4xl">Login</h1>
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />

        <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
          <label className="w-full">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
              Email Address <sup className="text-[#5B9CF9]">*</sup>
            </p>
            <input
              required
              type="text"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter email address"
              style={{
                boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
              }}
              className="w-full rounded-[0.5rem] border-[1px] border-black p-[12px] text-black"
            />
          </label>

          <label className="relative">
            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
              Password <sup className="text-[#5B9CF9]">*</sup>
            </p>
            <input
              required
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Enter Password"
              style={{
                boxShadow: 'inset 0px -1px 0px rgba(255, 255, 255, 0.18)',
              }}
              className="w-full rounded-[0.5rem] border-[1px] border-black p-[12px] pr-10 text-black"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-[38px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#000000" />
              )}
            </span>
          </label>

          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-[#5B9CF9] py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Login
          </button>
        </form>
      </div>

      {/* Conditionally Render the Image */}
      <div className="rounded-xl">
        <img
          src={accountType === ACCOUNT_TYPE.STUDENT ? StudentPic : TeacherPic}
          alt="Account Type"
          className="rounded-xl"
        />
      </div>
    </div>
  );
};

export default Login;
