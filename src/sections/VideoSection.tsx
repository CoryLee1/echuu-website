import { useState } from 'react';
import { useLocale } from '../locale-context';
import { Reveal } from '../components/Reveal';
import { INTRO_VIDEO } from '../config/site';

/**
 * S02 看到表演。点击播放才加载第三方播放器，默认不向 YouTube 发请求。
 * 不添加「实时在线」红点伪装录播。
 */
export function VideoSection() {
  const { t } = useLocale();
  const [playing, setPlaying] = useState(false);
  const statusLabel = INTRO_VIDEO.status === 'beta' ? t.video.statusBeta : t.video.statusLocal;
  const statusClass = INTRO_VIDEO.status === 'beta' ? 'tag tag--beta' : 'tag tag--local';

  return (
    <section className="section" id="video" aria-labelledby="video-title">
      <div className="shell">
        <Reveal className="section__head">
          <h2 className="section__title" id="video-title">
            {t.video.title}
          </h2>
          <p className="section__lede">{t.video.body}</p>
          <p style={{ marginTop: 12 }}>
            <span className={statusClass}>{statusLabel}</span>
          </p>
        </Reveal>

        <Reveal className="video-block">
          <div className="video-frame">
            {playing ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${INTRO_VIDEO.youtubeId}?autoplay=1&rel=0&cc_load_policy=1`}
                title={t.video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button type="button" className="video-poster" onClick={() => setPlaying(true)}>
                <img className="video-poster__sky" src="/website/brand/sky-blob.png" alt="" />
                <span className="video-poster__play" aria-hidden="true">
                  <img src="/website/brand/play.svg" alt="" width={22} height={22} />
                </span>
                <span className="video-poster__label">{t.video.play}</span>
              </button>
            )}
          </div>

          <p className="video-note">
            {t.video.unavailable}{' '}
            <a href={INTRO_VIDEO.watchUrl} target="_blank" rel="noreferrer noopener">
              {t.video.openExternal}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
