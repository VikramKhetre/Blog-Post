import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";
import DashComments from "../components/DashComment";
import DashboardComp from "../components/DashboardComp";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");

  // side effect used to set value of tab everytime loaction.search -> ?tab changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    setTab(tabFromUrl);
  }, [location.search]);

  return (
    <div>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-56">
          {/* Sidebar */}
          <DashSidebar />
        </div>
        {/* profile... */}
        {tab === "profile" && <DashProfile />}
        {/* Posts- */}
        {tab==="posts" &&<DashPosts/>}
        {/* users */}
        {tab=="users" && <DashUsers/>}
        {/* comments  */}
       {tab === 'comments' && <DashComments />}
        {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
      </div>
    </div>
  );
}
