'use client'
import GlobalApi from '@/app/_utils/GlobalApi';
import { loadingBarProgress_Reducer, userId_Reducer } from '@/app/redux/sharingData/sharingDataSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
// import { LoaderCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

const MyProfile = () => {
    const dispatch = useDispatch()

    const user = useSelector((state) => state.sharingData.userId)
    const jwt = useSelector((state) => state.sharingData.jwt)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const createdAt = user.createdAt

    const [disableUsername, setDisableUsername] = useState(true)
    const [disableEmail, setDisableEmail] = useState(true)
    const [disablePassword, setDisablePassword] = useState(true)
    // const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(loadingBarProgress_Reducer(100));
        if (user) {
            setUsername(user.username)
            setEmail(user.email)
            console.log(createdAt)
            console.log(username)
            console.log(email)
        }
    }, [user])

    const enableUsername = () => {
        setDisableUsername(false)
    }

    const enableEmail = () => {
        setDisableEmail(false)
    }

    const enablePassword = () => {
        setDisablePassword(false)
    }

    const updateUserName = () => {
        dispatch(loadingBarProgress_Reducer(50))
        if (!jwt) {
            router.push('/sign-in');
        } else {
            const data = {
                username: username
            }
            console.log(data)
            console.log(user.id)
            GlobalApi.updateUserName(user.id, data, jwt).then(resp => {
                console.log(resp)
                toast('Account Details Upadated')
                sessionStorage.setItem('user', JSON.stringify(resp))
                dispatch(userId_Reducer(resp))
                dispatch(loadingBarProgress_Reducer(100))

            }, (e) => {
                console.log(e)
                toast('Something went wrong!')
                dispatch(loadingBarProgress_Reducer(100))
            })
        }
        setDisableUsername(true)
    }

    const updateUserEmail = () => {
        dispatch(loadingBarProgress_Reducer(50))
        if (!jwt) {
            router.push('/sign-in');
        } else {
            const data = {
                email: email
            }
            console.log(data)
            GlobalApi.updateUserName(user.id, data, jwt).then(resp => {
                console.log(resp)
                toast('Account Details Upadated')
                sessionStorage.setItem('user', JSON.stringify(resp))
                dispatch(userId_Reducer(resp))
                dispatch(loadingBarProgress_Reducer(100))
            }, (e) => {
                console.log(e)
                toast('Something went wrong!')
                dispatch(loadingBarProgress_Reducer(100))
            })
        }
        setDisableEmail(true)
    }

    const updatePassword = () => {
        dispatch(loadingBarProgress_Reducer(50))
        if (!jwt) {
            router.push('/sign-in');
        } else if (newPassword == confirmPassword) {
            const data = {
                password: newPassword
            }
            console.log(data)
            GlobalApi.updatePassword(user.id, data, jwt).then(resp => {
                console.log(resp)
                toast('Account Details Upadated')
                sessionStorage.setItem('user', JSON.stringify(resp))
                dispatch(userId_Reducer(resp))
                dispatch(loadingBarProgress_Reducer(100))
            }, (e) => {
                console.log(e)
                toast('Something went wrong!')
                dispatch(loadingBarProgress_Reducer(100))
            })
        } else {
            toast('Passwords are not matching!')
            dispatch(loadingBarProgress_Reducer(100))
        }
        setDisablePassword(true)
    }

    return (
        <div className='py-5 px-4 sm:px-10 md:px-20'>

            <div className='mb-4'>
                <div className='flex items-center pb-3'>
                    <h2 className='pr-4'>Username</h2>
                    <button className='text-green-600' onClick={enableUsername}>Edit</button>
                </div>
                <div className='flex space-x-2'>
                    <Input id='username' onChange={(e) => setUsername(e.target.value)} value={username} placeholder={user.username} disabled={disableUsername} />
                    <Button onClick={updateUserName} disabled={disableUsername}>Save</Button>
                </div>
            </div>

            <div className='mb-4'>
                <div className='flex items-center pb-3'>
                    <h2 className='pr-4'>Email</h2>
                    <button className='text-green-600' onClick={enableEmail}>Edit</button>
                </div>
                <div className='flex space-x-2'>
                    <Input onChange={(e) => setEmail(e.target.value)} value={email} placeholder={user.email} disabled={disableEmail} />
                    <Button disabled={disableEmail} onClick={updateUserEmail}>Save</Button>
                </div>
            </div>

            <div>
                <div className='flex items-center pb-3'>
                    <h2 className='pr-4'>Passoword</h2>
                    <button className='text-green-600' onClick={enablePassword}>Edit</button>
                </div>
                <div className='flex space-x-2'>
                    <Input onChange={(e) => setNewPassword(e.target.value)} value={newPassword} type='password' placeholder='Enter new password' disabled={disablePassword} />
                    <Input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type='password' placeholder='Re-enter new password' disabled={disablePassword} />
                    <Button disabled={disablePassword} onClick={updatePassword}>Save</Button>
                </div>
                <p className='text-sm text-red-600'>  * Password must be of minimum 6 characters</p>
            </div>
        </div>
    )
}

export default MyProfile
