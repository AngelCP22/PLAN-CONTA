/**
 * Fuente única de verdad para los datos de contacto y la marca de M&R Asociados.
 *
 * Antes el número de WhatsApp y el mensaje base estaban repetidos (hardcodeados)
 * en Header.astro, BaseLayout.astro e index.astro. Centralizarlos aquí evita
 * desincronizaciones: para cambiar el teléfono o el copy se edita un solo lugar.
 */
export const site = {
  nombre: "M&R Asociados",
  descripcion:
    "M&R Asociados brinda gestión contable, tributaria, laboral, drawback y contabilidad para exportadores en Perú.",
  /** Número para mostrar al usuario (formato legible). */
  telefonoDisplay: "+51 956-308-249",
  /** Valor para enlaces tel: (sin espacios ni guiones). */
  telefonoTel: "+51956308249",
  /** Número para enlaces wa.me (sin '+'). */
  whatsapp: "51956308249",
  ciudad: "Lima, Perú",
  /** Línea inicial del mensaje que se precarga en WhatsApp desde el formulario. */
  mensajeBase: "Hola M&R Asociados, quiero información.",
  /** Texto por defecto de los botones "Solicitar asesoría". */
  mensajeAsesoria: "Hola M&R Asociados, quiero solicitar una asesoría.",
} as const;

/**
 * Construye un enlace wa.me con el texto correctamente codificado una sola vez.
 * Usar SIEMPRE esta función en lugar de concatenar la URL a mano.
 */
export function waLink(texto: string = site.mensajeAsesoria): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(texto)}`;
}
