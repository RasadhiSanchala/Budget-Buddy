import React from 'react';
import { BarChart3, ShieldCheck, Sparkles, WalletCards } from 'lucide-react';
import bg1 from '../../assets/images/bg1.jpg';

const AuthRightSection = () => {
  return (
    <section className="relative hidden min-h-screen flex-1 overflow-hidden bg-[#171335] lg:flex lg:items-center lg:justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.10] mix-blend-screen"
        style={{ backgroundImage: `url(${bg1})` }}
      />

      <div className="absolute -left-20 top-16 h-72 w-72 rounded-full bg-[#765EF1]/25 blur-3xl" />
      <div className="absolute -bottom-24 right-8 h-96 w-96 rounded-full bg-[#F4C95D]/15 blur-3xl" />
      <div className="absolute right-[18%] top-[12%] h-32 w-32 rounded-full border border-white/10" />
      <div className="absolute right-[23%] top-[17%] h-16 w-16 rounded-full border border-white/10" />

      <div className="relative z-10 mx-auto w-full max-w-[720px] px-10 py-14 xl:px-14">
        <div className="mb-9 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-xs font-semibold tracking-[0.16em] text-[#F4C95D] uppercase">
          <Sparkles size={15} />
          Personal finance, simplified
        </div>

        <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-[-0.04em] text-white xl:text-6xl">
          Make every rupee
          <span className="block bg-gradient-to-r from-[#F4C95D] via-[#FFE59A] to-[#8F7AF6] bg-clip-text text-transparent">
            work with purpose.
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 xl:text-lg">
          Budget Buddy gives you a clear, modern view of income, spending and balance so you can make smarter financial decisions with confidence.
        </p>

        <div className="mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#765EF1]/20 text-[#B8AAF9]">
              <BarChart3 size={20} />
            </div>
            <p className="text-sm font-semibold text-white">Clear insights</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">See your financial story at a glance.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#F4C95D]/15 text-[#F4C95D]">
              <WalletCards size={20} />
            </div>
            <p className="text-sm font-semibold text-white">Simple tracking</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Record income and expenses in seconds.</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.07] p-4 backdrop-blur">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400/15 text-emerald-300">
              <ShieldCheck size={20} />
            </div>
            <p className="text-sm font-semibold text-white">Secure by design</p>
            <p className="mt-1 text-xs leading-5 text-slate-400">Your account stays private and protected.</p>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-4 border-t border-white/10 pt-6 text-xs text-slate-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.8)]" />
          Secure access · Clean analytics · Simple money management
        </div>
      </div>
    </section>
  );
};

export default AuthRightSection;
