// components/CategoriesGrid.jsx
import Link from 'next/link';
import { CategoriesData } from '@/Data/Categories';
import {
  Server,
  Globe,
  Mail,
  BarChart2,
  Layout,
  Link as LinkIcon,
} from 'lucide-react';

const iconsMap = {
  server: <Server size={40} />,
  globe: <Globe size={40} />,
  mail: <Mail size={40} />,
  'bar-chart-2': <BarChart2 size={40} />,
  layout: <Layout size={40} />,
  link: <LinkIcon size={40} />,
};

export default function CategoriesGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Explore Affiliate Blog Categories
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Curated guides, tools, and resources to grow your affiliate blog —
            from hosting to SEO.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CategoriesData.map((category, idx) => (
            <Link
              key={idx}
              href={category.link}
              className="group block bg-gray-50 hover:bg-gray-100 transition rounded-2xl p-6 shadow-sm hover:shadow-lg border border-gray-200"
            >
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-indigo-50 text-indigo-600 group-hover:bg-indigo-100">
                  {iconsMap[category.icon] ?? <Server size={40} />}
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600">
                {category.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                {category.description}
              </p>

              <div className="mt-4 text-sm font-medium text-indigo-600 group-hover:underline">
                Explore →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
