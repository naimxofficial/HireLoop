'use client';
import DashboardStats from '@/components/dashboardComponents/DashboardStats';
import { useSession } from '@/lib/auth-client';
import React from 'react';

const RecruiterDashboard = () => {
    const {data: session, isPending} = useSession();
    const user = session?.user;
    console.log(session);
    return (
        <div className="">
            <h2 className="text-3xl not-md:text-xl font-medium text-white">Welcome back, {isPending ? 'Loading...' : user?.name}</h2>

            <DashboardStats />
            </div>
    );
};

export default RecruiterDashboard;