import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: '¿Cómo elijo la talla correcta?',
    answer:
      'Usa nuestra guía de tallas (arriba del catálogo) para comparar el peso y largo de lomo de tu mascota. Si tienes duda, escríbenos por WhatsApp con esas medidas y te ayudamos a elegir sin costo.',
  },
  {
    question: '¿Cuánto tarda el envío?',
    answer:
      'Hacemos envíos a todo México. Los tiempos de entrega varían según tu ciudad; te confirmamos el estimado exacto al hacer tu pedido por WhatsApp.',
  },
  {
    question: '¿Puedo cambiar o devolver un producto?',
    answer:
      'Sí, aceptamos cambios por talla dentro de los primeros días después de recibir tu pedido, siempre que el producto esté sin uso y con su empaque original. Escríbenos por WhatsApp para iniciar el proceso.',
  },
  {
    question: '¿Qué formas de pago aceptan?',
    answer:
      'Coordinamos el pago directamente por WhatsApp: transferencia, tarjeta o el método que tengamos disponible en ese momento.',
  },
  {
    question: '¿Los productos tienen garantía de calidad?',
    answer:
      'Sí. Trabajamos con materiales premium pensados para durar. Si algo no cumple tus expectativas, cuéntanos y buscamos una solución.',
  },
];

function FAQRow({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-4 py-4 text-left"
      >
        <span className="text-sm sm:text-base font-medium text-foreground">
          {item.question}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-200 ${
          open ? 'grid-rows-[1fr] pb-4' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section className="border-t border-border/50 bg-muted/20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="mb-5 font-display text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Preguntas frecuentes
        </h2>

        <div className="rounded-2xl border border-border bg-white px-5">
          {faqs.map((item) => (
            <FAQRow key={item.question} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
