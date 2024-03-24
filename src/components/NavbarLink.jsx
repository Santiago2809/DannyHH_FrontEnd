/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"

export const NavbarLink = ({children, toPath}) => {
    return (
        <NavLink
            to={`/${toPath}`}
            style={({ isActive }) => {
                return {
                    color: isActive ? '#7885BB' : "#fff",
                    textDecoration: isActive ? 'underline' : 'none',
                    textUnderlineOffset: '4px',
                }
            }}
        >
            {children}
        </NavLink>
    )
}