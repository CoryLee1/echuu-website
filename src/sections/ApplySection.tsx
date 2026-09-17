import { useState } from 'react';
import { useLocale } from '../locale-context';
import { Reveal } from '../components/Reveal';
import { getBetaCta, copyText } from '../lib/cta';
import { CONTACT_EMAIL } from '../config/site';

/**
 * S09 邀请。没有已验证的报名接口时使用邮件申请，
 * 不显示假的「提交成功」，也不把 localStorage 当报名数据库。
 */
export function ApplySection() {
  const { t } = useLocale();
  const [copied, setCopied] = useState(false);
  const cta = getBetaCta(t.apply.emailSubject, t.apply.emailBody);

  return (
    <section className="section" id="apply" aria-labelledby="apply-title">
      <div className="shell">
        <Reveal className="apply-block">
          <h2 className="section__title" id="apply-title">
            {t.apply.title}
          </h2>
          <p className="section__lede">{t.apply.body}</p>

          <div className="apply-actions">
            <a className="btn btn--primary" href={cta.mode === 'email' ? cta.href : '#apply-form'}>
              {cta.mode === 'email' ? t.apply.ctaEmail : t.apply.cta}
            </a>
          </div>

          {cta.mode === 'email' && <p className="apply-note">{t.apply.mailNote}</p>}

          <p className="email-line">
            <span>{t.apply.altContact}</span>
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            <button
              type="button"
              className="btn btn--quiet btn--small"
              onClick={async () => {
                const ok = await copyText(CONTACT_EMAIL);
                if (ok) {
                  setCopied(true);
                  window.setTimeout(() => setCopied(false), 2400);
                }
              }}
            >
              {copied ? t.apply.copied : t.apply.copyEmail}
            </button>
          </p>
          <p aria-live="polite" className="visually-hidden">
            {copied ? t.apply.copied : ''}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
