import { site } from "../data/site";

/**
 * Procesa los formularios marcados con [data-whatsapp-form]: valida, arma el
 * mensaje y abre WhatsApp con el texto precargado.
 *
 * Mejoras frente a la versión anterior:
 *  - Valida nombre, servicio y formato de teléfono peruano (9 dígitos, empieza en 9).
 *  - Marca aria-invalid en los campos con error y mueve el foco al primero.
 *  - Mensaje de error específico según el caso (campos vacíos vs teléfono inválido).
 *  - Codifica el mensaje UNA sola vez (sin %0A literales frágiles).
 */
export function initWhatsappForms(): void {
  document.querySelectorAll<HTMLFormElement>("[data-whatsapp-form]").forEach((form) => {
    const errorNode = form.querySelector<HTMLElement>("[data-form-error]");
    const fieldByName = (name: string) =>
      form.querySelector<HTMLInputElement | HTMLSelectElement>(`[name="${name}"]`);

    const clearErrors = () => {
      ["nombre", "telefono", "servicio"].forEach((name) =>
        fieldByName(name)?.removeAttribute("aria-invalid"),
      );
    };

    const markInvalid = (names: string[]) => {
      names.forEach((name) => fieldByName(name)?.setAttribute("aria-invalid", "true"));
      const first = names.map(fieldByName).find(Boolean);
      first?.focus();
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      clearErrors();

      const data = new FormData(form);
      const nombre = String(data.get("nombre") || "").trim();
      const servicio = String(data.get("servicio") || "").trim();
      const detalle = String(data.get("mensaje") || "").trim();
      const telefono = String(data.get("telefono") || "").replace(/\D/g, "");

      const faltantes: string[] = [];
      if (!nombre) faltantes.push("nombre");
      if (!telefono) faltantes.push("telefono");
      if (!servicio) faltantes.push("servicio");

      const telefonoInvalido = telefono.length > 0 && !/^9\d{8}$/.test(telefono);

      if (faltantes.length || telefonoInvalido) {
        const invalidos = telefonoInvalido && !faltantes.includes("telefono")
          ? [...faltantes, "telefono"]
          : faltantes;
        if (errorNode) {
          errorNode.textContent =
            telefonoInvalido && !faltantes.length
              ? "Ingresa un número de WhatsApp peruano válido: 9 dígitos que empiezan en 9."
              : "Completa tu nombre, tu WhatsApp (9 dígitos) y el servicio que necesitas.";
          errorNode.hidden = false;
        }
        markInvalid(invalidos.length ? invalidos : ["telefono"]);
        return;
      }

      if (errorNode) errorNode.hidden = true;

      const lineas = [
        site.mensajeBase,
        "",
        `Nombre: ${nombre}`,
        `WhatsApp: ${telefono}`,
        `Servicio: ${servicio}`,
      ];
      if (detalle) lineas.push(`Mensaje: ${detalle}`);

      const url = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(lineas.join("\n"))}`;
      window.open(url, "_blank", "noopener,noreferrer");

      const submit = form.querySelector<HTMLButtonElement>("button[type=submit]");
      if (submit) {
        const original = submit.textContent;
        submit.textContent = "¡Abriendo WhatsApp!";
        submit.disabled = true;
        window.setTimeout(() => {
          submit.textContent = original;
          submit.disabled = false;
        }, 2600);
      }
    });
  });
}
