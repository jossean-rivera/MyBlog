import React from 'react'
import { useIsAuthenticated } from '@azure/msal-react'
import { Redirect } from 'react-router'
import SignInButton from '../SignInButton'


export default function AdminSignIn() {
    const isAuthenticated = useIsAuthenticated()

    if (isAuthenticated) {
        return <Redirect to="/admin/posts" />
    }

    return (
        <div>
            Admin Sign In
            <SignInButton />
        </div>
    )
}
