import { Outlet } from 'react-router-dom';
import LivePreviewCard from '../../components/LivePreviewCard';

const DashboardContainer = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Panel Form Input (Kiri - 7 Kolom) */}
      <div className="lg:col-span-7">
        <Outlet />
      </div>

      {/* Live Preview Panel (Kanan - 5 Kolom) */}
      <div className="hidden lg:block lg:col-span-5 sticky top-24">
        <div className="mb-2 flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
             Instant Live Preview
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
            Auto Sync
          </span>
        </div>
        <LivePreviewCard />
      </div>
    </div>
  );
};

export default DashboardContainer;