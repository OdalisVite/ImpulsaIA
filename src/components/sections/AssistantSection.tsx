import { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles } from 'lucide-react';
import SectionHeader from '@/components/SectionHeader';
import AINotice from '@/components/AINotice';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  '¿Cómo debo estructurar mi currículum?',
  '¿Qué habilidades debo destacar en una entrevista?',
  '¿Cómo busco mi primer empleo sin experiencia?',
  '¿Qué debo incluir en mi perfil de LinkedIn?',
];

// Respuestas locales predefinidas como demostración. No provienen de una IA real.
const DEMO_RESPONSES: Record<string, string> = {
  currículum:
    'Un buen currículum incluye: encabezado con tus datos de contacto, un resumen breve de tu perfil, formación académica, experiencia (aunque sea proyectos o pasantías), habilidades y proyectos destacados. Mantenlo en una página si tienes poca experiencia.',
  entrevista:
    'En una entrevista, destaca tus habilidades transferibles como comunicación, resolución de problemas y disposición a aprender. Usa ejemplos concretos de proyectos académicos o personales cuando no tengas experiencia laboral formal.',
  'primer empleo':
    'Para tu primer empleo sin experiencia: enfócate en proyectos personales y académicos, construye un portafolio en GitHub o un sitio web, participa en comunidades, y postula a posiciones junior o programas de capacitación. La actitud cuenta tanto como los conocimientos técnicos.',
  linkedin:
    'En LinkedIn incluye: foto profesional, titular claro con tu rol objetivo, resumen que cuente tu historia profesional, experiencia y proyectos con resultados medibles, habilidades con validaciones, y mantén un perfil activo compartiendo contenido de tu área.',
};

function getDemoResponse(question: string): string {
  const q = question.toLowerCase();
  if (q.includes('currículum') || q.includes('cv') || q.includes('curriculum')) return DEMO_RESPONSES['currículum'];
  if (q.includes('entrevista')) return DEMO_RESPONSES['entrevista'];
  if (q.includes('primer empleo') || q.includes('experiencia') || q.includes('sin experiencia')) return DEMO_RESPONSES['primer empleo'];
  if (q.includes('linkedin')) return DEMO_RESPONSES['linkedin'];
  return 'Esta es una respuesta de demostración. Cuando el asistente se conecte a una IA real, aquí recibirás orientación personalizada sobre tu pregunta.';
}

export default function AssistantSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { role: 'user', content: trimmed };
    const botMsg: ChatMessage = { role: 'assistant', content: getDemoResponse(trimmed) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  return (
    <section id="asistente" className="py-20 sm:py-28 scroll-mt-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Asistente de orientación IA"
          icon={<Bot className="w-4 h-4" />}
          title="Resuelve tus dudas sobre búsqueda de empleo"
          description="Pregunta sobre currículums, entrevistas, búsqueda de empleo y desarrollo profesional. Esta sección está lista para conectarse a una IA real."
        />

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {/* Preguntas sugeridas */}
          <div className="card p-6">
            <h3 className="font-display font-bold text-navy-900 dark:text-cream-50 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-lilac-500" />
              Preguntas sugeridas
            </h3>
            <div className="space-y-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="w-full text-left px-4 py-3 rounded-2xl text-sm text-navy-700 dark:text-cream-200 bg-cream-100 dark:bg-navy-800 hover:bg-lilac-500/10 dark:hover:bg-lilac-500/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <AINotice message="Las respuestas son de demostración. La conexión a IA real llegará en una próxima etapa." />
            </div>
          </div>

          {/* Chat */}
          <div className="card p-0 lg:col-span-2 flex flex-col h-[28rem] overflow-hidden">
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.length === 0 && (
                <div className="h-full grid place-items-center text-center text-navy-400 dark:text-navy-500">
                  <div>
                    <Bot className="w-12 h-12 mx-auto mb-3 opacity-40" />
                    <p className="text-sm">Escribe una pregunta o elige una sugerencia para empezar.</p>
                  </div>
                </div>
              )}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-3 animate-fade-up ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {msg.role === 'assistant' && (
                    <span className="grid place-items-center w-8 h-8 rounded-xl bg-lilac-500/15 text-lilac-600 dark:text-lilac-400 shrink-0">
                      <Bot className="w-4 h-4" />
                    </span>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-navy-700 dark:bg-lilac-600 text-white'
                        : 'bg-cream-100 dark:bg-navy-800 text-navy-800 dark:text-cream-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
            </div>
            {/* Input */}
            <div className="border-t border-navy-100 dark:border-navy-700 p-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send(input)}
                placeholder="Escribe tu pregunta…"
                className="input-field"
              />
              <button onClick={() => send(input)} disabled={!input.trim()} className="btn-primary px-4 shrink-0">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
