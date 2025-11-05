import React from "react";
import { Download, BarChart3, Clock, Cpu } from "lucide-react";

const encodeCSV = (s) => encodeURIComponent(s);

const MethodologyDataSection = ({ 
  rawCsv, 
  title = "Test Methodology & Raw Data",
  description = "Transparency is critical for a credible review. Below is exactly how we tested and the raw runs we recorded.",
  methodologyPoints = [
    "Tools used: GTmetrix (Web Vitals + Waterfall), WebPageTest, WP Benchmark plugin.",
    "Test locations: US-East (consistent across runs).",
    "Template used: Envato Elements default template (as shipped) — to reflect typical user setups.",
    "Runs: Multiple runs per host across different dates; all tests performed from clean cache where applicable."
  ],
  summaryStats = {
    avgTtfb: "~150ms",
    bestLoadTime: "1.18s",
    testDuration: "9 months",
    toolsUsed: "3",
    avgTtfbHost: "InterServer",
    bestLoadTimeNote: "With caching",
    testDurationNote: "8 test runs",
    toolsUsedNote: "GTmetrix, WebPageTest, WP Benchmark"
  }
}) => {
  // Add credit to the CSV data
  const csvWithCredit = `${rawCsv}\n\nData provided by BrandoraLab - https://brandoralab.com`;

  return (
    <section id="methodology" className="mt-8 bg-white p-4 rounded-lg shadow-sm border">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-gray-700">{description}</p>
      <ul className="list-disc list-inside mt-2 text-sm text-gray-700 space-y-1">
        {methodologyPoints.map((point, index) => (
          <li key={index}>{point}</li>
        ))}
      </ul>

      <div className="mt-4">
        <a
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded shadow-sm hover:bg-blue-700 text-sm font-medium transition-colors"
          href={`data:text/csv;charset=utf-8,${encodeCSV(csvWithCredit)}`}
          download="interserver-9-months-raw-data.csv"
        >
          <Download className="w-4 h-4 mr-2" />
          📊 Download Raw CSV (All Runs)
        </a>
      </div>

      {/* Desktop Table (hidden on mobile) */}
      <div className="hidden md:block mt-4 overflow-x-auto">
        <table className="w-full text-sm text-left border-collapse border border-gray-200">
          <thead className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-500 text-white">
            <tr>
              <th className="p-3 font-semibold border border-gray-300">Date</th>
              <th className="p-3 font-semibold border border-gray-300">Host</th>
              <th className="p-3 font-semibold border border-gray-300">Tool</th>
              <th className="p-3 font-semibold border border-gray-300">TTFB (ms)</th>
              <th className="p-3 font-semibold border border-gray-300">Fully Loaded (s)</th>
              <th className="p-3 font-semibold border border-gray-300">Notes</th>
            </tr>
          </thead>
          <tbody>
            {rawCsv.split("\n").slice(1).map((row, idx) => {
              if (!row.trim()) return null;
              const [date, host, location, tool, run, ttfb, full, notes] = row.split(",");
              return (
                <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="p-3 border border-gray-200 font-medium">{date}</td>
                  <td className="p-3 border border-gray-200">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      host === 'InterServer' ? 'bg-green-100 text-green-800' : 
                      host === 'Hostinger' ? 'bg-blue-100 text-blue-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {host}
                    </span>
                  </td>
                  <td className="p-3 border border-gray-200">{tool}</td>
                  <td className="p-3 border border-gray-200 font-mono text-sm">{ttfb}ms</td>
                  <td className="p-3 border border-gray-200 font-mono text-sm">{full}s</td>
                  <td className="p-3 border border-gray-200 text-xs text-gray-600">{notes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards (shown on mobile) */}
      <div className="md:hidden mt-4 space-y-4">
        {rawCsv.split("\n").slice(1).map((row, idx) => {
          if (!row.trim()) return null;
          const [date, host, location, tool, run, ttfb, full, notes] = row.split(",");
          
          return (
            <div key={idx} className="bg-white border border-gray-200 rounded-lg shadow-sm p-4">
              {/* Header with Date and Host */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900">{date}</span>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    host === 'InterServer' ? 'bg-green-100 text-green-800' : 
                    host === 'Hostinger' ? 'bg-blue-100 text-blue-800' : 
                    'bg-red-100 text-red-800'
                  }`}>
                    {host}
                  </span>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Run {run}</span>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="text-center p-2 bg-blue-50 rounded-lg">
                  <div className="text-xs text-gray-600 font-medium">TTFB</div>
                  <div className="text-sm font-mono font-bold text-blue-700">{ttfb}ms</div>
                </div>
                <div className="text-center p-2 bg-green-50 rounded-lg">
                  <div className="text-xs text-gray-600 font-medium">Load Time</div>
                  <div className="text-sm font-mono font-bold text-green-700">{full}s</div>
                </div>
              </div>

              {/* Tool and Notes */}
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Tool:</span>
                  <span className="text-gray-900">{tool}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 font-medium">Location:</span>
                  <span className="text-gray-900">{location}</span>
                </div>
                {notes && (
                  <div>
                    <span className="text-gray-600 font-medium block mb-1">Notes:</span>
                    <span className="text-gray-900">{notes}</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <div className="flex items-center mb-3">
          <BarChart3 className="w-5 h-5 text-gray-700 mr-2" />
          <h4 className="text-sm font-semibold text-gray-900">📈 Performance Summary</h4>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-600">Avg TTFB</div>
            <div className="text-lg font-bold text-blue-600">{summaryStats.avgTtfb}</div>
            <div className="text-xs text-gray-500">{summaryStats.avgTtfbHost}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Best Load Time</div>
            <div className="text-lg font-bold text-green-600">{summaryStats.bestLoadTime}</div>
            <div className="text-xs text-gray-500">{summaryStats.bestLoadTimeNote}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Test Duration</div>
            <div className="text-lg font-bold text-purple-600">{summaryStats.testDuration}</div>
            <div className="text-xs text-gray-500">{summaryStats.testDurationNote}</div>
          </div>
          <div>
            <div className="text-xs text-gray-600">Tools Used</div>
            <div className="text-lg font-bold text-orange-600">{summaryStats.toolsUsed}</div>
            <div className="text-xs text-gray-500">{summaryStats.toolsUsedNote}</div>
          </div>
        </div>
      </div>

      {/* Credit notice */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-xs text-blue-700 text-center">
          <strong>Data Source:</strong> All performance data collected and verified by{" "}
          <a 
            href="https://brandoralab.com" 
            className="underline hover:text-blue-900 font-medium"
            target="_blank"
            rel="noopener noreferrer"
          >
            BrandoraLab
          </a>
        </p>
      </div>
    </section>
  );
};

export default MethodologyDataSection;