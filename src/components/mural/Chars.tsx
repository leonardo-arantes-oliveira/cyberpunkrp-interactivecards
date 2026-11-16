export function Chars({ texto }: { texto: string }) {
  return (
    <>
      {Array.from(texto).map((caractere, indice) => (
        <span
          key={`${indice}-${caractere}`}
          data-char
          style={{ display: "inline-block" }}
        >
          {caractere === " " ? "\u00A0" : caractere}
        </span>
      ))}
    </>
  );
}
