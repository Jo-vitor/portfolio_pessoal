import I18N_CONFIG from "../../config/i18nConfig";

type LanguageSwitcherProps = {
  showLabels?: boolean;
  ls: string;
  setls: (language: any) => void;
};

export default function LanguageSwitcher({
  showLabels = true,
  ls,
  setls,
}: LanguageSwitcherProps) {

  return (
    <div className="lang-switcher" role="group">
      {I18N_CONFIG.LANGUAGES.map(({ code, name, short, flag: Flag }) => {
        const active = code === ls;

        return (
          <button
            key={code}
            type="button"
            lang={code}
            className={`lang-btn ${active ? "active" : ""}`}
            aria-pressed={active}
            onClick={() => {
              setls(code);
            }}
          >
            <Flag className="lang-flag" aria-hidden="true" />
            {showLabels && <span>{short}</span>}
          </button>
        );
      })}
    </div>
  );
}