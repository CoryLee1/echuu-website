import { useLocale } from '../locale-context';
import { Reveal } from '../components/Reveal';

/**
 * S04 人设进入表演。每项应搭配一张界面或一段实录；
 * 当前对外可用素材尚未取得，如实显示待取得，不用空泛图标卡凑数。
 * 第三项（弹幕与礼物影响剧情）只有 09-11 本地预研证据，默认带预研演示标签。
 */
export function FeaturesSection() {
  const { t } = useLocale();

  return (
    <section className="section" id="features" aria-labelledby="features-title">
      <div className="shell">
        <Reveal className="section__head">
          <h2 className="section__title" id="features-title">
            {t.features.title}
          </h2>
        </Reveal>

        <div className="feature-grid">
          {t.features.items.map((feature, index) => (
            <Reveal key={feature.title} className="feature-card" delay={index * 60}>
              <div className="feature-card__media">
                <span>{t.common.pendingMaterial}</span>
              </div>
              <h3 className="feature-card__title">{feature.title}</h3>
              <p className="feature-card__body">{feature.body}</p>
              {index === 2 && (
                <p>
                  <span className="tag tag--local">{t.features.researchTag}</span>
                </p>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
