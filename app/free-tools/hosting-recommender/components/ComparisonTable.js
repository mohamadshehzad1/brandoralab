export default function ComparisonTable({ hosts }) {
  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full border-collapse border border-gray-200 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Provider</th>
            <th className="border p-2">Performance</th>
            <th className="border p-2">Support</th>
            <th className="border p-2">Value</th>
          </tr>
        </thead>
        <tbody>
          {hosts.map((host) => (
            <tr key={host.name} className="text-center">
              <td className="border p-2">{host.name}</td>
              <td className="border p-2">{host.performance}</td>
              <td className="border p-2">{host.support}</td>
              <td className="border p-2">{host.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
