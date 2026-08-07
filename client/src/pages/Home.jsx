import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProducts, useCategories } from '../hooks/useProducts';
import ProductCard from '../components/ProductCard';
import SectionHeading from '../components/SectionHeading';
import { SkeletonGrid } from '../components/Skeletons';
import { IconGift, IconCard, IconArrowRight, IconTruck, IconShield, IconClock, IconSpinner } from '../components/icons';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const Hero = () => {
  const [q, setQ] = useState('');
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-fuchsia-600 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-orange-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_45%)]" />
      </div>

      <div className="container-x relative grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-28">
        <motion.div initial="hidden" animate="show">
          <motion.p variants={fadeUp} custom={0} className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            <span className="grid h-5 w-5 place-items-center rounded-full bg-white/25"><IconGift size={12} /></span>
            Premium Printed Invitation Cards
          </motion.p>
          <motion.h1 variants={fadeUp} custom={1} className="font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Beautiful Cards,
            <span className="block bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">Printed to
Perfection.</span>
          </motion.h1>
          <motion.p variants={fadeUp} custom={2} className="mt-5 max-w-lg text-lg text-white/85">
           From elegant wedding invitations to fun birthday and party cards, explore beautifully crafted designs with premium paper quality, custom printing, and nationwide delivery.
          </motion.p>

          <motion.form
            variants={fadeUp}
            custom={3}
            onSubmit={(e) => { e.preventDefault(); window.location.href = `/search?q=${encodeURIComponent(q)}`; }}
            className="mt-8 flex max-w-md gap-2 rounded-2xl bg-white p-1.5 shadow-card-lg"
          >
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search cards here"
              className="flex-1 bg-transparent px-3 text-sm text-slate-800 outline-none"
            />
            <button type="submit" className="btn-primary">
              Search
            </button>
          </motion.form>

          <motion.div variants={fadeUp} custom={4} className="mt-8 flex flex-wrap gap-6 text-sm">
            {[
              { icon: <IconTruck size={18} />, label: 'Instant Delivery' },
              { icon: <IconShield size={18} />, label: 'Secure Checkout' },
              { icon: <IconClock size={18} />, label: 'No Expiry' },
            ].map((f) => (
              <span key={f.label} className="flex items-center gap-2 text-white/90">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/15">{f.icon}</span>
                {f.label}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: 3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="animate-float space-y-4">
            <div className="ml-auto w-3/4 rounded-3xl bg-white/15 p-6 backdrop-blur-lg ring-1 ring-white/25">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/20 text-2xl">💍</span>
                <div>
                  <p className="text-sm font-bold">Wedding Invitation</p>
                  <p className="text-xs text-white/70">Elegant Collection</p>
                </div>
              </div>
            </div>
            <div className="w-2/3 rounded-3xl bg-white/15 p-6 backdrop-blur-lg ring-1 ring-white/25">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/20 text-2xl">🎂</span>
                <div>
                  <p className="text-sm font-bold">Birthday Invitation</p>
                  <p className="text-xs text-white/70">Custom Designs</p>
                </div>
              </div>
            </div>
            <div className="ml-auto w-3/4 rounded-3xl bg-white/15 p-6 backdrop-blur-lg ring-1 ring-white/25">
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-2xl bg-white/20 text-2xl">🎉</span>
                <div>
                  <p className="text-sm font-bold">Party Invitation</p>
                  <p className="text-xs text-white/70">Premium Print</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Stats bar */}
      <div className="relative border-t border-white/10 bg-black/10 backdrop-blur">
        <div className="container-x grid grid-cols-3 divide-x divide-white/10 py-5 text-center">
          {[
            { n: '10+', l: 'Category' },
            { n: '25k+', l: 'Cards Delivered' },
            { n: '4.9/5', l: 'Average Rating' },
          ].map((s) => (
            <div key={s.l}>
              <p className="font-display text-2xl font-extrabold">{s.n}</p>
              <p className="text-xs text-white/70">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CategoryStrip = () => {
  const { categories, loading } = useCategories();
  const active = categories.filter((c) => c.isActive && c.productCount > 0).slice(0, 8);

  if (loading) {
    return <div className="flex justify-center py-6"><IconSpinner size={24} className="text-brand-600" /></div>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {active.map((c, i) => (
        <motion.div key={c._id} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}>
          <Link
            to={`/category/${c.slug}`}
            className="group card flex items-center gap-3 p-4 hover:-translate-y-0.5 hover:shadow-card-lg"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand-600/10 to-fuchsia-600/10 text-brand-600 transition-transform group-hover:scale-110 dark:text-brand-300">
              <IconCard size={22} />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold">{c.name}</span>
              <span className="text-xs text-slate-400">{c.productCount} cards</span>
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

const Home = () => {
  const featured = useProducts({ sort: 'popular', limit: 8 });
  const newArrivals = useProducts({ sort: 'newest', limit: 4 });

  return (
    <div className="animate-fade-in">
      <Hero />

      {/* Categories */}
      <section className="container-x py-14">
        <SectionHeading eyebrow="Browse" title="Shop by Category" subtitle="From weddings to birthdays — find the perfect invitation for every celebration." />
        <CategoryStrip />
      </section>

      {/* Featured */}
      <section className="container-x pb-14">
        <div className="mb-6 flex items-end justify-between">
          <SectionHeading eyebrow="Best Sellers" title="Featured Cards" center={false} />
          <Link to="/search" className="btn-secondary hidden sm:inline-flex">
            View all <IconArrowRight size={16} />
          </Link>
        </div>
        {featured.loading ? (
          <SkeletonGrid count={8} />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {featured.products.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* New arrivals */}
      <section className="bg-gradient-to-b from-transparent to-brand-50/60 py-14 dark:to-brand-900/10">
        <div className="container-x">
          <div className="mb-6 flex items-end justify-between">
            <SectionHeading eyebrow="Fresh" title="New Arrivals" center={false} />
          </div>
          {newArrivals.loading ? (
            <SkeletonGrid count={4} />
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {newArrivals.products.map((p) => <ProductCard key={p._id} product={p} />)}
            </div>
          )}
        </div>
      </section>

      {/* How it works */}
      <section className="container-x py-14">
        <SectionHeading eyebrow="Simple" title="How It Works" subtitle="Three easy steps from card idea to delivered." />
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { step: '01', title: 'Choose a card', desc: 'Browse hundreds of cards  and pick the perfect one.', emoji: '🛒' },
            { step: '02', title: 'Checkout instantly', desc: 'Fill in delivery details and place your order — no payment needed to try the demo.', emoji: '⚡' },
            { step: '03', title: 'Delivered by email', desc: 'Your card lands to your door.', emoji: '💌' },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card relative p-6 text-center"
            >
              <span className="absolute left-5 top-5 font-display text-4xl font-extrabold text-brand-600/10 dark:text-brand-300/10">{s.step}</span>
              <span className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-brand-600/10 to-fuchsia-600/10 text-3xl">{s.emoji}</span>
              <h3 className="font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-x pb-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-fuchsia-600 px-8 py-14 text-center text-white">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-orange-400/20 blur-2xl" />
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">Never run out of ideas again</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Join thousands of happy customers and discover the easiest way to send cards.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link to="/search" className="btn bg-white text-brand-700 hover:bg-brand-50">
              Explore  Cards
            </Link>
            <Link to="/signup" className="btn bg-black/20 text-white ring-1 ring-white/40 hover:bg-black/30">
              Create an Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
