import { useState } from 'react';
import { useLocale } from '../locale-context';
import { Reveal } from '../components/Reveal';
import { fill } from '../i18n';
import { BETA_DOC_URL } from '../config/site';

/**
 * S03 我也能做。桌面左文右图，步骤按钮可点击，不劫持滚轮、不 pin。
 * 三张真实界面尚未取得（Notion 02-onboarding.gif 未取到），如实显示待取得。
 */
export function StepsSection() {
  const { t } = useLocale();
  const [active, setActive] = useState(0);

  return (
    <section className="section sky-field" id="steps" aria-labelledby="steps-title">
      <div className="shell">
        <Reveal className="section__head">
          <h2 className="section__title" id="steps-title">
            {t.steps.title}
          </h2>
        </Reveal>

        <div className="steps">
          <Reveal as="ol" className="steps__list">
            {t.steps.items.map((step, index) => (
              <li className="steps__item" key={step.no} data-active={index === active}>
                <button
                  type="button"
                  className="steps__button"
                  aria-pressed={index === active}
                  onClick={() => setActive(index)}
                >
                  <span className="steps__no">{step.no}</span>
                  <span className="steps__title">{step.title}</span>
                  <span className="steps__body">{step.body}</span>
                </button>
              </li>
            ))}
          </Reveal>

          <Reveal className="steps__figure">
            <div className="steps__pending">
              <span className="tag tag--pending">{fill(t.steps.stepTab, { n: active + 1 })}</span>
              <p style={{ fontWeight: 600, color: 'var(--ink)' }}>{t.steps.items[active].title}</p>
              {/* 不用占位图假装是产品界面 */}
              <p>{t.common.pendingMaterial}</p>
              <p style={{ fontSize: 13 }}>{t.common.materialNote}</p>
            </div>
          </Reveal>
        </div>

        <p className="section__foot">
          <a href={BETA_DOC_URL} target="_blank" rel="noreferrer noopener">
            {t.steps.guideLink}
          </a>
          <span style={{ marginInlineStart: 12 }}>{t.steps.vrmNote}</span>
        </p>
      </div>
    </section>
  );
}
