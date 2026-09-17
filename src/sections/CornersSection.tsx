import { Link } from 'react-router-dom';
import { useLocale, localePath } from '../locale-context';
import { Reveal } from '../components/Reveal';

/** S10 社区小角落。两个小入口，不堆大段文案。 */
export function CornersSection() {
  const { locale, t } = useLocale();

  return (
    <section className="section section--tight" aria-label={t.footer.community}>
      <div className="shell">
        <div className="corner-grid">
          <Reveal className="corner-card">
            <h3>{t.community.feedbackTitle}</h3>
            <p>{t.community.feedbackBody}</p>
            <p>
              <Link className="btn btn--quiet btn--small" to={localePath(locale, 'feedback')}>
                {t.community.feedbackCta}
              </Link>
            </p>
          </Reveal>

          <Reveal className="corner-card">
            <h3>{t.community.doodleTitle}</h3>
            <p>{t.community.doodleBody}</p>
            <p>
              <Link className="btn btn--quiet btn--small" to={localePath(locale, 'doodle')}>
                {t.community.doodleCta}
              </Link>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
