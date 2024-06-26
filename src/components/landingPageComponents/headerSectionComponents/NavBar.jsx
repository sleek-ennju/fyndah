import { useState, useEffect, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { landingPageNavMenuOnline, landingPageNavMenuOffline } from "../../../routes/Navigations";
import { Button } from "../../uiComponents";
import { HiMiniBars3BottomRight } from "react-icons/hi2";
import { RxCross2 } from "react-icons/rx";
import { logo } from "../../../assets/images";
import classNames from "classnames";
import { AuthContext } from "../../context/AuthContext";
import LogoutModalUser from "../../userDashboard/LogoutModal";


function NavBar() {
    const { authToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [revealNav, setRevealNav] = useState(false);
    const [stickyEffect, setStickyEffect] = useState(false);
    const [vw, setVw] = useState(null);

    // logout modal states
    const [isOpenModal, setIsOpenModal] = useState(false);
    const LogoutOpenModal = () => setIsOpenModal(true);
    const LogOutCloseModal = () => setIsOpenModal(false);


    const checkViewWidth = () => {
        setVw(window.innerWidth);
    }

    const handleRedirectionBtn = () => {
        if (!authToken) {
            navigate("/signup");
        } else {
            navigate("/dashboard/profile")
        }
    };

    // hide mobile nav bar when Home link is clicked
    useEffect(() => {
        if (vw <= 680) {
            setRevealNav(false);
            setVw(null);
        }
    }, [vw]);

    // navbar background sticky scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 150) {
                setStickyEffect(true);
            } else {
                setStickyEffect(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);


    return (
        <nav className={classNames(stickyEffect && "sticky top-0 shadow-sm shadow-secondary", 'flex justify-between items-center z-50 bg-primary w-full h-[16dvh] transition-all duration-300 px-4 sm:px-5 md:px-6 lg:px-16')}>
            <div className='max-w-[8rem] md:max-w-[10rem] h-auto transform -translate-x-3'>
                <img src={logo} className='w-full h-full object-cover' alt="Fyndah logo" />
            </div>

            <div onClick={() => setRevealNav(true)} className="cursor-pointer sm:hidden">
                <HiMiniBars3BottomRight className="w-6 h-6 text-black" />
            </div>
            {/* mobile */}
            <div className={classNames(revealNav ? "right-0" : "-right-full", "flex flex-col items-center justify-center absolute top-0 z-50 w-[65%] h-dvh bg-secondary shadow-lg transition-all duration-300 gap-8 sm:hidden")}>
                <div onClick={() => setRevealNav(false)} className="cursor-pointer absolute top-5 left-5">
                    <RxCross2 className="w-6 h-6 text-black text-opacity-70" />
                </div>
                <ul className="flex flex-col sm:flex-row items-center gap-4">
                    {!authToken ? landingPageNavMenuOffline.map(({ title, url }, index) => (
                        <li key={index} onClick={url == '/' ? () => checkViewWidth() : null}>
                            <NavLink to={url} className="text-base hover:text-accent transition-colors duration-300 font-poppins font-light">{title}</NavLink>
                        </li>
                    )) : (
                        landingPageNavMenuOnline.map(({ title, url }, index) => (
                            <li key={index} onClick={url == '/' ? () => checkViewWidth() : LogoutOpenModal}>
                                <NavLink to={url} className="text-base hover:text-accent transition-colors duration-300 font-poppins font-light">{title}</NavLink>
                            </li>
                        ))
                    )}
                </ul>
                <div className="">
                    <Button title={!authToken ? "Register" : "My profile"} action={handleRedirectionBtn} />
                </div>
            </div>

            {/* desktop */}
            <div className="hidden sm:flex items-center flex-row  gap-8">
                <ul className="flex items-center gap-4">
                    {!authToken ? landingPageNavMenuOffline.map(({ title, url }, index) => (
                        <li key={index}>
                            <NavLink to={url} className="md:text-lg hover:text-accent transition-colors duration-300 font-poppins font-light">{title}</NavLink>
                        </li>
                    )) : landingPageNavMenuOnline.map(({ title, url }, index) => (
                        <li key={index}>
                            <NavLink to={url} onClick={title === "Logout" && LogoutOpenModal} className="md:text-lg hover:text-accent transition-colors duration-300 font-poppins font-light">{title}</NavLink>
                        </li>
                    ))}
                </ul>
                <div className="">
                    <button onClick={handleRedirectionBtn} className="bg-accent text-primary font-poppins md:text-lg rounded-lg py-1 px-4 capitalize font-light">{!authToken ? "Register" : "My profile"}</button>
                </div>
            </div>
            <LogoutModalUser isOpen={isOpenModal} onClose={LogOutCloseModal} />
            

        </nav>
    )
}

export default NavBar;