import { useEffect, useMemo, useState } from "react";

const typingPhrases = [
  '"hedge NVDA earnings with a 2-week strangle"',
  '"scan energy pairs with 0.9+ correlation + 30d divergence"',
  '"build a delta-neutral BTC options ladder, 4 legs"',
  '"explain today\'s top 3 factor drivers in my book"',
  '"simulate TSLA LEAP roll, target 20% OTM, 24 months"',
  '"draft risk notes for a 5% SPX put spread hedge"',
];

function useTypewriter(phrases: string[]) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(() => phrases[0]?.length ?? 0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(media.matches);
    const handler = (event: MediaQueryListEvent) => setReduceMotion(event.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      return;
    }

    const current = phrases[phraseIndex % phrases.length];
    const isComplete = !isDeleting && charIndex === current.length;
    const isEmpty = isDeleting && charIndex === 0;

    let delay = isDeleting ? 24 : 42;
    if (isComplete) {
      delay = 1200;
    } else if (isEmpty) {
      delay = 260;
    }

    const timer = window.setTimeout(() => {
      if (isComplete) {
        setIsDeleting(true);
        return;
      }

      if (isEmpty) {
        setIsDeleting(false);
        setPhraseIndex((index) => (index + 1) % phrases.length);
        return;
      }

      setCharIndex((index) => index + (isDeleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, reduceMotion, phrases]);

  const text = useMemo(() => {
    if (reduceMotion) {
      return phrases[0] ?? "";
    }
    const current = phrases[phraseIndex % phrases.length] ?? "";
    return current.slice(0, charIndex);
  }, [charIndex, phraseIndex, reduceMotion, phrases]);

  return { text, reduceMotion };
}

export default function App() {
  const { text, reduceMotion } = useTypewriter(typingPhrases);

  return (
    <div className="page">
      <div className="page-glow" aria-hidden="true" />
      <header className="nav">
        <div className="logo">
          <span className="logo-dot" aria-hidden="true" />
          <span>Chrade</span>
        </div>
        {/* <nav className="nav-links" aria-label="Primary">
          <button type="button">Platform</button>
          <button type="button">Research</button>
          <button type="button">Execution</button>
          <button type="button">Security</button>
        </nav> */}
        <div className="nav-cta">
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            rel="noopener noreferrer"
            className="btn ghost"
            style={{ textDecoration: "none" }}
          >
            Watch 60s demo
          </a>
          <a
            href="mailto:alex@nicita.cc"
            className="btn primary"
            style={{ textDecoration: "none" }}
          >
            Request access
          </a>
        </div>
      </header>

      <main className="content">
        <section className="hero-grid">
          <div className="hero-copy">
            <div className="hero-eyebrow">
              <span className="eyebrow-pill">Chrade.com</span>
              <span className="eyebrow">Chrade.com is building Cursor for Trading</span>
            </div>
            <h1>
              Research trades with{" "}
              <span className="accent accent-nowrap">editor-grade precision</span>.
            </h1>
            <p className="subhead">
              Chrade pairs real-time market intelligence, structured data,
              and strategy automation so your team moves from idea to execution
              without the busywork.
            </p>
            <div className="hero-highlights" aria-label="Highlights">
              <div className="highlight-card">
                <div className="highlight-title">Live market ingest</div>
                <p className="highlight-body">
                  Normalize ticks, options chains, and macro feeds in seconds.
                </p>
              </div>
              <div className="highlight-card">
                <div className="highlight-title">Strategy co-pilot</div>
                <p className="highlight-body">
                  Draft trade logic, risk notes, and hedges with full context.
                </p>
              </div>
              <div className="highlight-card">
                <div className="highlight-title">Execution ready</div>
                <p className="highlight-body">
                  Stage orders, simulate slippage, and export straight to OMS.
                </p>
              </div>
            </div>
            <div className="typing">
              <span className="typing-text">
                <span className="terminal-user">chrade</span>
                <span className="terminal-symbol">$</span>
                <span className="terminal-command">
                  chrade {text}
                  {!reduceMotion && <span className="typing-cursor" aria-hidden="true" />}
                </span>
              </span>
            </div>
            {/* <div className="cta-row">
              <button type="button" className="btn primary">
                Start a pilot
              </button>
              <button type="button" className="btn secondary">
                View product brief
              </button>
            </div> */}
            <div className="hero-metrics" aria-label="Who it's for">
              <div className="metric">
                <p className="metric-value">Hedge funds</p>
                <p className="metric-label">Portfolio research, risk, and execution teams.</p>
              </div>
              <div className="metric">
                <p className="metric-value">Family offices</p>
                <p className="metric-label">Lean investment ops that need institutional-grade workflows.</p>
              </div>
              <div className="metric">
                <p className="metric-value">Technical retail traders</p>
                <p className="metric-label">High-conviction research with disciplined trade planning.</p>
              </div>
            </div>
          </div>

          <div className="product-surface" aria-label="Product preview">
            <div className="surface-header">
              <span>Chrade Terminal</span>
              <div className="surface-controls">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="terminal-body">
              <div className="terminal-line terminal-prompt">
                <span className="terminal-user">chrade</span>
                <span className="terminal-symbol">$</span>
                <span className="terminal-command">
                  chrade &quot;swap btc shorts for tsla LEAPs 2 years to expiry 20% otm&quot;
                </span>
              </div>
              <div className="terminal-response">
                <div className="terminal-line terminal-prompt terminal-response-block">
                  <div className="terminal-prompt-row">
                    <span className="terminal-user">chrade</span>
                    <span className="terminal-symbol">$</span>
                    <span className="terminal-command">
                      absolutely. here is an overview chart with the strategy for position
                      adjustment
                    </span>
                  </div>
                  <span className="terminal-command terminal-ascii">
                    {`+------------------------------------------------------------+
| chrade.com :: strategy synthesis v1.0                      |
+------------------------------------------------------------+
| intent: swap btc shorts -> tsla LEAPs (20% otm, 2y)        |
| mode: live sim + explain                                   |
+------------------------------------------------------------+
| exposure map                                               |
|  btc shorts  [#####-----]  -0.63 delta                     |
|  tsla convex [----------]   0.00 delta                     |
+------------------------------------------------------------+
| decision path                                              |
|  1) unwind btc shorts (carry negative)                     |
|  2) build tsla leap ladder (jan 2028)                      |
|  3) add gamma hedge on fill                                |
+------------------------------------------------------------+
| risk capsule                                               |
|  max loss: premium only                                    |
|  target beta shift: +0.7                                   |
|  drawdown guard: 1.2%                                      |
+------------------------------------------------------------+
| execution                                                  |
|  legs: 4 | route: smart | est slippage: 14 bps             |
|  est cost: 0.42% notional | fees: 0.06% | time: 2.4s       |
|  sim p95: +2.8% | confidence: 0.81                         |
+------------------------------------------------------------+
| status: ready to stage / dry-run                           |
+------------------------------------------------------------+`}
                  </span>
                </div>
              </div>
            </div>
            <div className="surface-footer">
              <div className="surface-pill">Agentic reasoning</div>
              <div className="surface-pill">Audit trail</div>
              <div className="surface-pill">Explainable logic</div>
              <div className="surface-pill">One-click execution (enterprise tier)</div>
            </div>
          </div>
          <div className="mobile-cta" aria-label="Get access">
            <a
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              target="_blank"
              rel="noopener noreferrer"
              className="btn ghost"
              style={{ textDecoration: "none" }}
            >
              Watch 60s demo
            </a>
            <a
              href="mailto:alex@nicita.cc"
              className="btn primary"
              style={{ textDecoration: "none" }}
            >
              Request access
            </a>
          </div>
        </section>

        
      </main>

      <footer className="footer">
        <div className="footer-left">Chrade.com</div>
        <div className="footer-links">
          <button type="button">© 2026</button>
        </div>
      </footer>
    </div>
  );
}

