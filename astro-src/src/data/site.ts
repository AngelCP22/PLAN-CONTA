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

/**
 * Chatbot de IA en vivo (ChatSimple / Expertise AI): el mismo tipo de widget que
 * usa auditeris.com. Es un servicio de TERCEROS y de pago.
 *
 * CÓMO ACTIVARLO (una sola vez):
 *  1. Crea una cuenta y un chatbot en https://www.chatsimple.ai (hoy expertise.ai).
 *  2. En el panel, en la sección de instalación/embed, copia tu "co-id" y el id del
 *     chatbot (aiChatbotId). Verifica también el src del loader (puede cambiar con
 *     el rebrand a Expertise) y pégalos abajo.
 *  3. Pon enabled: true.
 *
 * Mientras enabled sea false, NO se inyecta ningún script externo: el sitio queda
 * igual que ahora, sin enviar datos del visitante a terceros. Al activarlo, el
 * BaseLayout añade automáticamente los dominios del proveedor al Content-Security-Policy
 * y la página /privacidad ya declara el uso del chatbot.
 */
export const chat = {
  enabled: false,
  /** src del loader que entrega el panel. Verifícalo antes de activar. */
  loaderSrc: "https://cdn.chatsimple.ai/ai-loader.js",
  /** Identificador de cuenta (co-id) del panel. */
  coId: "",
  /** Identificador del chatbot (aiChatbotId) del panel. */
  chatbotId: "",
  /** Dominios que el widget necesita cargar/conectar. Ajústalos si el panel indica otros. */
  domains: ["https://*.chatsimple.ai", "https://*.expertise.ai"],
} as const;
