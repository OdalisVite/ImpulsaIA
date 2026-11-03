import { useMemo, useState } from 'react';
import { BarChart2, ArrowRightLeft, CheckCircle2, AlertCircle, Star, Info, RefreshCw } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import { compareProfileToVacancy, type ComparisonResult } from '@/utils/profileCompare';
import type { ProfileData } from '@/components/sections/ProfileSection';

interface ComparadorSectionProps {
  profile: ProfileData;
}

export default function ComparadorSection({ profile }: ComparadorSectionProps) {
  // Precarga el perfil si ya existe; el usuario puede editarlo.
  const [profileText, setProfileText] = useState<string>(() =>
    [profile.education, profile.experience, profile.skills, profile.projects, profile.goals]
      .filter(Boolean)
      .join('\n\n'),
  );
  const [vacancyText, setVacancyText] = useState<string>('');
  const [result, setResult] = useState<ComparisonResult | null>(null);

  const canCompare = useMemo(
    () => profileText.trim().length > 10 && vacancyText.trim().length > 10,
    [profileText, vacancyText],
  );

  const loadCurrentProfile = () => {
    setProfileText(
      [profile.education, profile.experience, profile.skills, profile.projects, profile.goals]
        .filter(Boolean)
        .join('\n\n'),
    );
    setResult(null);
  };

  const handleCompare = () => {
    if (!canCompare) return;
    setResult(compareProfileToVacancy(profileText, vacancyText));
  };

  const handleClear = () => {
    setProfileText('');
    setVacancyText('');
    setResult(null);
  };

  const compatColor =
    result === null
      ? ''
      : result.compatibility >= 70
        ? 'text-mint-600 dark:text-mint-400'
        : result.compatibility >= 40
          ? 'text-sky-600 dark:text-sky-400'
          : 'text-rose-600 dark:text-rose-400';

  return (
    <section id="comparador" className="py-20 sm:py-28 scroll-mt-20 bg-cream-100/60 dark:bg-navy-900/40">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Comparador de vacante"
          icon={<BarChart2 className="w-4 h-4" />}
          title="¿Qué tan compatible es tu perfil con esa oferta?"
          description="Pega aquí la descripción de una oferta de trabajo y compárala con tu perfil. Identificamos habilidades coincidentes, requisitos pendientes y fortalezas. Es una estimación, no una evaluación definitiva."
        />

        <div className="mt-10 grid lg:grid-cols-2 gap-5">
          {/* Perfil */}
          <div className="card p-6">
            <h3 className="font-display font-bold text-navy-900 dark:text-cream-50 mb-3">
              Tu perfil profesional
            </h3>
            <p className="text-sm text-navy-500 dark:text-cream-200/60 mb-3">
              Se cargó automáticamente desde la sección de perfil. Puedes editarlo aquí si quieres.
            </p>
            <button onClick={loadCurrentProfile} className="btn-ghost text-sm mb-3">
              <RefreshCw className="w-4 h-4" />
              Cargar perfil actual
            </button>
            <textarea
              value={profileText}
              onChange={(e) => setProfileText(e.target.value)}
              placeholder="Pega o escribe aquí tu perfil profesional…"
              rows={10}
              className="input-field resize-none font-mono text-sm"
            />
          </div>

          {/* Vacante */}
          <div className="card p-6">
            <h3 className="font-display font-bold text-navy-900 dark:text-cream-50 mb-3">
              Descripción de la vacante
            </h3>
            <p className="text-sm text-navy-500 dark:text-cream-200/60 mb-3">
              Copia y pega el texto completo de la oferta de trabajo.
            </p>
            <textarea
              value={vacancyText}
              onChange={(e) => setVacancyText(e.target.value)}
              placeholder="Pega aquí la descripción de la oferta…"
              rows={10}
              className="input-field resize-none font-mono text-sm"
            />
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-5 flex flex-wrap gap-3">
          <button onClick={handleCompare} disabled={!canCompare} className="btn-primary">
            <ArrowRightLeft className="w-5 h-5" />
            Comparar perfil con vacante
          </button>
          <button onClick={handleClear} className="btn-ghost">
            Limpiar
          </button>
        </div>

        {/* Resultado */}
        {result && (
          <div className="mt-8 grid gap-5 lg:grid-cols-3 animate-fade-up">
            {/* Compatibilidad */}
            <div className="card p-6 flex flex-col items-center justify-center text-center">
              <h4 className="font-display font-bold text-navy-900 dark:text-cream-50 mb-3">
                Compatibilidad estimada
              </h4>
              <div className={`text-5xl font-display font-extrabold ${compatColor}`}>
                {result.compatibility}%
              </div>
              <div className="mt-3 w-full bg-navy-100 dark:bg-navy-700 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.compatibility >= 70
                      ? 'bg-mint-500'
                      : result.compatibility >= 40
                        ? 'bg-sky-500'
                        : 'bg-rose-500'
                  }`}
                  style={{ width: `${result.compatibility}%` }}
                />
              </div>
              <p className="mt-3 text-xs text-navy-500 dark:text-cream-200/60 flex items-start gap-1.5">
                <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                Calculado como coincidencias ÷ (coincidencias + pendientes). Es una estimación
                basada en términos, no una evaluación definitiva.
              </p>
            </div>

            {/* Coincidencias */}
            <div className="card p-6">
              <h4 className="font-display font-bold text-mint-600 dark:text-mint-400 flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5" />
                Habilidades coincidentes ({result.matches.length})
              </h4>
              {result.matches.length === 0 ? (
                <p className="text-sm text-navy-500 dark:text-cream-200/60">
                  No se detectaron coincidencias con los términos del diccionario.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {result.matches.map((m) => (
                    <span key={m} className="chip bg-mint-500/15 text-mint-600 dark:text-mint-400">
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Pendientes */}
            <div className="card p-6">
              <h4 className="font-display font-bold text-rose-600 dark:text-rose-400 flex items-center gap-2 mb-3">
                <AlertCircle className="w-5 h-5" />
                Requisitos pendientes ({result.pending.length})
              </h4>
              {result.pending.length === 0 ? (
                <p className="text-sm text-navy-500 dark:text-cream-200/60">
                  ¡Cumples con todos los términos detectados en la vacante!
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {result.pending.map((p) => (
                    <span key={p} className="chip bg-rose-500/15 text-rose-600 dark:text-rose-400">
                      {p}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Fortalezas extra */}
            {result.strengths.length > 0 && (
              <div className="card p-6 lg:col-span-3">
                <h4 className="font-display font-bold text-sky-600 dark:text-sky-400 flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5" />
                  Fortalezas adicionales de tu perfil ({result.strengths.length})
                </h4>
                <p className="text-sm text-navy-500 dark:text-cream-200/60 mb-3">
                  Habilidades que tienes pero la vacante no solicita. Pueden ser un diferenciador.
                </p>
                <div className="flex flex-wrap gap-2">
                  {result.strengths.map((s) => (
                    <span key={s} className="chip bg-sky-500/15 text-sky-600 dark:text-sky-400">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
