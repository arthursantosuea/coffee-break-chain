export function formatUnixTimestamp(timestamp) {
  const date = new Date(Number(timestamp) * 1000); // Multiplica por 1000 para converter de segundos para milissegundos

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
  };

  return date.toLocaleDateString('pt-BR', options);
}