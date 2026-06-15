import { Sidebar } from '@/components/dashboardComponents/Sidebar';

const DashboardLayout = ({children}) => {
    return (
        <div className="min-h-screen flex my-25 gap-2">
            <Sidebar></Sidebar>
            <div className="flex-1">{children}</div>
        </div>
    );
};

export default DashboardLayout;