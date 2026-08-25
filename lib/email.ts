import { Resend } from "resend";
import { isDemoMode } from "@/lib/demo";

// ------------------------------------------------------------------
// Cliente Resend (lazy)
// ------------------------------------------------------------------
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

// ------------------------------------------------------------------
// Config
// ------------------------------------------------------------------
const EMAIL_FROM = process.env.EMAIL_FROM || "Toyota Formosa <no-reply@toyotaformosa.com.ar>";
const EMAIL_TO = process.env.EMAIL_TO || process.env.EMAIL_FROM || "";

type SendEmailParams = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export type EmailResult =
  | { success: true; id?: string; mocked?: boolean }
  | { success: false; error: string };

// ------------------------------------------------------------------
// Envío base — respeta DEMO_MODE
// ------------------------------------------------------------------
export async function sendEmail(params: SendEmailParams): Promise<EmailResult> {
  const { to, subject, html, text, replyTo } = params;
  const recipients = Array.isArray(to) ? to : [to];

  if (isDemoMode) {
    console.log("[email:demo] — no se envía (DEMO_MODE=true)");
    console.log(`  To: ${recipients.join(", ")}`);
    console.log(`  Subject: ${subject}`);
    console.log(`  Reply-To: ${replyTo ?? "—"}`);
    return { success: true, mocked: true };
  }

  const resend = getResend();
  if (!resend) {
    const msg = "RESEND_API_KEY no configurado";
    console.warn(`[email] ${msg} — logueando en lugar de enviar`);
    console.log(`  To: ${recipients.join(", ")} | Subject: ${subject}`);
    return { success: false, error: msg };
  }

  if (!EMAIL_FROM) {
    return { success: false, error: "EMAIL_FROM no configurado" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: recipients,
      subject,
      html,
      text,
      replyTo: replyTo ? [replyTo] : undefined,
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return { success: false, error: error.message ?? String(error) };
    }

    return { success: true, id: data?.id };
  } catch (e) {
    const msg = (e as Error).message;
    console.error("[email] exception:", msg);
    return { success: false, error: msg };
  }
}

// ------------------------------------------------------------------
// Helpers de notificación por lead
// ------------------------------------------------------------------
export type LeadEmailData = {
  name: string;
  lastname?: string | null;
  email?: string | null;
  phone?: string | null;
  city?: string | null;
  message?: string | null;
  source?: string | null;
  type?: string | null;
  vehicle?: string | null;
};

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function leadHtml(data: LeadEmailData, title: string): string {
  const rows: Array<[string, string | null | undefined]> = [
    ["Nombre", [data.name, data.lastname].filter(Boolean).join(" ")],
    ["Email", data.email],
    ["Teléfono", data.phone],
    ["Ciudad", data.city],
    ["Vehículo de interés", data.vehicle],
    ["Origen", data.source],
    ["Tipo", data.type],
  ];

  const rowsHtml = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;color:#71717a;font-size:13px;border-bottom:1px solid #f4f4f5;">${escapeHtml(k)}</td><td style="padding:8px 12px;color:#18181b;font-size:13px;border-bottom:1px solid #f4f4f5;font-weight:500;">${escapeHtml(String(v))}</td></tr>`,
    )
    .join("");

  const messageHtml = data.message
    ? `<div style="margin-top:16px;padding:16px;background:#fafafa;border:1px solid #e4e4e7;border-radius:12px;"><p style="margin:0 0 6px;color:#71717a;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Mensaje</p><p style="margin:0;color:#18181b;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(data.message)}</p></div>`
    : "";

  return `
  <div style="font-family:'Nunito',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#fafafa;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;">
      <div style="height:4px;background:#e4002b;"></div>
      <div style="padding:24px 24px 8px;">
        <p style="margin:0;color:#e4002b;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Toyota Formosa</p>
        <h1 style="margin:8px 0 0;color:#18181b;font-size:20px;font-weight:700;line-height:1.25;">${escapeHtml(title)}</h1>
        <p style="margin:8px 0 0;color:#71717a;font-size:13px;line-height:1.5;">Tenés un nuevo contacto para gestionar en el panel.</p>
      </div>
      <div style="padding:8px 16px 16px;">
        <table style="width:100%;border-collapse:collapse;background:#ffffff;border:1px solid #f4f4f5;border-radius:12px;overflow:hidden;">${rowsHtml}</table>
        ${messageHtml}
        <div style="margin-top:20px;text-align:center;">
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/leads" style="display:inline-block;padding:10px 20px;background:#e4002b;color:#ffffff;text-decoration:none;border-radius:9999px;font-size:13px;font-weight:700;letter-spacing:0.02em;">Ver en el panel</a>
        </div>
        <p style="margin:16px 0 0;color:#a1a1aa;font-size:11px;text-align:center;">Este email fue generado automáticamente. Respondé al contacto usando el Reply-To.</p>
      </div>
    </div>
  </div>`;
}

function leadText(data: LeadEmailData, title: string): string {
  const lines = [
    title,
    "",
    `Nombre: ${[data.name, data.lastname].filter(Boolean).join(" ")}`,
    data.email ? `Email: ${data.email}` : null,
    data.phone ? `Teléfono: ${data.phone}` : null,
    data.city ? `Ciudad: ${data.city}` : null,
    data.vehicle ? `Vehículo: ${data.vehicle}` : null,
    data.message ? `\nMensaje:\n${data.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");
  return lines;
}

// ------------------------------------------------------------------
// API pública por tipo de lead
// ------------------------------------------------------------------
export async function sendLeadNotification(
  data: LeadEmailData,
  opts?: { to?: string | string[] },
): Promise<EmailResult> {
  const to = opts?.to || EMAIL_TO;
  if (!to) {
    console.warn("[email] EMAIL_TO no configurado — no se envía notificación");
    return { success: false, error: "EMAIL_TO no configurado" };
  }

  const t = (data.type || "").toUpperCase();
  const typeLabel =
    t === "QUOTE" || t === "COTIZACION"
      ? "Nueva cotización"
      : t === "TEST_DRIVE" || t === "TESTDRIVE"
        ? "Nueva solicitud de Test Drive"
        : t === "USED_VALUATION" || t === "TRADEIN" || t === "TASACION"
          ? "Nueva tasación de usado"
          : t === "CONTACT" || t === "CONTACTO"
            ? "Nuevo contacto"
            : t === "SERVICE"
              ? "Nueva consulta de servicio"
              : "Nuevo lead";

  const subject = `${typeLabel} — ${[data.name, data.lastname].filter(Boolean).join(" ") || data.email || "sin nombre"}${data.vehicle ? ` · ${data.vehicle}` : ""}`;

  return sendEmail({
    to,
    subject,
    html: leadHtml(data, typeLabel),
    text: leadText(data, typeLabel),
    replyTo: data.email ?? undefined,
  });
}

// ------------------------------------------------------------------
// Notificación específica para TestDrive
// ------------------------------------------------------------------
export type TestDriveEmailData = {
  name: string;
  lastname?: string | null;
  email?: string | null;
  phone?: string | null;
  vehicle?: string | null;
  preferredDate?: string | null;
  preferredTime?: string | null;
  comments?: string | null;
};

export async function sendTestDriveNotification(
  data: TestDriveEmailData,
  opts?: { to?: string | string[] },
): Promise<EmailResult> {
  const to = opts?.to || EMAIL_TO;
  if (!to) return { success: false, error: "EMAIL_TO no configurado" };

  const subject = `Nueva solicitud de Test Drive — ${[data.name, data.lastname].filter(Boolean).join(" ") || data.email || "sin nombre"}${data.vehicle ? ` · ${data.vehicle}` : ""}`;

  const html = `
  <div style="font-family:'Nunito',system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;background:#fafafa;padding:24px;">
    <div style="max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e4e4e7;border-radius:16px;overflow:hidden;">
      <div style="height:4px;background:#e4002b;"></div>
      <div style="padding:24px 24px 8px;">
        <p style="margin:0;color:#e4002b;font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;">Toyota Formosa</p>
        <h1 style="margin:8px 0 0;color:#18181b;font-size:20px;font-weight:700;">Nueva solicitud de Test Drive</h1>
        <p style="margin:8px 0 0;color:#71717a;font-size:13px;">Un cliente quiere probar un vehículo.</p>
      </div>
      <div style="padding:8px 16px 16px;">
        <table style="width:100%;border-collapse:collapse;">
          ${[
            ["Nombre", [data.name, data.lastname].filter(Boolean).join(" ")],
            ["Email", data.email],
            ["Teléfono", data.phone],
            ["Vehículo", data.vehicle],
            ["Fecha preferida", data.preferredDate],
            ["Hora preferida", data.preferredTime],
          ]
            .filter(([, v]) => v)
            .map(
              ([k, v]) =>
                `<tr><td style="padding:8px 12px;color:#71717a;font-size:13px;border-bottom:1px solid #f4f4f5;">${escapeHtml(String(k))}</td><td style="padding:8px 12px;color:#18181b;font-size:13px;border-bottom:1px solid #f4f4f5;font-weight:500;">${escapeHtml(String(v))}</td></tr>`,
            )
            .join("")}
        </table>
        ${data.comments ? `<div style="margin-top:16px;padding:16px;background:#fafafa;border:1px solid #e4e4e7;border-radius:12px;"><p style="margin:0 0 6px;color:#71717a;font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Comentarios</p><p style="margin:0;color:#18181b;font-size:14px;white-space:pre-wrap;">${escapeHtml(String(data.comments))}</p></div>` : ""}
        <div style="margin-top:20px;text-align:center;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin/test-drives" style="display:inline-block;padding:10px 20px;background:#e4002b;color:#ffffff;text-decoration:none;border-radius:9999px;font-size:13px;font-weight:700;">Ver en el panel</a></div>
      </div>
    </div>
  </div>`;

  return sendEmail({
    to,
    subject,
    html,
    text: `Nueva solicitud de Test Drive\nNombre: ${[data.name, data.lastname].filter(Boolean).join(" ")}\nVehículo: ${data.vehicle || "—"}\nFecha: ${data.preferredDate || "—"} ${data.preferredTime || ""}\nComentarios: ${data.comments || "—"}`,
    replyTo: data.email ?? undefined,
  });
}

// ------------------------------------------------------------------
// Helpers para tests locales
// ------------------------------------------------------------------
export async function sendTestEmail(to: string): Promise<EmailResult> {
  return sendEmail({
    to,
    subject: "Prueba — Toyota Formosa",
    html: `<div style="font-family:system-ui;padding:24px;"><h1 style="color:#18181b;">Prueba OK</h1><p style="color:#71717a;">Si ves esto, Resend está configurado correctamente.</p></div>`,
    text: "Prueba OK — Resend configurado",
  });
}
