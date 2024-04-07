import { Label, Sidebar } from 'flowbite-react';
import {HiUser,HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link, useLocation} from 'react-router-dom';

export default function DashSidebar() {
    const location = useLocation();
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [tab, setTab] = useState('');
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search);
      const tabFromUrl = urlParams.get('tab');
      if (tabFromUrl) {
        setTab(tabFromUrl);
      }
    }, [location.search]);
  return (
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Link to="/dashboard?tab=profile">
        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={"User"} as={"div"} >
            profile
        </Sidebar.Item>
        </Link>
        <Sidebar.Item  icon={HiArrowSmRight}  lableColor='dark' className='cursor-pointer' as={"div"} >
            Sign Out
        </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>   
  )
}
