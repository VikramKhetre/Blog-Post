import { Avatar, Button, Dropdown, DropdownDivider, Navbar,TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom"; // allows to redirect page without reload
import {AiOutlineSearch} from "react-icons/ai"
import {FaMoon,FaSun} from "react-icons/fa"
import {useSelector,useDispatch} from "react-redux";
import { toggleTheme } from '../redux/theme/themeSlice';

 
export default function Header(){
    const path = useLocation().pathname;
    const dispatch = useDispatch();
    const { theme } = useSelector(state => state.theme);
    const {currentUser} = useSelector((state)=>state.user);
    return(
        <Navbar className="border-b-2">
            <Link to="/" className="self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white">
                <span className="px-2 py-1 rounded-lg text-white bg-gradient-to-r from-indigo-500 via-purple-700 to-pink-500">Blog</span>
                Post
            </Link>
            <form>
                <TextInput
                type="text"
                placeholder="Search"
                rightIcon={AiOutlineSearch}
                className="hidden lg:inline" 
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray'pill >
                <AiOutlineSearch/>
            </Button>
            <div className="flex gap-2 md:order-2">
                <Button className="w-12 h-10 hidden sm:inline" color='gray' pill onClick={() => dispatch(toggleTheme())}>
                {theme === 'light' ? <FaMoon /> : <FaSun />}
                </Button>
                
                {currentUser?(
                    <Dropdown 
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                        alt="user"
                        img={currentUser.profilePicture}
                        rounded
                        />
                    }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">@{currentUser.username}</span>
                            <span className="block font-medium truncate">{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={"/dashboard?tab=profile"}>
                            <Dropdown.Item>
                                Profile
                            </Dropdown.Item>
                        </Link>
                        <DropdownDivider/>
                        <Dropdown.Item>
                                Sign Out
                            </Dropdown.Item>
                    </Dropdown>
                ): 
                (<Link to="/signin">
                    <Button gradientDuoTone="purpleToBlue"  outline>
                        Sign In
                    </Button>
                </Link>
            )}

                <Navbar.Toggle/>
            </div>
            <Navbar.Collapse>
                    <Navbar.Link active={path === "/"} as={'div'}>
                        <Link to="/">Home</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/about"} as={'div'}>
                        <Link to="/about">About</Link>
                    </Navbar.Link>
                    <Navbar.Link active={path === "/dashboard"} as={'div'}>
                        <Link to="/dashboard">Dashboard</Link>
                    </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}