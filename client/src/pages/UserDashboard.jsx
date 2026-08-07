import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import api, { getErrorMessage } from '../services/api';
import { SkeletonRows } from '../components/Skeletons';
import EmptyState from '../components/EmptyState';
import { formatINR } from '../utils/currency';
import { IconPackage, IconClock, IconCheck, IconUser, IconMail, IconPhone } from '../components/icons';

const UserDashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    api
      .get('/profile')
      .then((res) => {
        if (!cancelled) setProfile(res.data);
      })
      .catch((err) => {
        if (!cancelled) toast.error(getErrorMessage(err));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const statusBadge = (status) =>
    status === 'pending' ? (
      <span className="badge bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"><IconClock size={12} /> Pending</span>
    ) : (
      <span className="badge bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"><IconCheck size={12} /> Delivered</span>
    );

  return (
    <div className="container-x animate-fade-in py-10">
      {/* Header */}
      <div className="mb-8 rounded-3xl bg-gradient-to-br from-brand-700 to-fuchsia-600 p-8 text-white">
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid h-16 w-16 place-items-center rounded-2xl bg-white/15 text-2xl font-extrabold backdrop-blur">
            {(user?.name || 'U').charAt(0).toUpperCase()}
          </span>
          <div>
            <h1 className="font-display text-2xl font-extrabold">Welcome, {user?.name}!</h1>
            <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-white/80">
              <span className="flex items-center gap-1.5"><IconMail size={14} /> {user?.email}</span>
              <span className="flex items-center gap-1.5"><IconPhone size={14} /> {user?.phone}</span>
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <SkeletonRows rows={4} />
      ) : (
        <>
          {/* Stats */}
          <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { label: 'Total Orders', value: profile?.stats?.totalOrders ?? 0, icon: <IconPackage size={20} /> },
              { label: 'Pending', value: profile?.stats?.pendingOrders ?? 0, icon: <IconClock size={20} /> },
              { label: 'Delivered', value: profile?.stats?.deliveredOrders ?? 0, icon: <IconCheck size={20} /> },
              { label: 'Member Since', value: new Date(profile?.user?.createdAt || Date.now()).toLocaleDateString(), icon: <IconUser size={20} /> },
            ].map((s) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="card p-5">
                <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-brand-600/10 text-brand-600 dark:text-brand-300">{s.icon}</span>
                <p className="font-display text-2xl font-extrabold">{s.value}</p>
                <p className="text-xs font-medium text-slate-400">{s.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Orders */}
          <h2 className="mb-4 font-display text-xl font-bold">My Orders</h2>
          {profile?.orders?.length === 0 ? (
            <EmptyState
              icon={<IconPackage size={28} />}
              title="No orders yet"
              description="When you place an order it will show up here."
              actionLabel="Start shopping"
              actionTo="/search"
            />
          ) : (
            <div className="space-y-3">
              {profile?.orders?.map((o) => (
                <div key={o.orderId} className="card flex flex-wrap items-center justify-between gap-3 p-5">
                  <div>
                    <Link to={`/order-success/${o.orderId}`} className="font-mono text-sm font-bold text-brand-600 hover:underline dark:text-brand-300">
                      {o.orderId}
                    </Link>
                    <p className="text-xs text-slate-400">{new Date(o.createdAt).toLocaleDateString()} • {o.items} item{o.items === 1 ? '' : 's'}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-display text-lg font-extrabold">{formatINR(o.total)}</span>
                    {statusBadge(o.status)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default UserDashboard;
