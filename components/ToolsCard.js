import Link from "next/link";
import { Globe, Search, Server } from "lucide-react"; // ✅ Lucide icons

const ToolsCard = ({ title, description, url }) => {
  // Map tool names to icons
  const getIcon = (name) => {
    switch (name.toLowerCase()) {
      case "ip checker":
        return <Globe className="w-10 h-10 text-blue-500" strokeWidth={1.8} />;
      case "ip lookup":
        return <Search className="w-10 h-10 text-green-500" strokeWidth={1.8} />;
      case "dns propagation checker":
      case "dns checker":
        return <Server className="w-10 h-10 text-purple-500" strokeWidth={1.8} />;
      default:
        return <Globe className="w-10 h-10 text-gray-400" strokeWidth={1.8} />;
    }
  };

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      prefetch={false}
      className="group flex flex-col items-center justify-start rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 ease-out p-6 text-center"
      aria-label={title}
    >
      {/* Icon */}
      <div className="w-16 h-16 mb-4 flex items-center justify-center rounded-full bg-gray-50 border border-gray-100 group-hover:border-blue-400 transition-all duration-300">
        {getIcon(title)}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
        {description}
      </p>

      {/* Hover CTA */}
      <div className="opacity-0 group-hover:opacity-100 mt-3 transition-opacity duration-300">
        <span className="text-blue-600 text-sm font-medium">Open Tool →</span>
      </div>
    </Link>
  );
};

export default ToolsCard;
