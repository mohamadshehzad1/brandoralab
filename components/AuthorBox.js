import Image from "next/image";
import logo from '@/public/brandora-lab-logo.png';

export default function AuthorBox() {
  return (
    <section
      className="max-w-3xl mx-auto my-10 px-6 py-8 bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col md:flex-row items-center gap-6"
      itemScope
      itemType="https://schema.org/Person"
    >
      {/* Author Image */}
      <figure className="flex-shrink-0">
        <Image
          src="https://res.cloudinary.com/dpgspconw/image/upload/v1759154339/web-hosting-for-bloggers_cbnl6u.avif"
          alt="BrandoraLab - Author photo"
          width={96}
          height={96}
          className="rounded-xl object-cover border border-gray-200"
          itemProp="image"
        />
      </figure>

      {/* Author Info */}
      <figcaption className="flex-1 text-center md:text-left">
        <meta itemProp="jobTitle" content="Senior Content Writer & SEO Expert" />
        <meta itemProp="url" content="https://brandoralab.com/about" />

        <div className="text-sm text-gray-500 mb-1">Written by</div>
        <h3
          className="text-lg font-semibold text-gray-900 tracking-tight"
          itemProp="name"
        >
          Brandora Lab
        </h3>

        <p
          className="text-gray-600 text-sm mt-2 leading-relaxed"
          itemProp="description"
        >
          Senior content writer, SEO expert, and hands-on hosting tester who runs
          long-term hosting tests to reveal real-world performance and insights.
        </p>

        {/* Social Links (optional, good for authority signals) */}
        <div className="flex justify-center md:justify-start gap-4 mt-3 text-sm">
          <a
            href="https://twitter.com/brandoralab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600"
            itemProp="sameAs"
          >
            Facebook
          </a>
          <a
            href="https://linkedin.com/company/brandoralab"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-800"
            itemProp="sameAs"
          >
            Youtube
          </a>
          <a
            href="https://brandoralab.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            About
          </a>
        </div>
      </figcaption>
    </section>
  );
}
