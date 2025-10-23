export const metadata = {
    title: 'Hosting Recommender — free tool',
    description:
      'AI-powered hosting recommender quiz — get the top 3 hosting providers matched to your needs with comparison and affiliate links.',
    openGraph: {
      title: 'Hosting Recommender — brandoralab',
      description:
        'AI-powered hosting recommender quiz — get the top 3 hosting providers matched to your needs with comparison and affiliate links.',
    },
  };
  
  'use client';
  
  import React, { useMemo, useState } from 'react';
  
  // Types
  type SiteType = 'blog' | 'ecommerce' | 'portfolio' | 'saas' | 'static' | 'enterprise';
  
  type AnswerState = {
    siteType: SiteType | null;
    monthlyVisits: number | null; // e.g. monthly unique visitors
    budgetPerMonth: number | null; // USD
    technicalSkill: 'beginner' | 'intermediate' | 'advanced' | null;
    prefersManaged: boolean | null;
    cms: 'wordpress' | 'shopify' | 'nextjs' | 'static' | 'custom' | null;
    needBackups: boolean | null;
    needSsl: boolean | null;
    location: string | null;
    supportImportance: number; // 1-5
    uptimeImportance: number; // 1-5
  };
  
  // Provider model
  type Provider = {
    id: string;
    name: string;
    tagline: string;
    startingPrice: number; // USD/month
    bestFor: SiteType[];
    managed: boolean;
    features: string[];
    latencyRegions?: string[]; // regions where provider has infra
    affiliateUrl: string; // placeholder or env var
    rating?: number; // 1-5
  };
  
  // Sample dataset (replace affiliateUrl values with real affiliate links or env vars)
  const PROVIDERS: Provider[] = [
    {
      id: 'vercel',
      name: 'Vercel',
      tagline: 'Best for frontend frameworks & static sites',
      startingPrice: 0,
      bestFor: ['static', 'nextjs', 'portfolio', 'saas'],
      managed: true,
      features: ['Edge CDN', 'Serverless Functions', 'Built for Next.js', 'Automatic HTTPS'],
      latencyRegions: ['global'],
      affiliateUrl: process.env.NEXT_PUBLIC_AFF_VERCEL || '#',
      rating: 4.6,
    },
    {
      id: 'siteground',
      name: 'SiteGround',
      tagline: 'Great shared & WordPress hosting',
      startingPrice: 3.99,
      bestFor: ['blog', 'wordpress', 'portfolio'],
      managed: true,
      features: ['Managed WordPress', 'Free SSL', 'Daily Backups', 'Excellent Support'],
      latencyRegions: ['us', 'eu'],
      affiliateUrl: process.env.NEXT_PUBLIC_AFF_SITEGROUND || '#',
      rating: 4.4,
    },
    {
      id: 'bluehost',
      name: 'Bluehost',
      tagline: 'Beginner-friendly WordPress hosting',
      startingPrice: 2.95,
      bestFor: ['blog', 'wordpress', 'portfolio'],
      managed: false,
      features: ['1-click WP install', 'Free domain (1 year)', 'cPanel'],
      latencyRegions: ['us'],
      affiliateUrl: process.env.NEXT_PUBLIC_AFF_BLUEHOST || '#',
      rating: 4.0,
    },
    {
      id: 'digitalocean',
      name: 'DigitalOcean',
      tagline: 'Simple cloud for developers',
      startingPrice: 4,
      bestFor: ['saas', 'custom', 'static'],
      managed: false,
      features: ['Droplets', 'Managed DB', 'Block Storage', 'Team accounts'],
      latencyRegions: ['us', 'eu', 'asia'],
      affiliateUrl: process.env.NEXT_PUBLIC_AFF_DO || '#',
      rating: 4.2,
    },
    {
      id: 'hostinger',
      name: 'Hostinger',
      tagline: 'Low-cost shared hosting',
      startingPrice: 1.99,
      bestFor: ['blog', 'portfolio', 'static'],
      managed: false,
      features: ['Cheap plans', 'Free SSL', 'Website Builder'],
      latencyRegions: ['global'],
      affiliateUrl: process.env.NEXT_PUBLIC_AFF_HOSTINGER || '#',
      rating: 3.9,
    },
    {
      id: 'wpengine',
      name: 'WP Engine',
      tagline: 'Enterprise WordPress managed hosting',
      startingPrice: 30,
      bestFor: ['wordpress', 'enterprise'],
      managed: true,
      features: ['Managed WordPress', 'High Performance', 'Global CDN', 'Daily Backups'],
      latencyRegions: ['global'],
      affiliateUrl: process.env.NEXT_PUBLIC_AFF_WPENGINE || '#',
      rating: 4.7,
    },
    {
      id: 'cloudways',
      name: 'Cloudways',
      tagline: 'Managed cloud hosting (multi-provider)',
      startingPrice: 10,
      bestFor: ['ecommerce', 'saas', 'custom'],
      managed: true,
      features: ['Multiple cloud choices', 'Managed Stack', 'Performance Tuning'],
      latencyRegions: ['global'],
      affiliateUrl: process.env.NEXT_PUBLIC_AFF_CLOUDWAYS || '#',
      rating: 4.3,
    },
  ];
  
  // Weighted scoring algorithm
  function scoreProviders(answers: AnswerState): Array<{ provider: Provider; score: number }> {
    // Base weights
    const weights = {
      matchSiteType: 30,
      traffic: 15,
      budget: 15,
      managedPreference: 10,
      cmsFit: 10,
      backupNeed: 5,
      supportImportance: 10,
      uptimeImportance: 5,
      locationMatch: 0,
    } as const;
  
    return PROVIDERS.map((p) => {
      let score = 0;
  
      // site type match
      if (answers.siteType && p.bestFor.includes(answers.siteType)) score += weights.matchSiteType;
  
      // traffic: higher traffic favors scalable/cloud providers
      if (answers.monthlyVisits != null) {
        const visits = answers.monthlyVisits;
        if (visits < 10000) score += 7; // shared can handle
        else if (visits < 100000) score += p.managed ? 10 : 12;
        else score += p.managed ? 8 : 15; // high scale favors unmanaged cloud or specialized
        score += (weights.traffic / 15) * 0; // reserved for fine-tuning
      }
  
      // budget: prefer providers within user's budget
      if (answers.budgetPerMonth != null) {
        const b = answers.budgetPerMonth;
        if (b >= p.startingPrice) score += weights.budget;
        else {
          // if budget too low but provider is cheap, give some points
          if (p.startingPrice <= 5) score += Math.max(0, weights.budget / 2);
        }
      }
  
      // managed preference
      if (answers.prefersManaged != null) {
        if (answers.prefersManaged === p.managed) score += weights.managedPreference;
        else score += p.managed ? weights.managedPreference / 4 : weights.managedPreference / 6;
      }
  
      // cms fit
      if (answers.cms) {
        if (answers.cms === 'wordpress' && p.bestFor.includes('wordpress')) score += weights.cmsFit;
        if (answers.cms === 'nextjs' && p.id === 'vercel') score += weights.cmsFit;
        if (answers.cms === 'shopify') score += 0; // Shopify is a SaaS platform (no host)
      }
  
      // backups and support importance
      if (answers.needBackups) {
        score += p.features.includes('Daily Backups') ? 5 : 1;
      }
  
      score += (answers.supportImportance / 5) * weights.supportImportance;
      score += (answers.uptimeImportance / 5) * weights.uptimeImportance;
  
      // ratings bump
      score += (p.rating ?? 4) * 1.5;
  
      // location match: small boost if provider has infra in user's region
      if (answers.location && p.latencyRegions) {
        const loc = answers.location.toLowerCase();
        if (p.latencyRegions.some((r) => loc.includes(r))) score += 3;
      }
  
      return { provider: p, score };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  }
  
  // Simple utility components
  const ProgressBar = ({ step, total }: { step: number; total: number }) => {
    const pct = Math.round((step / total) * 100);
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 rounded-full transition-width duration-300"
          style={{ width: `${pct}%` }}
          aria-hidden
        />
      </div>
    );
  };
  
  export default function HostingRecommenderPage() {
    const TOTAL_STEPS = 6;
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<AnswerState>({
      siteType: null,
      monthlyVisits: null,
      budgetPerMonth: null,
      technicalSkill: null,
      prefersManaged: null,
      cms: null,
      needBackups: false,
      needSsl: true,
      location: null,
      supportImportance: 3,
      uptimeImportance: 4,
    });
  
    const partialUpdate = (patch: Partial<AnswerState>) =>
      setAnswers((s) => ({ ...s, ...patch }));
  
    const results = useMemo(() => scoreProviders(answers), [answers]);
    const top3 = results.slice(0, 3);
  
    // quick reset
    const reset = () => {
      setStep(1);
      setAnswers({
        siteType: null,
        monthlyVisits: null,
        budgetPerMonth: null,
        technicalSkill: null,
        prefersManaged: null,
        cms: null,
        needBackups: false,
        needSsl: true,
        location: null,
        supportImportance: 3,
        uptimeImportance: 4,
      });
    };
  
    // small helper to format price
    const price = (n: number) => `$${n.toFixed(2)}/mo`;
  
    return (
      <main className="min-h-screen bg-white text-slate-900 py-8 px-4 sm:px-8 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-semibold">Hosting Recommender</h1>
            <p className="mt-2 text-slate-600">Answer a few simple questions — we’ll match you with the top 3 hosts.</p>
          </header>
  
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Quiz */}
            <div className="lg:col-span-2 bg-slate-50 p-6 rounded-2xl shadow-sm">
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-medium">Step {step} of {TOTAL_STEPS}</h2>
                  <div className="text-sm text-slate-500">Progress</div>
                </div>
                <div className="mt-3">
                  <ProgressBar step={step} total={TOTAL_STEPS} />
                </div>
              </div>
  
              {/* Question content */}
              <div className="mt-6">
                {step === 1 && (
                  <div>
                    <h3 className="font-semibold">What type of site are you building?</h3>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {([
                        ['blog', 'Blog or personal site'],
                        ['ecommerce', 'E-commerce store'],
                        ['portfolio', 'Portfolio or landing page'],
                        ['saas', 'SaaS or web app'],
                        ['static', 'Static site / JAMstack'],
                        ['enterprise', 'Large enterprise site'],
                      ] as [SiteType, string][]).map(([k, label]) => (
                        <button
                          key={k}
                          onClick={() => { partialUpdate({ siteType: k }); setStep(2); }}
                          className={`text-left p-3 rounded-lg border ${answers.siteType === k ? 'border-sky-500 bg-white shadow' : 'border-transparent bg-slate-100'} hover:shadow-sm`}
                        >
                          <div className="font-medium">{label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
  
                {step === 2 && (
                  <div>
                    <h3 className="font-semibold">Expected monthly traffic</h3>
                    <p className="text-sm text-slate-500">Estimate of unique visitors per month</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {([
                        [500, '< 1k'],
                        [5000, '1k - 10k'],
                        [50000, '10k - 100k'],
                        [200000, '> 100k'],
                      ] as [number, string][]).map(([value, label]) => (
                        <button
                          key={value}
                          onClick={() => { partialUpdate({ monthlyVisits: value }); setStep(3); }}
                          className={`p-3 rounded-lg ${answers.monthlyVisits === value ? 'bg-white border border-sky-500 shadow' : 'bg-slate-100'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
  
                {step === 3 && (
                  <div>
                    <h3 className="font-semibold">Monthly budget (USD)</h3>
                    <p className="text-sm text-slate-500">How much are you willing to spend per month?</p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {([
                        [3, 'Budget (< $5)'],
                        [10, 'Standard ($5–$15)'],
                        [50, 'High ($15–$50)'],
                        [200, 'Premium ($50+)'],
                      ] as [number, string][]).map(([value, label]) => (
                        <button
                          key={value}
                          onClick={() => { partialUpdate({ budgetPerMonth: value }); setStep(4); }}
                          className={`p-3 rounded-lg ${answers.budgetPerMonth === value ? 'bg-white border border-sky-500 shadow' : 'bg-slate-100'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
  
                {step === 4 && (
                  <div>
                    <h3 className="font-semibold">Technical skill & preferences</h3>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {([
                        ['beginner', 'Beginner — prefer managed'],
                        ['intermediate', 'Intermediate — comfortable with some dev'],
                        ['advanced', 'Advanced — developer / ops knowledge'],
                      ] as [AnswerState['technicalSkill'], string][]).map(([k, label]) => (
                        <button
                          key={k}
                          onClick={() => { partialUpdate({ technicalSkill: k, prefersManaged: k !== 'advanced' }); setStep(5); }}
                          className={`p-3 rounded-lg ${answers.technicalSkill === k ? 'bg-white border border-sky-500 shadow' : 'bg-slate-100'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
  
                {step === 5 && (
                  <div>
                    <h3 className="font-semibold">Which platform / stack will you use?</h3>
                    <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {([
                        ['wordpress', 'WordPress'],
                        ['shopify', 'Shopify (hosted)'],
                        ['nextjs', 'Next.js / React'],
                        ['static', 'Static site (JAMstack)'],
                        ['custom', 'Custom stack (Node, Docker, etc.)'],
                      ] as [AnswerState['cms'], string][]).map(([k, label]) => (
                        <button
                          key={k}
                          onClick={() => { partialUpdate({ cms: k }); setStep(6); }}
                          className={`p-3 rounded-lg ${answers.cms === k ? 'bg-white border border-sky-500 shadow' : 'bg-slate-100'}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
  
                {step === 6 && (
                  <div>
                    <h3 className="font-semibold">Final preferences</h3>
                    <div className="mt-4 space-y-4">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={answers.needBackups}
                          onChange={(e) => partialUpdate({ needBackups: e.target.checked })}
                          className="h-4 w-4"
                        />
                        <span>Daily backups required</span>
                      </label>
  
                      <label className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">Support importance</span>
                        <input
                          type="range"
                          min={1}
                          max={5}
                          value={answers.supportImportance}
                          onChange={(e) => partialUpdate({ supportImportance: Number(e.target.value) })}
                        />
                      </label>
  
                      <label className="flex items-center gap-3">
                        <span className="text-sm text-slate-500">Uptime importance</span>
                        <input
                          type="range"
                          min={1}
                          max={5}
                          value={answers.uptimeImportance}
                          onChange={(e) => partialUpdate({ uptimeImportance: Number(e.target.value) })}
                        />
                      </label>
  
                      <label className="block">
                        <div className="text-sm text-slate-500">Your primary region or country (optional)</div>
                        <input
                          type="text"
                          value={answers.location ?? ''}
                          onChange={(e) => partialUpdate({ location: e.target.value })}
                          className="mt-2 w-full p-2 rounded border bg-white"
                          placeholder="e.g. United States, Pakistan, EU"
                        />
                      </label>
  
                      <div className="flex gap-3">
                        <button onClick={() => setStep((s) => Math.max(1, s - 1))} className="px-4 py-2 rounded-md border">Back</button>
                        <button
                          onClick={() => setStep((s) => s + 1)}
                          className="px-4 py-2 rounded-md bg-sky-600 text-white shadow hover:opacity-95"
                        >
                          See recommendation
                        </button>
                        <button onClick={reset} className="ml-auto text-sm text-slate-500">Reset</button>
                      </div>
                    </div>
                  </div>
                )}
  
                {/* Results panel (after completion) */}
                {step > TOTAL_STEPS && (
                  <div>
                    <h3 className="font-semibold">Recommendations</h3>
                    <p className="text-sm text-slate-500">Here are the top matches for your configuration.</p>
                  </div>
                )}
              </div>
            </div>
  
            {/* Right: Live preview & results */}
            <aside className="lg:col-span-1">
              <div className="sticky top-6 space-y-6">
                <div className="bg-white p-4 rounded-2xl shadow">
                  <h4 className="font-semibold">Live match preview</h4>
                  <p className="mt-2 text-sm text-slate-500">Top provider based on current answers</p>
                  <div className="mt-4">
                    {results.length > 0 ? (
                      <div className="border rounded-lg p-3 bg-slate-50">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="font-medium">{results[0].provider.name}</div>
                            <div className="text-xs text-slate-500">{results[0].provider.tagline}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold">{price(results[0].provider.startingPrice)}</div>
                            <a
                              href={results[0].provider.affiliateUrl}
                              rel="noopener noreferrer"
                              className="mt-2 inline-block text-xs underline"
                            >
                              Visit
                            </a>
                          </div>
                        </div>
                        <div className="mt-3 text-xs text-slate-600">Score: {Math.round(results[0].score)}</div>
                      </div>
                    ) : (
                      <div className="text-sm text-slate-500">Complete the quiz to see personalized picks.</div>
                    )}
                  </div>
                </div>
  
                {/* Full results when finished */}
                {step > TOTAL_STEPS && (
                  <div className="bg-white p-4 rounded-2xl shadow">
                    <h4 className="font-semibold">Top 3 picks</h4>
                    <ol className="mt-4 space-y-3">
                      {top3.map(({ provider, score }, i) => (
                        <li key={provider.id} className="p-3 bg-slate-50 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="font-medium">{i + 1}. {provider.name}</div>
                              <div className="text-xs text-slate-500">{provider.tagline}</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm">{price(provider.startingPrice)}</div>
                              <div className="text-xs text-slate-400">Score: {Math.round(score)}</div>
                            </div>
                          </div>
  
                          <div className="mt-3 flex gap-2">
                            <a
                              href={provider.affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm"
                            >
                              Get {provider.name}
                            </a>
  
                            <button
                              onClick={() => window.alert('Feature comparison shown below — scroll to the comparison table.')}
                              className="px-3 py-2 rounded-md border text-sm"
                            >
                              Compare
                            </button>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
  
                {/* CTA & SEO-friendly snippet */}
                <div className="bg-white p-4 rounded-2xl shadow text-sm text-slate-700">
                  <div className="font-medium">Why this works</div>
                  <p className="mt-2 text-xs text-slate-500">We score hosts by matching your site type, traffic, budget, technical skill and preferences to provider strengths.</p>
                </div>
              </div>
            </aside>
          </section>
  
          {/* Full comparison table */}
          <section className="mt-10">
            <h2 className="text-2xl font-semibold">Hosting comparison</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-xs uppercase text-slate-500 border-b">
                    <th className="py-3">Provider</th>
                    <th className="py-3">Best for</th>
                    <th className="py-3">Managed</th>
                    <th className="py-3">Starts</th>
                    <th className="py-3">Key features</th>
                    <th className="py-3">Rating</th>
                  </tr>
                </thead>
                <tbody className="align-top">
                  {PROVIDERS.map((p) => (
                    <tr key={p.id} className="border-b last:border-b-0">
                      <td className="py-3 font-medium">{p.name}</td>
                      <td className="py-3 text-xs text-slate-600">{p.bestFor.join(', ')}</td>
                      <td className="py-3">{p.managed ? 'Yes' : 'No'}</td>
                      <td className="py-3">{price(p.startingPrice)}</td>
                      <td className="py-3 text-xs text-slate-600">{p.features.join(' • ')}</td>
                      <td className="py-3">{p.rating ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
  
          {/* Schema.org JSON-LD for SEO */}
          <script type="application/ld+json" suppressHydrationWarning>
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'Hosting Recommender',
              description: 'AI-powered quiz that recommends the best hosting providers for your project.',
              url: 'https://brandoralab.com/free-tools/hosting-recommender',
            })}
          </script>
  
          <footer className="mt-12 text-xs text-slate-500">Note: Affiliate links may earn a commission at no extra cost to you. Replace placeholders with your affiliate links in environment variables.</footer>
        </div>
      </main>
    );
  }
  