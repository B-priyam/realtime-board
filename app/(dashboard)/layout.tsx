import Navbar from "./_components/navbar";
import OrgSideBar from "./_components/org-sidebar";
import Sidebar from "./_components/Sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}


const layout = ({children}:DashboardLayoutProps) => {
  return (
    <main className="h-full">
        <Sidebar/>
        <div className="pl-[60px] h-full">
            <div className="flex gap-x-3 h-full">
                <OrgSideBar/>
                <div className="h-full flex-1">
                    <Navbar/>
                {children}
                </div>
            </div>
        </div>
    </main>
  )
}

export default layout
