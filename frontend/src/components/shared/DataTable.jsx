import { Search } from 'lucide-react';

export default function DataTable({ columns, data, searchKey, isLoading, searchValue, onSearchChange, emptyMessage = 'No data found' }) {
  return (
    <div className="glass-card overflow-hidden fade-in">
      {searchKey && (
        <div className="p-4" style={{ borderBottom: '1px solid var(--table-border)' }}>
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
            <input
              type="text"
              placeholder={`Search by ${searchKey}...`}
              value={searchValue || ''}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="input-glass w-full pl-10 pr-4 py-2 text-sm rounded-xl"
            />
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full glass-table">
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      <div className="skeleton h-4 w-24 rounded" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-12 text-on-surface-variant">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, idx) => (
                <tr key={row.id || idx}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
