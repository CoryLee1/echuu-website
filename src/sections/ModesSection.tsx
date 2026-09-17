import { useLocale } from '../locale-context';
import { Reveal } from '../components/Reveal';

/**
 * S05 未来模式。观影回与歌回是「制作中」，不提供假的立即体验；
 * 制作中卡片只滚动到内测联系区。
 */
export function ModesSection() {
  const { t } = useLocale();

  return (
    <section className="section sky-field" id="modes" aria-labelledby="modes-title">
      <div className="shell">
        <Reveal className="section__head">
          <h2 className="section__title" id="modes-title">
            {t.modes.title}
          </h2>
        </Reveal>

        <div className="mode-grid">
          {t.modes.items.map((mode, index) => {
            const isDev = mode.status === 'dev';
            return (
              <Reveal
                key={mode.name}
                className={`mode-card ${isDev ? 'mode-card--dev' : ''}`}
                delay={index * 60}
              >
                <div className="mode-card__poster">
                  <img src="/website/brand/wing-mark.svg" alt="" width={46} height={46} />
                </div>
                <p>
                  <span className={`tag ${isDev ? 'tag--dev' : 'tag--beta'}`}>
                    {isDev ? t.modes.statusDev : t.modes.statusBeta}
                  </span>
                </p>
                <h3 className="mode-card__name">{mode.name}</h3>
                <p className="mode-card__body">{mode.body}</p>
                {isDev && (
                  <p>
                    <a className="btn btn--quiet btn--small" href="#apply">
                      {t.modes.toApply}
                    </a>
                  </p>
                )}
              </Reveal>
            );
          })}
        </div>

        <p className="section__foot">{t.modes.footnote}</p>
      </div>
    </section>
  );
}
