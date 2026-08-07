import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCategories } from '../hooks/useProducts';
import { SkeletonGrid } from '../components/Skeletons';
import SectionHeading from '../components/SectionHeading';
import { IconGift, IconCard, IconArrowRight } from '../components/icons';

const Categories = () => {
  const { categories, loading } = useCategories();

  return (
    <div className="container-x animate-fade-in py-12">
      <SectionHeading
        eyebrow="Explore"
        title="All Categories"
        subtitle="Discover cards for every categories and every occasion."
      />

      {loading ? (
        <SkeletonGrid count={8} />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((c, i) => (
            <motion.div
              key={c._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 6) * 0.06 }}
            >
              <Link to={`/category/${c.slug}`} className="group card flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:shadow-card-lg">
                <div className="flex items-center gap-4 p-6">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-brand-600/10 to-fuchsia-600/10 text-brand-600 transition-transform group-hover:scale-110 dark:text-brand-300">
                    <IconCard size={26} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-bold">{c.name}</h3>
                    <p className="text-xs font-medium text-slate-400">
                      {c.productCount} card{c.productCount === 1 ? '' : 's'}
                    </p>
                  </div>
                </div>
                <div className="mt-auto border-t border-slate-100 px-6 py-3.5 dark:border-slate-800">
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-600 dark:text-brand-300">
                    Browse category <IconArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-14 rounded-3xl bg-gradient-to-br from-brand-600 to-fuchsia-600 p-8 text-center text-white">
        <IconGift size={36} className="mx-auto mb-3" />
        <h3 className="font-display text-2xl font-bold">Can't find what you're looking for?</h3>
        <p className="mx-auto mt-2 max-w-md text-white/85">We're adding new cards every week. Keep an eye out!</p>
      </div>
    </div>
  );
};

export default Categories;
