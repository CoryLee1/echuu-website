import { useLocale } from '../locale-context';
import { getBetaCta } from '../lib/cta';

/**
 * S01 初见。文字初始即可见；背景与装饰轻显现，只执行一次。
 * 视觉顺序：品牌 tagline → 品类说明 → 一句用途 → CTA。
 */
export function Hero() {
  const { t } = useLocale();
  const cta = getBetaCta(t.apply.emailSubject, t.apply.emailBody);
  const [line1, line2] = t.hero.taglineLineBreak.split(' / ');

  return (
    <section className="hero sky-field" aria-labelledby="hero-title">
      <img className="hero__sky" src="/website/brand/sky-blob.png" alt="" width={1000} height={1000} />
      <img className="hero__glow" src="/website/brand/sky-glow.png" alt="" width={520} height={520} />
      <div className="hero__rings" aria-hidden="true">
        <img className="hero__ring hero__ring--a" src="/website/brand/ring-center-a.svg" alt="" />
        <img className="hero__ring hero__ring--b" src="/website/brand/ring-left.svg" alt="" />
        <img className="hero__ring hero__ring--c" src="/website/brand/ring-right.svg" alt="" />
      </div>
      <img className="hero__wing" src="/website/brand/angel-deco.png" alt="" width={35} height={34} />

      <div className="hero__inner">
        <div className="hero__body">
          {/* 完整品牌 tagline 是首屏主要视觉文字，不改写、不翻译替代 */}
          <h1 className="hero__tagline" id="hero-title" lang="en">
            <span>{line1}</span>
            <span>{line2}</span>
          </h1>

          <p className="hero__category">{t.hero.category}</p>
          <p className="hero__lede">{t.hero.lede}</p>

          <div className="hero__actions">
            <a
              className="btn btn--primary"
              href={cta.mode === 'email' ? cta.href : '#apply'}
            >
              {cta.mode === 'email' ? t.hero.ctaPrimaryEmail : t.hero.ctaPrimary}
            </a>
            <a className="btn btn--ghost" href="#video">
              {t.hero.ctaSecondary}
            </a>
          </div>

          <p className="hero__status">{t.hero.status}</p>
        </div>
      </div>
    </section>
  );
}
