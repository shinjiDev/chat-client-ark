/**
 * Genera un GUID (UUID v4)
 * @returns Un string GUID en formato UUID v4
 */
export function generateGuid(): string {
  // Usar crypto.randomUUID() si está disponible (navegadores modernos)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Implementación alternativa para compatibilidad
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

