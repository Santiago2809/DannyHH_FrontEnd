import { NavbarLink } from "./NavbarLink"

// eslint-disable-next-line react/prop-types
export const MenuOptions = ({handleShow, logout}) => {

    const handleMenuShowing = ({target}) => {
        if(target.id === "menuContainer"){
            handleShow(false)
        }
    }
    const handleLinkClick = () => {
        handleShow(false);
    }
    
    return (
        <div className="mobileMenu-container" id="menuContainer" onClick={handleMenuShowing}>
            <div className='mobileMenu-options' id="menuOptions">
                <div onClick={handleLinkClick}>
                    <NavbarLink toPath='calendar'>
                        Calendar
                    </NavbarLink>
                </div>
                <div onClick={handleLinkClick}>
                    <NavbarLink toPath='clients'>
                        Customers
                    </NavbarLink>
                </div>
                <div onClick={handleLinkClick}>
                    <NavbarLink toPath='team'>
                        Team
                    </NavbarLink>
                </div>
                <div className="logoutBtn" onClick={logout}>
                    <span>Logout</span>
                </div>
            </div>
        </div>
    )
}
