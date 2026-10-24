import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { title, excerpt, slug } = await request.json();

    // 1. Fetch all subscriber emails from Supabase
    const { data: subscribers, error } = await supabase
      .from('subscribers')
      .select('email');

    if (error || !subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: 'Article published, but no subscribers to email.' }, { status: 200 });
    }

    const emailList = subscribers.map((sub) => sub.email);

    // 2. Send email blast using Resend
    await resend.emails.send({
      from: 'Bengals Origins <onboarding@resend.dev>',
      to: emailList,
      subject: `New Breakdown: ${title}`,
      html: `
        <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 20px;">
          <span style="color: #FB4F14; font-weight: bold; font-size: 12px; text-transform: uppercase;">New Game Analysis</span>
          <h2 style="color: #0f172a; margin-top: 5px;">${title}</h2>
          <p style="font-size: 15px; color: #475569; line-height: 1.5;">${excerpt}</p>
          <a href="http://localhost:3000/posts/${slug}" style="display: inline-block; background-color: #FB4F14; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; margin-top: 15px;">Read Full Breakdown →</a>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
          <p style="font-size: 12px; color: #94a3b8;">You are receiving this because you subscribed to Bengals Origins.</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Broadcast sent successfully!' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}