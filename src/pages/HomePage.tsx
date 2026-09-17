import { useLocale } from '../locale-context';
import { Head } from '../components/Head';
import { Hero } from '../sections/Hero';
import { VideoSection } from '../sections/VideoSection';
import { StepsSection } from '../sections/StepsSection';
import { FeaturesSection } from '../sections/FeaturesSection';
import { ModesSection } from '../sections/ModesSection';
import { GallerySection } from '../sections/GallerySection';
import { CreatorsSection } from '../sections/CreatorsSection';
import { TrustSection } from '../sections/TrustSection';
import { JournalSection } from '../sections/JournalSection';
import { ApplySection } from '../sections/ApplySection';
import { CornersSection } from '../sections/CornersSection';

export function HomePage() {
  const { locale, t } = useLocale();
  return (
    <>
      <Head
        locale={locale}
        htmlLang={t.htmlLang}
        title={t.meta.home.title}
        description={t.meta.home.description}
        path=""
      />
      <Hero />
      <VideoSection />
      <StepsSection />
      <FeaturesSection />
      <ModesSection />
      <GallerySection />
      <CreatorsSection />
      <TrustSection />
      <JournalSection />
      <ApplySection />
      <CornersSection />
    </>
  );
}
