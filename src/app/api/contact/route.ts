import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
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

    // Basic Validation
    if (!name || !email || !message) {
      return Response.json(
        { error: "الاسم والبريد الإلكتروني والرسالة حقول مطلوبة" },
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
      });
    }

    const resend = new Resend(apiKey);

    const emailHtml = `
      <div dir="rtl" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f8fafc; border-radius: 16px; padding: 28px; border: 1px solid #1e293b;">
        <div style="text-align: center; margin-bottom: 24px;">
          <h2 style="color: #38bdf8; margin: 0 0 6px 0; font-size: 22px;">طلب تواصل ومشروع جديد 🚀</h2>
          <p style="color: #94a3b8; font-size: 13px; margin: 0;">تم استلام طلب جديد عبر نموذج التواصل في البورتفوليو</p>
        </div>

        <div style="background: #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 16px;">
          <h3 style="color: #f1f5f9; font-size: 15px; margin-top: 0; border-bottom: 1px solid #334155; padding-bottom: 8px;">معلومات العميل</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #38bdf8;">الاسم:</strong> ${name}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #38bdf8;">البريد الإلكتروني:</strong> <a href="mailto:${email}" style="color: #93c5fd;">${email}</a></p>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #38bdf8;">الهاتف / واتساب:</strong> ${phone || "غير محدد"}</p>
        </div>

        <div style="background: #1e293b; border-radius: 12px; padding: 18px; margin-bottom: 16px;">
          <h3 style="color: #f1f5f9; font-size: 15px; margin-top: 0; border-bottom: 1px solid #334155; padding-bottom: 8px;">تفاصيل ونوع المشروع</h3>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #38bdf8;">نوع الخدمة المطلوبة:</strong> ${serviceType || "طلب مخصص"}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #38bdf8;">الميزانية التقديرية:</strong> ${budget || "مرنة / للمناقشة"}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #38bdf8;">الإطار الزمني:</strong> ${timeline || "مرن"}</p>
          <p style="margin: 6px 0; font-size: 14px;"><strong style="color: #38bdf8;">الموضوع:</strong> ${subject || "طلب تواصل"}</p>
        </div>

        <div style="background: #1e293b; border-radius: 12px; padding: 18px;">
          <h3 style="color: #f1f5f9; font-size: 15px; margin-top: 0; border-bottom: 1px solid #334155; padding-bottom: 8px;">تفاصيل الرسالة</h3>
          <p style="margin: 8px 0; font-size: 14px; line-height: 1.6; color: #cbd5e1; white-space: pre-wrap;">${message}</p>
        </div>

        <div style="margin-top: 24px; text-align: center; color: #64748b; font-size: 11px;">
          مرسل تلقائيًا عبر موقع مصطفى أحمد الشخصي
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Mustafa Portfolio <onboarding@resend.dev>",
      to: "mustafa.ahmad.work@gmail.com",
      replyTo: email,
      subject: `🚀 [طلب مشروع] ${serviceType || "مشروع جديد"} - من ${name}`,
      html: emailHtml,
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return Response.json(
        { error: "حدث خطأ أثناء إرسال البريد عبر Resend", details: error },
        { status: 500 }
      );
    }

    return Response.json({ success: true, data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "خطأ غير متوقع في السيرفر";
    console.error("API error in contact route:", err);
    return Response.json({ error: message }, { status: 500 });
  }
}
