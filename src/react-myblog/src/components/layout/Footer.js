import React from 'react'
import { getDarkModeFlag, toggleDarkMode } from '../../state/themeSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

export default function Footer() {
    const dispatch = useDispatch();
    const darkModeFlag = useSelector(getDarkModeFlag);

    return (
        <div className={darkModeFlag ? 'p-5 bg-dark text-white' : 'p-5 bg-white text-dark'}>
            {
                darkModeFlag ?
                    <Button variant="outline-light" onClick={() => dispatch(toggleDarkMode())}>
                        <FontAwesomeIcon icon={icon({ name: 'sun' })} /> Switch to Light Mode
                    </Button> :
                    <Button variant="outline-dark" onClick={() => dispatch(toggleDarkMode())}>
                        <FontAwesomeIcon icon={icon({ name: 'moon' })} /> Switch to Dark Mode
                    </Button>
            }
        </div>
    )
}
