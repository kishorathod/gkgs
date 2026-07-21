import React from 'react';
import { ComparisonTable } from '../../types/study-material';

interface TablesProps {
  tables?: ComparisonTable[];
}

export const ComparisonTables: React.FC<TablesProps> = ({ tables }) => {
  if (!tables || tables.length === 0) return null;

  return (
    <div className="tables-section">
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '16px', color: 'var(--text-main)' }}>
        📊 High-Yield Comparison Tables
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {tables.map((table, tIdx) => (
          <div key={tIdx} className="table-card glass-card" style={{ padding: '16px', overflowX: 'auto' }}>
            <h4 style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-main)', marginBottom: '12px' }}>{table.title}</h4>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)', borderBottom: '1px solid var(--border-glass)' }}>
                  {table.headers.map((h, hIdx) => (
                    <th key={hIdx} style={{ padding: '10px 12px', textAlign: 'left', color: 'var(--accent-purple)', fontWeight: '700' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, rIdx) => (
                  <tr key={rIdx} style={{ borderBottom: '1px solid var(--border-glass)' }}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} style={{ padding: '10px 12px', color: 'var(--text-secondary)' }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};
