import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import {
  DICTS,
  DEFAULT_LOCALE,
  detectLocale,
  isLocale,
  readStoredLocale,
  type Locale,
} from './i18n';
import { LocaleContext } from './locale-context';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { HomePage } from './pages/HomePage';
import { GalleryPage } from './pages/GalleryPage';
import { CreatorsPage } from './pages/CreatorsPage';
import { JournalPage } from './pages/JournalPage';
import { FeedbackPage } from './pages/FeedbackPage';
import { DoodlePage } from './pages/DoodlePage';
import { MoodboardPage } from './pages/MoodboardPage';
import { NotFoundPage } from './pages/NotFoundPage';

/** 深链接刷新后滚动到锚点；没有锚点时回到顶部。 */
function ScrollManager() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);
  return null;
}

function LocaleLayout() {
  const { locale } = useParams();
  if (!isLocale(locale)) return <Navigate to={`/${DEFAULT_LOCALE}`} replace />;

  const value = { locale: locale as Locale, t: DICTS[locale as Locale] };

  return (
    <LocaleContext.Provider value={value}>
      <a className="skip-link" href="#main">
        {value.t.nav.skipToContent}
      </a>
      <SiteHeader />
      <main id="main">
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="gallery" element={<GalleryPage />} />
          <Route path="creators" element={<CreatorsPage />} />
          <Route path="journal" element={<JournalPage />} />
          <Route path="feedback" element={<FeedbackPage />} />
          <Route path="doodle" element={<DoodlePage />} />
          <Route path="moodboard" element={<MoodboardPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <SiteFooter />
    </LocaleContext.Provider>
  );
}

/** 首次进入按已保存选择、其次按浏览器语言；不按 IP 强制跳转。 */
function RootRedirect() {
  const stored = readStoredLocale();
  const locale =
    stored ?? detectLocale(typeof navigator === 'undefined' ? [] : navigator.languages ?? [navigator.language]);
  return <Navigate to={`/${locale}`} replace />;
}

export function App() {
  return (
    <>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/:locale/*" element={<LocaleLayout />} />
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </>
  );
}
