import { Link } from 'react-router-dom';
import { useLocale, localePath } from '../locale-context';
import { Reveal } from '../components/Reveal';
import { JOURNAL_NOTES, RESEARCH_NOTES } from '../data/journal';

/** S08 日志。首页最多两条短记录；没有研究记录时如实显示整理中。 */
export function JournalSection() {
  const { locale, t } = useLocale();
  const notes = JOURNAL_NOTES.slice(0, 2);

  return (
    <section className="section" id="journal" aria-labelledby="journal-title">
      <div className="shell">
        <Reveal className="section__head">
          <h2 className="section__title" id="journal-title">
            {t.journal.title}
          </h2>
        </Reveal>

        <div className="note-list">
          {notes.map((note) => (
            <Reveal className="note-card" key={note.id}>
              <p className="note-card__meta">
                <span className="tag">{t.journal.catProduct}</span>
              </p>
              <h3>{note.title[locale] ?? note.title.en}</h3>
              <p>{note.body[locale] ?? note.body.en}</p>
              <p className="note-card__meta">
                {t.journal.shortNote} · {t.journal.source}: {note.source}
              </p>
            </Reveal>
          ))}
        </div>

        {RESEARCH_NOTES.length === 0 && (
          <p className="note-empty" style={{ marginTop: 16 }}>
            {t.journal.emptyResearch}
          </p>
        )}

        <p className="section__foot">
          <Link className="btn btn--quiet btn--small" to={localePath(locale, 'journal')}>
            {t.journal.readAll}
          </Link>
        </p>
      </div>
    </section>
  );
}
