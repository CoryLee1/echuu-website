import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LOCALES, LOCALE_NAMES, storeLocale, type Locale } from '../i18n';

/** 切换语言时保留当前子页与查询串。 */
export function LangSwitch({ locale, label }: { locale: Locale; label: string }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!wrapRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const rest = location.pathname.split('/').slice(2).join('/');

  return (
    <div className="lang-switch" ref={wrapRef}>
      <button
        type="button"
        className="lang-switch__button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="visually-hidden">{label}: </span>
        {LOCALE_NAMES[locale]}
        <span aria-hidden="true">▾</span>
      </button>
      {open && (
        <ul className="lang-switch__menu">
          {LOCALES.map((item) => (
            <li key={item}>
              <a
                href={`/website/${item}${rest ? `/${rest}` : ''}`}
                lang={item}
                aria-current={item === locale ? 'true' : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  storeLocale(item);
                  setOpen(false);
                  navigate(`/${item}${rest ? `/${rest}` : ''}${location.search}`);
                }}
              >
                {LOCALE_NAMES[item]}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
