import { ArrowDown, ArrowRight, Check, CircleHelp, ShieldCheck, ShoppingBasket, Users, WalletCards } from 'lucide-react';
import { AreaBrowser } from './area-browser';
import { getLagosAreas } from '../lib/server/areas';
import { getPublishedOffers } from '../lib/server/offers';
import { OfferBoard } from './offer-board';

export const dynamic = 'force-dynamic';

const steps = [
  { number: '01', icon: <Users size={20} />, title: 'Neighbours make a group', text: 'People nearby come together around the same everyday needs.' },
  { number: '02', icon: <ShoppingBasket size={20} />, title: 'Suppliers confirm an offer', text: 'The seller, exact goods, final price and pickup details are made clear first.' },
  { number: '03', icon: <WalletCards size={20} />, title: 'You decide what’s right', text: 'Review the confirmed details before choosing whether to buy. There is no checkout here yet.' },
];

export default async function Home() {
  const [{ areas }, offers] = await Promise.all([getLagosAreas(), getPublishedOffers()]);

  return (
    <main>
      <div className="preview-banner"><span className="preview-dot" /> Early preview <span className="banner-divider">·</span> CoopCart is preparing a Lagos launch. Signups and checkout are not available in this preview.</div>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="CoopCart home"><span className="brand-mark"><ShoppingBasket size={19} /></span><span>coop<span className="brand-accent">cart</span></span></a>
        <nav className="main-nav" aria-label="Main navigation"><a href="#areas">Explore areas</a><a href="#how-it-works">How it works</a><a href="#about">About</a></nav>
        <a className="header-cta" href="#areas">Find your area <ArrowRight size={15} /></a>
      </header>

      <section className="hero" id="top">
        <div className="hero-content">
          <p className="eyebrow"><span className="eyebrow-mark">✳</span> GOOD THINGS, TOGETHER</p>
          <h1>Big buys.<br /><span>Neighbourhood</span><br />power.</h1>
          <p className="hero-description">We’re building a simpler way for Lagos neighbours to come together, compare a real offer and buy everyday essentials as a group.</p>
          <a className="primary-button" href="#areas">Check your area <ArrowDown size={16} /></a>
          <div className="hero-reassurance"><ShieldCheck size={16} /><span>No payment, personal details or commitment in this preview.</span></div>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="art-sun" />
          <div className="orbit orbit-one" /><div className="orbit orbit-two" />
          <div className="basket-illustration"><div className="basket-goods"><span className="goods goods-one">◉</span><span className="goods goods-two">✳</span><span className="goods goods-three">◒</span><span className="goods goods-four">✿</span></div><div className="basket-handle"/><div className="basket-body"><span className="basket-weave"/></div><div className="basket-base"/></div>
          <div className="art-note note-left"><span className="note-icon note-green"><Users size={15}/></span><span><b>People power</b><small>Right around you</small></span></div>
          <div className="art-note note-right"><span className="note-icon note-amber"><Check size={15}/></span><span><b>Clear offers</b><small>Before you decide</small></span></div>
          <span className="art-flower flower-one">✳</span><span className="art-flower flower-two">✳</span><span className="art-label">A BETTER WAY TO BUY</span>
        </div>
      </section>

      <div className="principles" id="about">
        <div className="principle"><span className="principle-icon"><Users size={18}/></span><span><b>Local first</b><small>Built around real neighbourhoods</small></span></div>
        <div className="principle"><span className="principle-icon"><ShieldCheck size={18}/></span><span><b>Clarity matters</b><small>Know who sells and what it costs</small></span></div>
        <div className="principle"><span className="principle-icon"><CircleHelp size={18}/></span><span><b>Still getting ready</b><small>We’ll be honest about what’s live</small></span></div>
      </div>

      <AreaBrowser areas={areas} />
      <OfferBoard offers={offers} areas={areas} />

      <section className="how-section" id="how-it-works">
        <div className="how-intro"><p className="eyebrow">A SIMPLE IDEA</p><h2>Good buying<br />is better <em>shared.</em></h2><p>Here’s the idea we’re working toward. We’ll open an area only when the local details are ready.</p></div>
        <div className="steps">{steps.map((step) => <article className="step-card" key={step.number}><span className="step-number">{step.number}</span><span className="step-icon">{step.icon}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="honesty-panel"><span className="honesty-icon"><ShieldCheck size={22}/></span><div><p className="eyebrow">OUR FIRST PROMISE</p><h2>Clear before checkout.</h2><p>CoopCart is not taking orders or payments in this preview. When offers are available, we’ll identify the seller, list the exact goods and show the final price and fulfilment details before you make a decision.</p></div><a href="#areas">See area status <ArrowRight size={15}/></a></section>

      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><ShoppingBasket size={18} /></span><span>coop<span className="brand-accent">cart</span></span></a><p>Good things are better shared.</p><div className="footer-right"><span>Working title · Lagos, Nigeria</span><a href="#about">About this preview</a></div><small>© {new Date().getFullYear()} CoopCart. This early preview is informational only.</small></footer>
    </main>
  );
}
