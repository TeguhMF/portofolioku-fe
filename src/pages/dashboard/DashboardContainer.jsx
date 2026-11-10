import { Outlet } from 'react-router-dom';

const DashboardContainer = () => {
  return (
    <div className="max-w-4xl mx-auto w-full p-4 sm:p-6">
      <Outlet />
    </div>
  );
};

export default DashboardContainer;