import { Link } from 'react-router-dom';
import { useLocale, localePath } from '../locale-context';
import { BETA_DOC_URL, LEGAL_DOCS, SOCIAL_LINKS, CONTACT_EMAIL, LEGAL_FINALIZED } from '../config/site';

export function SiteFooter() {
  const { locale, t } = useLocale();

  return (
    <footer className="site-footer">
      <img className="footer-wing" src="/website/brand/wing-deco.png" alt="" width={28} height={24} />
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-col">
            <h2>{t.footer.product}</h2>
            <ul>
              <li>
                <Link to={`${localePath(locale)}#video`}>{t.footer.productLinks.demo}</Link>
              </li>
              <li>
                <a href={BETA_DOC_URL} target="_blank" rel="noreferrer noopener">
                  {t.footer.productLinks.guide}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>{t.footer.creators}</h2>
            <ul>
              <li>
                <Link to={localePath(locale, 'creators')}>{t.footer.creatorLinks.partner}</Link>
              </li>
              <li>
                <a href={LEGAL_DOCS.terms} target="_blank" rel="noreferrer noopener">
                  {t.footer.creatorLinks.rights}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>{t.footer.community}</h2>
            <ul>
              <li>
                <Link to={localePath(locale, 'feedback')}>{t.footer.communityLinks.feedback}</Link>
              </li>
              <li>
                <Link to={localePath(locale, 'doodle')}>{t.footer.communityLinks.doodle}</Link>
              </li>
              <li>
                <Link to={localePath(locale, 'journal')}>{t.footer.communityLinks.journal}</Link>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>{t.footer.legal}</h2>
            <ul>
              <li>
                <a href={LEGAL_DOCS.terms} target="_blank" rel="noreferrer noopener">
                  {t.footer.legalLinks.terms}
                </a>
              </li>
              <li>
                <a href={LEGAL_DOCS.privacy} target="_blank" rel="noreferrer noopener">
                  {t.footer.legalLinks.privacy}
                </a>
              </li>
              <li>
                <a href={LEGAL_DOCS.ai} target="_blank" rel="noreferrer noopener">
                  {t.footer.legalLinks.ai}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h2>{t.footer.social}</h2>
            <ul>
              {SOCIAL_LINKS.map((social) => (
                <li key={social.id}>
                  <a href={social.href} target="_blank" rel="noreferrer noopener">
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${CONTACT_EMAIL}`}>{t.footer.contact}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span className="footer-scribble">To recreate life out of live</span>
          <span>© {new Date().getFullYear()} {t.footer.rights}</span>
        </div>
        {!LEGAL_FINALIZED && (
          <p style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-faint)' }}>{t.footer.draftNotice}</p>
        )}
      </div>
    </footer>
  );
}
