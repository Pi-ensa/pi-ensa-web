function normalize(value: string) {
  return value.trim().replace(/^\[|\]$/g, '');
}

function escapePattern(value: string) {
  return value.replace(/[.*+?^$(){}|[\]\\]/g, '\\$&');
}

function sectionLines(markdown: string, heading: string) {
  const lines = markdown.split(/\r?\n/);
  const pattern = new RegExp(`^##\\s+${escapePattern(heading)}\\s*$`, 'i');
  const start = lines.findIndex((line) => pattern.test(line.trim()));
  if (start < 0) return [];

  const endOffset = lines.slice(start + 1).findIndex((line) => /^##\s+/.test(line.trim()));
  const end = endOffset < 0 ? lines.length : start + 1 + endOffset;
  return lines.slice(start + 1, end);
}

function parseRow(line: string) {
  const escapedPipe = '__MARKDOWN_ESCAPED_PIPE__';
  return line
    .replace(/\\\|/g, escapedPipe)
    .split('|')
    .slice(1, -1)
    .map((cell) => normalize(cell.replaceAll(escapedPipe, '|')));
}

export function tableRows(markdown: string, heading: string) {
  const lines = sectionLines(markdown, heading);
  const headerIndex = lines.findIndex((line) => line.trim().startsWith('|'));
  if (headerIndex < 0) return [];

  const rows: string[][] = [];
  for (const line of lines.slice(headerIndex + 2)) {
    if (!line.trim().startsWith('|')) break;
    rows.push(parseRow(line));
  }
  return rows;
}

export function fields(markdown: string, heading: string) {
  return Object.fromEntries(
    tableRows(markdown, heading)
      .filter((row) => row.length >= 2)
      .map(([key, ...values]) => [key.toLocaleLowerCase('es'), values.join(' | ')]),
  );
}

export function isEnabled(value = '') {
  return /^sí$/i.test(value.trim());
}

export function sectionClass(design = '', fallback = 'Blanco') {
  const styles: Record<string, string> = {
    azul: 'section bg-[var(--primary)] text-white',
    claro: 'section bg-[var(--surface)]',
    blanco: 'section',
    principal: 'section overflow-hidden',
  };
  return styles[design.toLocaleLowerCase('es')] || styles[fallback.toLocaleLowerCase('es')] || styles.blanco;
}
