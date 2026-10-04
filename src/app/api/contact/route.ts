import { Resend } from "resend";
import type { ContactApiPayload, ContactApiResponse } from "@/types";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request): Promise<Response> {
  try {
    const body: ContactApiPayload = await request.json();
    const {
      name,
      email,
      phone,
      serviceType,
      budget,
      timeline,
      subject,
      message,
    } = body;

    // Validation
    if (!name || !name.trim()) {
      return Response.json(
        { error: "الاسم مطلوب / Name is required" } satisfies ContactApiResponse,
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return Response.json(
        { error: "البريد الإلكتروني مطلوب / Email is required" } satisfies ContactApiResponse,
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return Response.json(
        { error: "صيغة البريد الإلكتروني غير صحيحة / Invalid email address" } satisfies ContactApiResponse,
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return Response.json(
        { error: "الرسالة مطلوبة / Message is required" } satisfies ContactApiResponse,
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn(
        "⚠️ [Resend] RESEND_API_KEY is not defined in environment variables. Simulated submission:",
        body
      );
      return Response.json({
        success: true,
        simulated: true,
        message: "تم استلام الطلب بنجاح (وضع المعاينة - يرجى إضافة RESEND_API_KEY في .env.local لتفعيل الإرسال الفعلي)",
      } satisfies ContactApiResponse);
    }

    const resend = new Resend(apiKey);
    const toEmail = process.env.RESEND_TO_EMAIL || "mustafa.ahmad.work@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Mustafa Portfolio <onboarding@resend.dev>";

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safePhone = escapeHtml((phone || "").trim() || "غير محدد");
    const safeService = escapeHtml((serviceType || "").trim() || "طلب مخصص");
    const safeBudget = escapeHtml((budget || "").trim() || "مرنة / للمناقشة");
    const safeTimeline = escapeHtml((timeline || "").trim() || "مرن");
    const safeSubject = escapeHtml((subject || "").trim() || "طلب تواصل ومشروع جديد");
    const safeMessage = escapeHtml(message.trim()).replace(/\n/g, "<br/>");

    const emailHtml = `
      <div dir="rtl" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 16px; padding: 28px; border: 1px solid #1e293b;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #6366f1; margin: 0 0 6px 0; font-size: 22px;"> طلب تواصل ومشروع جديد</h2>
          <p style="color: #94a3b8; font-size: 13px; margin: 0;">تم استلام طلب جديد عبر نموذج التواصل في البورتفوليو</p>
        </div>

        <div style="background: #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 16px;">
          <h3 style="color: #f1f5f9; font-size: 15px; margin-top: 0; border-bottom: 1px solid #334155; padding-bottom: 8px;">معلومات العميل</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #818cf8;">الاسم:</strong> ${safeName}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #818cf8;">البريد الإلكتروني:</strong> <a href="mailto:${safeEmail}" style="color: #93c5fd;">${safeEmail}</a></p>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #818cf8;">الهاتف / واتساب:</strong> ${safePhone}</p>
        </div>

        <div style="background: #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 16px;">
          <h3 style="color: #f1f5f9; font-size: 15px; margin-top: 0; border-bottom: 1px solid #334155; padding-bottom: 8px;">تفاصيل المشروع</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #818cf8;">نوع الخدمة المطلوبة:</strong> ${safeService}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #818cf8;">الميزانية التقديرية:</strong> ${safeBudget}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #818cf8;">الإطار الزمني:</strong> ${safeTimeline}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #818cf8;">الموضوع:</strong> ${safeSubject}</p>
        </div>

        <div style="background: #1e293b; border-radius: 12px; padding: 18px;">
          <h3 style="color: #f1f5f9; font-size: 15px; margin-top: 0; border-bottom: 1px solid #334155; padding-bottom: 8px;">تفاصيل الرسالة</h3>
          <p style="margin: 8px 0; font-size: 14px; line-height: 1.6; color: #cbd5e1;">${safeMessage}</p>
        </div>

        <div style="margin-top: 24px; text-align: center; color: #64748b; font-size: 11px;">
          مرسل تلقائيًا عبر موقع مصطفى أحمد الشخصي
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      replyTo: email.trim(),
      subject: ` [طلب مشروع] ${safeService} - من ${safeName}`,
      html: emailHtml,
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json(
        { error: "حدث خطأ أثناء إرسال البريد عبر Resend", details: error } satisfies ContactApiResponse,
        { status: 500 }
      );
    }

    return Response.json({ success: true, data } satisfies ContactApiResponse);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "خطأ غير متوقع في السيرفر";
    console.error("API error in contact route:", err);
    return Response.json({ error: message } satisfies ContactApiResponse, { status: 500 });
  }
}
