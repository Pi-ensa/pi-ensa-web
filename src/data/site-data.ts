import source from '../content/paginas/configuracion.md?raw';
import { tableRows } from '../utils/markdown-data';

export const navigation = tableRows(source, 'Navegación')
  .filter(([label, path]) => label && path)
  .map(([label, path]) => [label, path] as const);
