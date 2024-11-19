"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import defaultImage from "../../_assets/blank-profile-picture-973460_640.png"
import Link from "next/link";

const Page = () => {
    const router = useRouter();
    const [imageLink , setImageLink] = useState(defaultImage.src)
    const searchParams = useSearchParams();
    const paramType = searchParams.get("type");
    const [type, setType] = useState(paramType);
    const [disabled, setDisabled] = useState(false);
    const {
      reset,
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  
    useEffect(() => {
      router.push(`?type=${type}`);
    }, [type]);
  
    const loadFile = (event) => {
      const url = URL.createObjectURL(event.target.files[0])
      setImageLink(url)
    }
    const clickHandler = (val) => {
      setType(val);
    };
  
    const submitHandler = async (data) => {
      setDisabled(true);
      var form = new FormData();
      if (type === "employee") {
        form.append("file", data.profilePicture[0])
        form.append("firstName", data.firstName);
        form.append("lastName", data.lastName);
        form.append("email", data.email);
        form.append("password", data.password);
        // Add other employee-specific fields as needed
      } else if (type === "company") {
        form.append("file", data.logo[0]);
        form.append("name", data.name);
        form.append("description", data.description);
        form.append("email", data.email);
        form.append("password", data.password);
        // Add other company-specific fields as needed
      }

      let url = "";
      type === "employee"
        ? (url = "http://localhost:4000/user/new")
        : (url = "http://localhost:4000/company/new");
      const res = await axios.post(url , form , {
        withCredentials : true,
      })
      toast(res.data.message);
      setDisabled(false)
      if (res.data.success == true) {
        router.push(`/auth/login?type=${type}`)
      }
    }
      return (
        <div className='w-full bg-accent min-h-dvh pt-4 md:pt-0 flex flex-col md:flex-row md:gap-12 lg:gap-40 justify-center items-center'>
          <div className=' flex flex-col justify-center items-center'>
        <h1 className='text-primary font-black text-4xl md:text-6xl lg:text-7xl '>Onboard</h1>
        <p className='md:text-lg lg:text-2xl  '>We believe in connections</p>
      </div>
        <div  className=' bg-white shadow-lg justify-center items-center px-6 py-6 flex flex-col sm:m-w-80 rounded-xl'>  
        <div className='flex justify-center items-center gap-8'>
          <button
              className='p-2 text-white text-sm rounded-md'
            onClick={() => {
              clickHandler("employee");
            }}
            style={type == 'employee' ? {background : "#2196f3"} : {color : "grey"}}
          >
            Employee
          </button>
          <button
          className='p-2 text-white text-sm rounded-md'
            onClick={() => {
              clickHandler("company");
            }}
            style={type == 'company' ? {background : "#2196f3"} : {color : "grey"}} 
          >
            Company
          </button>
          </div>
          {type == "employee" ? (
            <form
            className='w-full flex flex-col justify-evenly gap-4 items-center  pt-4'
            onSubmit={handleSubmit(submitHandler)}>
              <label htmlFor="profilePicture" className="w-full  flex justify-start items-center gap-6">
                Profile Picture
                <img width={60}  height={60} className="mt-4 rounded-full aspect-square" src={imageLink} alt="" />
                <input
                 className='hidden w-72 p-1 focus:border-none focus:outline-none' 
                  type="file"
                  id="profilePicture"
                  {...register("profilePicture", { required: true , 
                  onChange : loadFile })}
                />
                {errors.profilepic?.type === "required" && (
                  <p className="errorMsg">Profile Picture is required.</p>
                )}
              </label>
              <label htmlFor="firstName">
                First Name<br/>
                <input
                 className='border-2 border-gray-200 rounded-lg border-solid  w-72 p-1 focus:outline-none' 
                  type="text"
                  id="firstName"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName?.type === "required" && (
                  <p className="errorMsg">First Name is required.</p>
                )}
              </label>
              <label htmlFor="lastName">
                Last Name<br/>
                <input
                 className='border-2 border-gray-200 rounded-lg border-solid  w-72 p-1 focus:outline-none' 
                  type="text"
                  id="lastName"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName?.type === "required" && (
                  <p className="errorMsg">Last Name is required.</p>
                )}
              </label>
              <label htmlFor="email">
                Email<br/>
                <input
                 className='border-2 border-gray-200 rounded-lg border-solid  w-72 p-1 focus:outline-none' 
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="errorMsg">Email is required.</p>
                )}
              </label>
              <label htmlFor="password">
                Password<br/>
                <input
                 className='border-2 border-gray-200 rounded-lg border-solid  w-72 p-1 focus:outline-none' 
                  type="password"
                  id="password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password?.type === "required" && (
                  <p className="errorMsg">Password is required.</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="errorMsg">
                    Password should be atleast 6 characters
                  </p>
                )}
              </label>
              <button className='w-40  p-2 text-white text-sm rounded-md bg-tertiary' type="submit" disabled={disabled}>
                Register
              </button><p className="mt-2">Have an account? &nbsp;
              <Link href={"/auth/login/?type=" + type} className='text-secondary active:text-violet-900 font-semibold'>Sign In </Link>
              </p>
            </form>
          ) : (
            <form
            className='w-full flex flex-col justify-evenly gap-4 items-center  pt-4'
            onSubmit={handleSubmit(submitHandler)}>
              <label htmlFor="logo" className="w-full flex justify-start items-center gap-6">
                Logo
                <img width={60}  height={60} className="mt-4 rounded-full aspect-square" src={imageLink} alt="" />
                <input
                className='hidden w-72 p-1 focus:border-none focus:outline-none'
                  type="file"
                  id="logo"
                  {...register("logo", { required: true, onChange : loadFile})}
                />
                {errors.logo?.type === "required" && (
                  <p className="errorMsg">Logo is required.</p>
                )}
              </label>
              <label htmlFor="name">
                Name of the Company<br/>
                <input
                className='border-2 border-gray-200 rounded-lg border-solid  w-72 p-1 focus:outline-none'
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p className="errorMsg">Company name is required.</p>
                )}
              </label>
              <label htmlFor="description">
              Description<br/>
                <input
                className='border-2 border-gray-200 rounded-lg border-solid  w-72 p-1 focus:outline-none'
                  type="text"
                  id="description"
                  {...register("description", { required: true })}
                />
                {errors.description?.type === "required" && (
                  <p className="errorMsg">Description is required.</p>
                )}
              </label>
              <label htmlFor="email">
                Email<br/>
                <input
                className='border-2 border-gray-200 rounded-lg border-solid  w-72 p-1 focus:outline-none'
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="errorMsg">Email is required.</p>
                )}
              </label>
              <label htmlFor="password">
                Password<br/>
                <input
                className='border-2 border-gray-200 rounded-lg border-solid  w-72 p-1 focus:outline-none'
                  type="password"
                  id="password"
                  {...register("password", { required: true, minLength: 6 })}
                />
                {errors.password?.type === "required" && (
                  <p className="errorMsg">Password is required.</p>
                )}
                {errors.password?.type === "minLength" && (
                  <p className="errorMsg">
                    Password should be atleast 6 characters
                  </p>
                )}
              </label>
              <button className='w-40  p-2 text-white text-sm rounded-md bg-tertiary' type="submit" disabled={disabled}>
                Register
              </button>
              <p className="mt-2">Have an account? &nbsp;
              <Link href={"/auth/login/?type=" + type} className='text-secondary active:text-violet-900 font-semibold'>Sign In </Link>
              </p>
            </form>
          )}
        </div>
        </div>
      );
    
};

export default Page;
