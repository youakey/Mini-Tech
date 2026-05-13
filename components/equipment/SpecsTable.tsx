/** Таблица технических характеристик — JetBrains Mono для значений, адаптивная */

interface SpecRow {
  label: string;
  value: string;
}

interface SpecsTableProps {
  specs: SpecRow[];
  caption?: string;
}

export function SpecsTable({ specs, caption }: SpecsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-sm" aria-label={caption ?? 'Технические характеристики'}>
        {caption && (
          <caption className="sr-only">{caption}</caption>
        )}
        <tbody>
          {specs.map((row, index) => (
            <tr
              key={row.label}
              className={index % 2 === 0 ? 'bg-surface' : 'bg-surface-2'}
            >
              <td className="px-5 py-3.5 text-text-muted font-medium w-1/2 border-b border-border last:border-0">
                {row.label}
              </td>
              <td className="px-5 py-3.5 text-text font-mono font-medium border-b border-border last:border-0">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
