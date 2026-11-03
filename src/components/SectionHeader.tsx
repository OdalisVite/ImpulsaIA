import type { ReactNode } from 'react';

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  icon,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <div
        className={`inline-flex items-center gap-2 rounded-full bg-lilac-500/10 dark:bg-lilac-500/15 text-lilac-600 dark:text-lilac-400 px-3.5 py-1.5 text-sm font-semibold mb-4`}
      >
        {icon}
        {eyebrow}
      </div>
      <h2 className="section-title text-3xl sm:text-4xl leading-tight">{title}</h2>
      {description && (
        <p className="mt-3 text-navy-600 dark:text-cream-200/70 text-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
