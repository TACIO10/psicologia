export function OfferBar({ parcelamento }: { parcelamento: string }) {
  // Sem cronômetro: o contador reiniciava a cada visita e tirava credibilidade.
  return (
    <a
      className="offer-bar"
      href="#oferta"
      aria-label={`Plano Anual por ${parcelamento}, com os 5 bônus. Ver planos.`}
    >
      <span className="offer-bar-inner">
        <span>
          <span className="offer-plan">Plano Anual por </span>
          <strong>{parcelamento}</strong>
        </span>
        <span className="offer-sep" aria-hidden="true">·</span>
        <span>com os 5 bônus inclusos</span>
      </span>
    </a>
  );
}
