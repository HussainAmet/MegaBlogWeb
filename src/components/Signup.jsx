import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import { reload } from '../reload'

function Signup() {
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const signup = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData));
                navigate("/")
                reload();
            }
        } catch (error) {
            if (error.message === "A user with the same id, email, or phone already exists in this project."){
                setError("Email is already registered!")
            } else if (error.message === "Invalid `password` param: Password must be at least 8 characters and should not be one of the commonly used password."){
                setError("Password must be at least 8 characters")
            } else {
                setError(error.message)
            }
        }
    }

  return (
    <div className="flex items-center justify-center">
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
            <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
            <p className="mt-2 mb-2 text-center text-base text-black/60">
                Already have an account?&nbsp;
                <Link to="/login" className="font-medium text-primary transition-all duration-200 hover:underline">
                        Sign In
                </Link>
            </p>
            {error && <p className="text-red-600 mt-2 text-center mb-2">{error}</p>}

            <form onSubmit={handleSubmit(signup)}>
                <div className='space-y-5'>
                    <Input
                        label = "Full Name: "
                        placeholder = "Enter your full name"
                        {...register("name", {
                            required: true,
                        })}
                    />
                    <Input
                        type = "email"
                        label = "Email: "
                        placeholder = "Enter your email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPater: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || "Email address must be a valid address",
                            }
                        })}
                    />
                    <Input
                        type = "password"
                        label = "Password: "
                        placeholder = "Enter your password"
                        {...register("password", {
                            required: true
                        })}
                    />
                    <Button
                        type="submit"
                        className='w-full'
                        children="Create Account"
                    />
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup