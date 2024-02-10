"use client";
import { redirect, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

const page = () => {
    const router = useRouter();
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
      console.log(type);
      router.push(`?type=${type}`);
    }, [type]);
  
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
      console.log(res)
      toast(res.data.message);
      setDisabled(false)
      if (res.data.success == true) {
        redirect(`/auth/login?type=${type}`)
      }
    }
      return (
        <div>  
          <button
            onClick={() => {
              clickHandler("employee");
            }}
          >
            Employee
          </button>
          <button
            onClick={() => {
              clickHandler("company");
            }}
          >
            Company
          </button>
          {type == "employee" ? (
            <form onSubmit={handleSubmit(submitHandler)}>
              <label htmlFor="profilepic">
                Profile Picture
                <input
                  type="file"
                  id="profilePicture"
                  {...register("profilePicture", { required: true })}
                />
                {errors.profilepic?.type === "required" && (
                  <p className="errorMsg">Profile Picture is required.</p>
                )}
              </label>
              <label htmlFor="firstName">
                First Name
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName", { required: true })}
                />
                {errors.firstName?.type === "required" && (
                  <p className="errorMsg">First Name is required.</p>
                )}
              </label>
              <label htmlFor="lastName">
                Last Name
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName", { required: true })}
                />
                {errors.lastName?.type === "required" && (
                  <p className="errorMsg">Last Name is required.</p>
                )}
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="errorMsg">Email is required.</p>
                )}
              </label>
              <label htmlFor="password">
                Password
                <input
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
              <button type="submit" disabled={disabled}>
                Register
              </button>
            </form>
          ) : (
            <form onSubmit={handleSubmit(submitHandler)}>
              <label htmlFor="logo">
                Logo
                <input
                  type="file"
                  id="logo"
                  {...register("logo", { required: true })}
                />
                {errors.logo?.type === "required" && (
                  <p className="errorMsg">Logo is required.</p>
                )}
              </label>
              <label htmlFor="name">
                Name of the Company
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                />
                {errors.name?.type === "required" && (
                  <p className="errorMsg">Company name is required.</p>
                )}
              </label>
              <label htmlFor="description">
              Description
                <input
                  type="text"
                  id="description"
                  {...register("description", { required: true })}
                />
                {errors.description?.type === "required" && (
                  <p className="errorMsg">Description is required.</p>
                )}
              </label>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                />
                {errors.email?.type === "required" && (
                  <p className="errorMsg">Email is required.</p>
                )}
              </label>
              <label htmlFor="password">
                Password
                <input
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
              <button type="submit" disabled={disabled}>
                Register
              </button>
            </form>
          )}
        </div>
      );
    
};

export default page;
