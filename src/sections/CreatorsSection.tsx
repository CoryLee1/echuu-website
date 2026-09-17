import { Link } from 'react-router-dom';
import { useLocale, localePath } from '../locale-context';
import { Reveal } from '../components/Reveal';
import { LEGAL_DOCS } from '../config/site';

/**
 * S07 创作者。人类画手支持宣言醒目；
 * 不用 AI 生成角色图充当画师作品，未取得授权作品时显示待取得。
 */
export function CreatorsSection() {
  const { locale, t } = useLocale();

  return (
    <section className="section" id="creators" aria-labelledby="creators-title">
      <div className="shell">
        <div className="creators-block">
          <Reveal>
            <h2 className="section__title" id="creators-title">
              {t.creators.title}
            </h2>
            <p className="creators-manifesto" style={{ marginTop: 16 }}>
              {t.creators.manifesto}
            </p>
            <p className="section__lede">{t.creators.body}</p>
            <p style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link className="btn btn--primary" to={localePath(locale, 'creators')}>
                {t.creators.cta}
              </Link>
              <a className="btn btn--ghost" href={LEGAL_DOCS.terms} target="_blank" rel="noreferrer noopener">
                {t.creators.secondary}
              </a>
            </p>
          </Reveal>

          <Reveal className="creators-art">
            <img src="/website/brand/angel-deco.png" alt="" width={35} height={34} />
            <span className="tag tag--pending">{t.common.pendingMaterial}</span>
            <p>{t.common.materialNote}</p>
          </Reveal>
        </div>

        <Reveal>
          <h3 className="visually-hidden">{t.creators.intentsTitle}</h3>
          <div className="intents">
            {t.creators.intents.map((intent) => (
              <div className="intent-card" key={intent.title}>
                <h3>{intent.title}</h3>
                <p>{intent.body}</p>
              </div>
            ))}
          </div>
          <p className="section__foot">{t.creators.disclaimer}</p>
        </Reveal>
      </div>
    </section>
  );
}
