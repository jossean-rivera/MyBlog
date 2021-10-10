import React from "react"
import { useMsal } from "@azure/msal-react"
import { useHistory } from 'react-router-dom'
import Button from "react-bootstrap/Button"

function handleLogout(instance, history) {
    instance.logoutPopup()
        .then(() => history.push('/'))
        .catch(e =>console.error(e))
}

/** Renders a button which, when selected, will open a popup for logout */
export default function SignOutLink() {
    const { instance } = useMsal()
    const history = useHistory()
    return <Button variant="light" className="ml-auto" onClick={() => handleLogout(instance, history)}>Sign out</Button>
}