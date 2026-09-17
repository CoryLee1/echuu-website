import { useLocale } from '../locale-context';
import { Reveal } from '../components/Reveal';
import { LEGAL_DOCS } from '../config/site';

/** S08 AI 与角色权利。三句摘要 + 完整文件链接。 */
export function TrustSection() {
  const { t } = useLocale();

  return (
    <section className="section sky-field" id="trust" aria-labelledby="trust-title">
      <div className="shell">
        <Reveal className="section__head">
          <h2 className="section__title" id="trust-title">
            {t.trust.title}
          </h2>
        </Reveal>

        <div className="trust-grid">
          {t.trust.items.map((item) => (
            <Reveal className="trust-item" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </div>

        <div className="trust-links">
          <a className="btn btn--quiet btn--small" href={LEGAL_DOCS.ai} target="_blank" rel="noreferrer noopener">
            {t.trust.links.ai}
          </a>
          <a className="btn btn--quiet btn--small" href={LEGAL_DOCS.terms} target="_blank" rel="noreferrer noopener">
            {t.trust.links.ip}
          </a>
          <a className="btn btn--quiet btn--small" href={LEGAL_DOCS.privacy} target="_blank" rel="noreferrer noopener">
            {t.trust.links.privacy}
          </a>
        </div>
      </div>
    </section>
  );
}
