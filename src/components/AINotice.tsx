import { Sparkles } from 'lucide-react';

interface AINoticeProps {
  message?: string;
}

// Aviso reutilizable para indicar que una función aún no está conectada a una IA real.
export default function AINotice({
  message = 'Esta función estará conectada a una IA real en una próxima etapa. Por ahora es una demostración visual.',
}: AINoticeProps) {
  return (
    <div className="flex items-start gap-2.5 rounded-2xl bg-sky-500/10 dark:bg-sky-400/10 border border-sky-400/30 px-4 py-3 text-sm text-sky-600 dark:text-sky-300">
      <Sparkles className="w-4 h-4 mt-0.5 shrink-0" />
      <p>{message}</p>
    </div>
  );
}
