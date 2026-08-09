const sizeRows = [
  { size: '0', peso: '1 – 2 kg', largo: '18 – 22 cm', ejemplo: 'Chihuahua bebé, Yorkie mini' },
  { size: '1', peso: '2 – 4 kg', largo: '22 – 27 cm', ejemplo: 'Chihuahua, Pomerania' },
  { size: '2', peso: '4 – 6 kg', largo: '27 – 32 cm', ejemplo: 'Poodle toy, Maltés' },
  { size: '3', peso: '6 – 9 kg', largo: '32 – 37 cm', ejemplo: 'Schnauzer mini, Shih Tzu' },
  { size: '4', peso: '9 – 13 kg', largo: '37 – 42 cm', ejemplo: 'Beagle, Cocker Spaniel' },
  { size: '5', peso: '13 – 18 kg', largo: '42 – 48 cm', ejemplo: 'Border Collie, Bulldog Francés' },
  { size: '6', peso: '18 – 25 kg', largo: '48 – 55 cm', ejemplo: 'Labrador joven, Husky' },
];

export function SizeGuide() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-5">
        <h2 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-foreground">
          Guía de tallas
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Nuestras tallas van de 0 a 6. Estos rangos son aproximados — si tienes duda,
          mide a tu mascota o escríbenos por WhatsApp y te ayudamos a elegir. 🐾
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border bg-white">
        <table className="w-full min-w-[520px] text-left text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs uppercase tracking-wide text-muted-foreground">
              <th className="px-4 py-3 font-medium">Talla</th>
              <th className="px-4 py-3 font-medium">Peso aprox.</th>
              <th className="px-4 py-3 font-medium">Largo de lomo</th>
              <th className="px-4 py-3 font-medium">Ejemplos de raza</th>
            </tr>
          </thead>
          <tbody>
            {sizeRows.map((row, i) => (
              <tr
                key={row.size}
                className={i % 2 === 0 ? 'bg-white' : 'bg-muted/20'}
              >
                <td className="px-4 py-3 font-semibold text-foreground">{row.size}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.peso}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.largo}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.ejemplo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        📏 Cómo medir: largo de lomo = desde la base del cuello hasta el inicio de la cola.
      </p>
    </section>
  );
}
