"use client"
import React, { useState } from "react";

const initialValues = {
    username: '',
    email: '',
    password: '',
}
const Register = () => {
    const [formData, setFormData] = useState(initialValues);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            if (response.ok) {
                console.log('User created successfully!')
            } else {
                console.error('Failed to create user:', await response.json())
            }
        } catch (error) {
            console.error('Failed to create user:', error)
        }
    }

    return (
        <div className="flex flex-col w-full items-center justify-center min-h-screen py-6 bg-gray-100">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
                {/* <h1 className="text-3xl font-semibold text-center mb-6">Register</h1> */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                        <input type="text" id="username" name="username" placeholder='Enter Username' value={formData.username} onChange={handleChange} required className="mt-1 text-gray-800 block w-full h-9 p-2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input type="email" id="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} required className="mt-1 text-gray-800 block h-9 p-2 w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password:</label>
                        <input type="password" id="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} required className="mt-1 text-gray-800 h-9 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div>
                    {/* <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password:</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Enter Confirm Password" value={formData.confirmPassword} onChange={handleChange} required className="mt-1 text-gray-800 block w-full border-gray-300 h-9 p-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                    </div> */}
                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Register</button>
                    {/* <div className="mt-4 text-center">
                        <p className='text-indigo-600'>New user? <Link href="/register">Create an account</Link></p>
                    </div> */}
                </form>
            </div>
        </div>
    );
}



export default Register