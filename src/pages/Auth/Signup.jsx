import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { ACCOUNT_TYPE } from '../../utils/constants'
import Tab from '../../components/common/Tab'
import { StudentPic, TeacherPic } from '../../assets/common'  // Import TeacherPic

const Signup = () => {
    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

    const [formData, setFormData] = useState({
        Name : "",
        email: "",
        password: "",
        confirmPassword: "",
        teacherid:"",
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  
    const { Name, email, password, confirmPassword, teacherid } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
    
        if (password !== confirmPassword) {
          alert("password not match")
          return
        }
        const signupData = {
          ...formData,
          accountType,
        }
        console.log("Form Data : ", formData)
        console.log("Account Type: ", accountType)

        setFormData({
          Name : "",
          email: "",
          password: "",
          confirmPassword: "",
          teacherid : ""
        })
        setAccountType(ACCOUNT_TYPE.STUDENT)
      }
    
    // Data to pass to Tab component
    const tabData = [
        {
          id: 1,
          tabName: "Student",
          type: ACCOUNT_TYPE.STUDENT,
        },
        {
          id: 2,
          tabName: "Instructor",
          type: ACCOUNT_TYPE.INSTRUCTOR,
        },
    ]

  return (
    <div className='flex px-12 justify-center mt-24'>

      <div className='max-w-[50%] border-black border-y-2 border-l-2 px-16 py-12'>
        <h1 className='text-center font-bold text-4xl'>Sign Up</h1>
        <Tab tabData={tabData} field={accountType} setField={setAccountType} />

        <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
          <div className="">
            <label>
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                Name <sup className="text-[#5B9CF9]">*</sup>
              </p>
              <input
                required
                type="text"
                name="Name"
                value={Name}
                onChange={handleOnChange}
                placeholder="Enter first name"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] border-[1px] border-black p-[12px] text-black"
              />
            </label>
          </div>
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
                boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
              }}
              className="w-full rounded-[0.5rem] border-[1px] border-black p-[12px] text-black"
            />
          </label>
          <div className="flex gap-x-4">
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                Create Password <sup className="text-[#5B9CF9]">*</sup>
              </p>
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
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
            <label className="relative">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                Confirm Password <sup className="text-[#5B9CF9]">*</sup>
              </p>
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm Password"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] border-[1px] border-black p-[12px] pr-10 text-black"
              />
              <span
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#000000" />
                )}
              </span>
            </label>
          </div>

          
            <label className="w-full">
              <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-black">
                Teacher Id <sup className="text-[#5B9CF9]">*</sup>
              </p>
              <input
                required
                type="text"
                name="teacherid"
                value={teacherid}
                onChange={handleOnChange}
                placeholder="Enter Teacher Id"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-full rounded-[0.5rem] border-[1px] border-black p-[12px] text-black"
              />
            </label>
       

          <button
            type="submit"
            className="mt-6 rounded-[8px] bg-[#5B9CF9] py-[8px] px-[12px] font-medium text-richblack-900"
          >
            Create Account
          </button>
        </form>
      </div>

      {/* Conditionally Render the Image */}
      <div className='rounded-xl'>
        <img 
          src={accountType === ACCOUNT_TYPE.STUDENT ? StudentPic : TeacherPic} 
          alt="Account Type" 
          className='rounded-xl' 
          
        />
      </div>
    </div>
  )
}

export default Signup
