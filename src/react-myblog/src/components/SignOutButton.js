import React from "react"
import { useMsal } from "@azure/msal-react"
import Button from "react-bootstrap/Button"

function handleLogout(instance) {
    instance.logoutPopup().catch(e => {
        console.error(e);
    });
}

/** Renders a button which, when selected, will open a popup for logout */
export default function SignOutLink() {

    const { instance } = useMsal();
    return <Button variant="light" className="ml-auto" onClick={() => handleLogout(instance)}>Sign out</Button>
}