'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState<'login' | 'enroll' | 'verify'>('login');
  const [totpUri, setTotpUri] = useState('');
  const [secret, setSecret] = useState('');
  const [factorId, setFactorId] = useState('');
  const [totpCode, setTotpCode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password });
    if (loginError) {
      setError(loginError.message);
      return;
    }

    const { data: factors, error: factorError } = await supabase.auth.mfa.listFactors();
    if (factorError) {
      setError(factorError.message);
      return;
    }

    const verifiedFactor = factors.totp.find((f: any) => f.status === 'verified');

    if (verifiedFactor) {
      setFactorId(verifiedFactor.id);
      const { error: challengeError } = await supabase.auth.mfa.challenge({ factorId: verifiedFactor.id });
      if (challengeError) {
        setError(challengeError.message);
        return;
      }
      setStep('verify');
    } else {
      // Use a unique name with a timestamp to completely avoid name collision errors
      const uniqueName = `Admin Authenticator ${Date.now()}`;

      const { data: enrollData, error: enrollError } = await supabase.auth.mfa.enroll({
        factorType: 'totp',
        issuer: 'BengalsOrigins',
        friendlyName: uniqueName,
      });

      if (enrollError) {
        setError(enrollError.message);
        return;
      }

      setFactorId(enrollData.id);
      setTotpUri(enrollData.totp.uri);
      setSecret(enrollData.totp.secret);
      setStep('enroll');
    }
  };

  const handleVerifyEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
    if (challengeError) {
      setError(challengeError.message);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeData.id,
      code: totpCode,
    });

    if (verifyError) {
      setError('Invalid code. Try again.');
      return;
    }

    router.push('/admin/write');
  };

  const handleVerifyLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const { data: challengeData, error: challengeError } = await supabase.auth.mfa.challenge({ factorId });
    if (challengeError) {
      setError(challengeError.message);
      return;
    }

    const { error: verifyError } = await supabase.auth.mfa.verify({
      factorId,
      challengeId: challengeData.id,
      code: totpCode,
    });

    if (verifyError) {
      setError('Invalid verification code.');
      return;
    }

    router.push('/admin/write');
  };

  return (
    <div className="max-w-md mx-auto py-16 px-4">
      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm space-y-6">
        <div>
          <span className="text-[#FB4F14] font-extrabold text-xs uppercase tracking-wider">Secure Access</span>
          <h1 className="text-2xl font-black text-slate-900 mt-1">Admin Sign In</h1>
        </div>

        {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl">{error}</div>}

        {step === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm" />
            </div>
            <button type="submit" className="w-full py-3 bg-[#FB4F14] text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-colors">Continue</button>
          </form>
        )}

        {step === 'enroll' && (
          <form onSubmit={handleVerifyEnrollment} className="space-y-4 text-center">
            <p className="text-xs text-slate-600">Scan this QR code with your authenticator app, or type the setup key manually.</p>
            
            <div className="flex justify-center p-4 bg-white border border-slate-200 rounded-xl my-2">
              {totpUri && <QRCodeSVG value={totpUri} size={160} />}
            </div>
            
            <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-200 break-all">
              <span className="font-bold text-slate-700">Setup Key:</span> {secret}
            </div>

            <input type="text" value={totpCode} onChange={(e) => setTotpCode(e.target.value)} placeholder="Enter 6-digit code" maxLength={6} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-center text-lg tracking-widest" />
            <button type="submit" className="w-full py-3 bg-[#FB4F14] text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-colors">Verify & Enter Dashboard</button>
          </form>
        )}

        {step === 'verify' && (
          <form onSubmit={handleVerifyLogin} className="space-y-4">
            <p className="text-xs text-slate-600">Open your authenticator app and enter your 6-digit verification code.</p>
            <input type="text" value={totpCode} onChange={(e) => setTotpCode(e.target.value)} placeholder="Enter 6-digit code" maxLength={6} required className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-center text-lg tracking-widest" />
            <button type="submit" className="w-full py-3 bg-[#FB4F14] text-white font-bold text-sm rounded-xl hover:bg-orange-600 transition-colors">Verify & Sign In</button>
          </form>
        )}
      </div>
    </div>
  );
}