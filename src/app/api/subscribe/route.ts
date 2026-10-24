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
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }

    // 1. Insert subscriber into Supabase
    const { error } = await supabase
      .from('subscribers')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ message: 'Already subscribed!' }, { status: 200 });
      }
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // 2. Send a confirmation / welcome email via Resend
    await resend.emails.send({
      from: 'Bengals Origins <onboarding@resend.dev>', // Change to your verified domain later
      to: [email],
      subject: 'Welcome to Bengals Origins — The Blueprint',
      html: `
        <div style="font-family: sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #FB4F14;">You're on the list!</h2>
          <p>Thanks for subscribing to Bengals Origins. You will now receive unfiltered tactical breakdowns and game analysis directly in your inbox the moment they drop.</p>
          <p style="margin-top: 30px; font-size: 12px; color: #64748b;">Bengals Origins • Independent Film Study</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: 'Subscribed successfully!' }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}