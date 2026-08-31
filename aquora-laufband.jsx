import React, { useState, useEffect, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

/* AQUORA – Wasserlaufband Therapiejournal
   Bildmarke aus dem Original-Logo freigestellt. Austauschen: nur LOGO ersetzen. */
const LOGO = "data:image/webp;base64,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";

const C = {
  page: "#EEF3F6",
  surface: "#FFFFFF",
  sunk: "#F6FAFC",
  ink: "#232A2F",
  ink2: "#46545D",
  ink3: "#5F6E78",
  hair: "#CDDBE3",
  water: "#A9CBE0",
  waterDeep: "#5C93B6",
  brass: "#A97C3F",
  up: "#3F7A6A",
  down: "#9B5B4B",
};

const KEY = "aquora:v4:dogs";
const OLD_KEYS = ["aquora:v3:dogs", "aquora:v2:dogs"];

/* Altbestand uebernehmen: entfernte Felder weg, Beschwerden werden Bemerkung. */
const migrate = (list) =>
  list.map(({ zielDauer, zielStrecke, kontakt, naechsterTermin, beschwerden, ...d }) => ({
    ...d,
    bemerkung: d.bemerkung || beschwerden || "",
  }));
const SHARED = false; // persönliche Ablage: jede Person sieht nur ihre eigenen Daten

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : "id" + Date.now() + Math.random().toString(16).slice(2);

const today = () => new Date().toISOString().slice(0, 10);
const de = (iso) => (iso ? iso.slice(0, 10).split("-").reverse().join(".") : "");
const MON = ["Jan", "Feb", "Mrz", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];

/* ---------- Fellfarben ---------- */
/* Aus dem Freitext wird eine Farbe gelesen; zweifarbige Angaben ergeben eine geteilte Scheibe. */
const COATS = [
  ["schwarz", "#2B2E31"],
  ["black", "#2B2E31"],
  ["weiss", "#EFEDE6"],
  ["weiß", "#EFEDE6"],
  ["white", "#EFEDE6"],
  ["creme", "#E8D9BC"],
  ["blond", "#DFC189"],
  ["golden", "#C99A4E"],
  ["gold", "#C99A4E"],
  ["hellbraun", "#B07E4E"],
  ["braun", "#7A5230"],
  ["schoko", "#5A3A22"],
  ["leber", "#6B4226"],
  ["rot", "#A65A32"],
  ["fuchs", "#B4693A"],
  ["beige", "#D8C6A6"],
  ["semmel", "#D8C6A6"],
  ["weizen", "#DCC7A0"],
  ["wheaten", "#DCC7A0"],
  ["falb", "#C9AE82"],
  ["isabell", "#CBB48E"],
  ["champagne", "#E0D2B6"],
  ["sand", "#D9BE93"],
  ["silber", "#B9C0C4"],
  ["blaugrau", "#9AA6AC"],
  ["grau", "#8E979D"],
  ["blue", "#8E979D"],
  ["gestromt", "#5B4632"],
  ["brindle", "#5B4632"],
  ["tricolor", "#2B2E31"],
  ["merle", "#9AA6AC"],
  ["apricot", "#DDB07A"],
];

function coatColors(farbe) {
  const t = (farbe || "").toLowerCase();
  const hits = [];
  for (const [word, hex] of COATS) {
    const i = t.indexOf(word);
    if (i >= 0 && !hits.some((h) => h.hex === hex)) hits.push({ i, hex });
  }
  hits.sort((a, b) => a.i - b.i);
  if (hits.length === 0) return [C.water];
  return hits.slice(0, 2).map((h) => h.hex);
}

const lum = (hex) => {
  const n = parseInt(hex.slice(1), 16);
  return (((n >> 16) & 255) * 0.299 + ((n >> 8) & 255) * 0.587 + (n & 255) * 0.114) / 255;
};

/* Der Hund im Logo, eingefärbt mit dem Fell des Hundes. Zweifarbig = geteilte Scheibe. */
function Avatar({ dog, size = 44 }) {
  const cols = coatColors(dog.farbe);
  const dark = lum(cols[0]) < 0.55;
  return (
    <span
      className="relative inline-block shrink-0 overflow-hidden rounded-full"
      style={{ width: size, height: size, border: `1px solid ${C.hair}` }}
      title={dog.farbe || "Fellfarbe nicht erfasst"}
    >
      <span className="absolute inset-0" style={{ background: cols[0] }} />
      {cols[1] && (
        <span
          className="absolute inset-y-0 right-0"
          style={{ width: "50%", background: cols[1] }}
        />
      )}
      <img
        src={LOGO}
        alt=""
        aria-hidden="true"
        className="absolute"
        style={{
          left: "6%",
          top: "26%",
          width: "88%",
          filter: dark ? "invert(1) brightness(1.6)" : "none",
          opacity: dark ? 0.85 : 0.72,
        }}
      />
    </span>
  );
}

/* ---------- Datenmodell ---------- */

const newDog = () => ({
  id: uid(),
  name: "",
  geb: "",
  sex: "w",
  kastriert: false,
  rasse: "",
  farbe: "",
  gewicht: "",
  bemerkung: "",
  halter: "",
  laufbandhoehe: 10,
  wasserhoehe: 10,
  sessions: [],
});

const newBlock = () => ({ speed: 3, steigung: 0, dauer: 5, pause: 2 });

const newSession = (dog) => {
  const last = [...dog.sessions].sort((a, b) => b.datum.localeCompare(a.datum))[0];
  return {
    id: uid(),
    datum: today(),
    gewicht: last?.gewicht || dog.gewicht || "",
    therapeut: last?.therapeut || "",
    laufbandhoehe: last?.laufbandhoehe ?? dog.laufbandhoehe,
    wasserhoehe: last?.wasserhoehe ?? dog.wasserhoehe,
    blocks: last ? last.blocks.map((b) => ({ ...b })) : [newBlock()],
    bemerkungen: "",
  };
};

/* Rechenkern: Skalenwert 1–10 → km/h = Skala / 2 (Faktor bestätigt).
   Strecke [km] = km/h / 60 × Minuten. Steigung ist echte Prozent,
   deshalb Steigmeter = Strecke [m] × Steigung / 100. Die Bandlänge
   ändert sich durch die Neigung nicht, die Strecke bleibt Bandweg. */
const kmh = (s) => Number(s) / 2;
const blockKm = (b) => (kmh(b.speed) / 60) * Number(b.dauer);
const blockHm = (b) => blockKm(b) * 1000 * (Number(b.steigung) / 100);
const totals = (s) => {
  const dauer = s.blocks.reduce((a, b) => a + Number(b.dauer || 0), 0);
  const pause = s.blocks.reduce((a, b) => a + Number(b.pause || 0), 0);
  const km = s.blocks.reduce((a, b) => a + blockKm(b), 0);
  const hm = s.blocks.reduce((a, b) => a + blockHm(b), 0);
  return { dauer, pause, km, hm, speedAvg: dauer > 0 ? km / (dauer / 60) : 0 };
};
const fmt = (n, d = 2) => (Math.round(Number(n) * 10 ** d) / 10 ** d).toFixed(d);
const download = (name, mime, content) => {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type: mime }));
  a.download = name;
  a.click();
};

/* ---------- Bausteine ---------- */

const field = {
  border: `1px solid ${C.hair}`,
  color: C.ink,
  background: C.sunk,
  borderRadius: 8,
};

function Text({ label, value, onChange, type = "text", placeholder, list, hint, span }) {
  return (
    <label className={`block ${span || ""}`}>
      <span className="block mb-1 text-sm" style={{ color: C.ink3 }}>
        {label}
      </span>
      <input
        type={type}
        list={list}
        value={value ?? ""}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-3 text-base"
        style={field}
      />
      {hint && (
        <span className="block mt-1 text-sm" style={{ color: C.ink3 }}>
          {hint}
        </span>
      )}
    </label>
  );
}

function Slide({ label, value, onChange, min, max, unit }) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between mb-1">
        <span className="text-sm" style={{ color: C.ink3 }}>
          {label}
        </span>
        <span className="text-base tabular-nums" style={{ color: C.ink, fontWeight: 500 }}>
          {value}
          {unit ? unit : ""}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
        style={{ accentColor: C.waterDeep }}
      />
    </label>
  );
}

function Btn({ children, onClick, tone = "quiet", disabled, size = "md" }) {
  const tones = {
    solid: { background: C.ink, color: "#fff", borderColor: C.ink },
    quiet: { background: C.surface, color: C.ink, borderColor: C.hair },
    ghost: { background: "transparent", color: C.ink2, borderColor: "transparent" },
    danger: { background: C.surface, color: C.down, borderColor: "#E4CFCB" },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={size === "sm" ? "px-3 py-2 text-base" : "px-4 py-3 text-base"}
      style={{
        ...tones[tone],
        minHeight: size === "sm" ? 40 : 48,
        fontWeight: 500,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 8,
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? "default" : "pointer",
      }}
    >
      {children}
    </button>
  );
}

function Panel({ children, className = "", pad = "p-5" }) {
  return (
    <section
      className={`relative overflow-hidden ${pad} ${className}`}
      style={{ background: C.surface, border: `1px solid ${C.hair}`, borderRadius: 14 }}
    >
      <div className="relative">{children}</div>
    </section>
  );
}

function Metric({ value, unit, label, tone }) {
  return (
    <div className="px-4 py-3">
      <div className="flex items-baseline gap-1">
        <span className="text-2xl tabular-nums" style={{ color: tone || C.ink, fontWeight: 600 }}>
          {value}
        </span>
        {unit && (
          <span className="text-sm" style={{ color: C.ink3 }}>
            {unit}
          </span>
        )}
      </div>
      <div className="mt-0.5 text-sm" style={{ color: C.ink3 }}>
        {label}
      </div>
    </div>
  );
}

/* Wannenschnitt: Wasserstand und Bandhöhe maßstäblich, Hund im Wasser. */
function Tank({ wasser, band, label }) {
  return (
    <div
      className="relative overflow-hidden"
      style={{ height: 128, background: C.sunk, border: `1px solid ${C.hair}`, borderRadius: 12 }}
    >
      <img
        src={LOGO}
        alt=""
        aria-hidden="true"
        className="absolute"
        style={{ left: "8%", bottom: "24%", width: "74%", opacity: 0.55 }}
      />
      <div
        className="aq-water absolute left-0 right-0 bottom-0"
        style={{
          height: `${(wasser / 20) * 100}%`,
          background: C.water,
          opacity: 0.66,
          borderTop: `2px solid ${C.waterDeep}`,
        }}
      />
      <div
        className="absolute left-0 right-0"
        style={{ bottom: `${(band / 20) * 100}%`, borderTop: `2px dashed ${C.ink}`, opacity: 0.45 }}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-3 pb-2">
        <span className="text-sm tabular-nums" style={{ color: C.ink }}>
          Wasser {wasser} · Band {band}
        </span>
        {label && (
          <span className="text-sm tabular-nums" style={{ color: C.ink }}>
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

/* Sitzungsprofil: pro Einheit ein Balken, Breite = Dauer, Höhe = Tempo, Lücke = Pause. */
function BlockProfile({ blocks }) {
  const H = 38;
  let x = 0;
  const parts = blocks.map((b, i) => {
    const w = Math.max(10, Number(b.dauer) * 2.6);
    const h = 8 + Number(b.speed) * 2.6;
    const rect = (
      <g key={i}>
        <rect x={x} y={H - h} width={w} height={h} rx={3} fill={C.waterDeep} opacity={0.85} />
        {Number(b.steigung) > 0 && (
          <rect x={x} y={H - h} width={w} height={Math.min(h, Number(b.steigung) * 0.9)} rx={3} fill={C.brass} opacity={0.75} />
        )}
      </g>
    );
    x += w + Math.max(4, Number(b.pause) * 1.8);
    return rect;
  });
  return (
    <svg width={Math.max(x, 40)} height={H} style={{ display: "block" }} aria-hidden="true">
      <line x1="0" y1={H - 0.5} x2={x} y2={H - 0.5} stroke={C.hair} strokeWidth="1" />
      {parts}
    </svg>
  );
}

function Chart({ title, data, dataKey, unit, refs = [] }) {
  if (data.filter((d) => d[dataKey] != null).length < 2) return null;
  return (
    <Panel pad="p-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 mb-3">
        <h4 className="text-base" style={{ color: C.ink, fontWeight: 600 }}>
          {title}
        </h4>
        {refs.map((r) => (
          <span key={r.label} className="text-sm tabular-nums" style={{ color: r.color }}>
            {r.label} {fmt(r.y)} {unit}
          </span>
        ))}
      </div>
      <div style={{ height: 190 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 4, right: 6, left: -20, bottom: 0 }}>
            <CartesianGrid stroke={C.hair} vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 13, fill: C.ink3 }} stroke={C.hair} tickLine={false} />
            <YAxis tick={{ fontSize: 13, fill: C.ink3 }} stroke={C.hair} tickLine={false} width={44} />
            <Tooltip
              formatter={(v) => [`${fmt(Number(v))} ${unit}`, title]}
              contentStyle={{ borderRadius: 10, border: `1px solid ${C.hair}`, fontSize: 14 }}
            />
            {refs.map((r) => (
              <ReferenceLine key={r.label} y={r.y} stroke={r.color} strokeDasharray="3 4" />
            ))}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={C.waterDeep}
              strokeWidth={2}
              dot={{ r: 3.5, fill: C.waterDeep, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Panel>
  );
}

/* ---------- Sitzung erfassen ---------- */

function SessionForm({ dog, session, therapists, onSave, onCancel }) {
  const [s, setS] = useState(session);
  const set = (k, v) => setS((p) => ({ ...p, [k]: v }));
  const setBlock = (i, k, v) =>
    setS((p) => ({ ...p, blocks: p.blocks.map((b, j) => (i === j ? { ...b, [k]: v } : b)) }));
  const t = totals(s);

  const prev = [...dog.sessions]
    .filter((x) => x.id !== s.id && x.datum <= s.datum)
    .sort((a, b) => b.datum.localeCompare(a.datum))[0];
  const pw = Number(prev?.gewicht);
  const cw = Number(s.gewicht);
  const delta = pw && cw ? cw - pw : null;

  return (
    <Panel>
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-base" style={{ color: C.ink, fontWeight: 600 }}>
          Sitzung {dog.sessions.some((x) => x.id === s.id) ? "bearbeiten" : "erfassen"}
        </h3>
        <span className="text-sm" style={{ color: C.ink3 }}>
          {dog.name}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Text label="Datum" type="date" value={s.datum} onChange={(v) => set("datum", v)} />
        <Text
          label="Gewicht heute (kg)"
          type="number"
          value={s.gewicht}
          onChange={(v) => set("gewicht", v)}
          hint={
            delta != null
              ? `${delta > 0 ? "+" : ""}${fmt(delta, 1)} kg seit ${de(prev.datum)}${
                  Math.abs(delta) / pw > 0.1 ? " – über 10 %, Wert prüfen" : ""
                }`
              : undefined
          }
        />
        <Text
          label="Behandelt durch"
          value={s.therapeut}
          onChange={(v) => set("therapeut", v)}
          list="aq-therapists"
          placeholder="Name"
        />
        <datalist id="aq-therapists">
          {therapists.map((n) => (
            <option key={n} value={n} />
          ))}
        </datalist>
        <div className="sm:col-span-2 grid grid-cols-2 gap-4 self-center">
          <Slide label="Bandhöhe" value={s.laufbandhoehe} onChange={(v) => set("laufbandhoehe", v)} min={0} max={20} />
          <Slide label="Wasserhöhe" value={s.wasserhoehe} onChange={(v) => set("wasserhoehe", v)} min={0} max={20} />
        </div>
        <Tank wasser={s.wasserhoehe} band={s.laufbandhoehe} label={s.gewicht ? `${s.gewicht} kg` : ""} />
      </div>

      <div className="mt-5 space-y-3">
        {s.blocks.map((b, i) => (
          <div key={i} className="p-4" style={{ background: C.sunk, borderRadius: 12 }}>
            <div className="flex items-baseline justify-between mb-3">
              <span className="text-base" style={{ color: C.ink, fontWeight: 600 }}>
                Einheit {i + 1}
              </span>
              <span className="text-sm tabular-nums" style={{ color: C.ink2 }}>
                {fmt(kmh(b.speed), 1)} km/h · {fmt(blockKm(b), 3)} km · {fmt(blockHm(b), 1)} Hm
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Slide label="Geschwindigkeit" value={b.speed} onChange={(v) => setBlock(i, "speed", v)} min={1} max={10} />
              <Slide label="Steigung" value={b.steigung} onChange={(v) => setBlock(i, "steigung", v)} min={0} max={15} unit=" %" />
              <Slide label="Dauer" value={b.dauer} onChange={(v) => setBlock(i, "dauer", v)} min={1} max={30} unit=" min" />
              <Slide label="Pause danach" value={b.pause} onChange={(v) => setBlock(i, "pause", v)} min={0} max={10} unit=" min" />
            </div>
            {s.blocks.length > 1 && (
              <div className="mt-3">
                <Btn
                  tone="ghost"
                  size="sm"
                  onClick={() => setS((p) => ({ ...p, blocks: p.blocks.filter((_, j) => j !== i) }))}
                >
                  Einheit entfernen
                </Btn>
              </div>
            )}
          </div>
        ))}
        {s.blocks.length < 3 && (
          <Btn onClick={() => setS((p) => ({ ...p, blocks: [...p.blocks, newBlock()] }))}>
            Einheit hinzufügen
          </Btn>
        )}
      </div>

      <div className="mt-5">
        <span className="block mb-1 text-sm" style={{ color: C.ink3 }}>
          Bemerkungen zur Sitzung
        </span>
        <textarea
          rows={2}
          value={s.bemerkungen}
          onChange={(e) => set("bemerkungen", e.target.value)}
          placeholder="Verhalten, Auffälligkeiten, Messpunkt Wasserhöhe"
          className="w-full px-3 py-3 text-base"
          style={field}
        />
      </div>

      <div
        className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-1 pt-4 text-base tabular-nums"
        style={{ borderTop: `1px solid ${C.hair}`, color: C.ink }}
      >
        <span>{t.dauer} min Laufzeit</span>
        <span>{t.pause} min Pause</span>
        <span>{fmt(t.km, 3)} km</span>
        <span>{fmt(t.hm, 1)} Steigmeter</span>
        <span style={{ color: C.ink3 }}>Ø {fmt(t.speedAvg, 2)} km/h</span>
      </div>

      <div className="mt-5 flex gap-2">
        <Btn tone="solid" onClick={() => onSave(s)}>
          Sitzung speichern
        </Btn>
        <Btn tone="ghost" onClick={onCancel}>
          Abbrechen
        </Btn>
      </div>
    </Panel>
  );
}

/* ---------- Bericht und Termin ---------- */

function reportHtml(dog) {
  const rows = [...dog.sessions]
    .sort((a, b) => a.datum.localeCompare(b.datum))
    .map((s) => {
      const t = totals(s);
      return `<tr><td>${de(s.datum)}</td><td>${s.gewicht || ""}</td><td>${s.wasserhoehe}</td><td>${
        s.blocks.length
      }</td><td>${t.dauer}</td><td>${fmt(t.km, 3)}</td><td>${fmt(t.hm, 1)}</td><td>${fmt(
        t.speedAvg,
        2
      )}</td><td>${s.therapeut || ""}</td><td>${s.bemerkungen || ""}</td></tr>`;
    })
    .join("");
  const km = dog.sessions.reduce((a, s) => a + totals(s).km, 0);
  const min = dog.sessions.reduce((a, s) => a + totals(s).dauer, 0);
  return `<!doctype html><html lang="de"><head><meta charset="utf-8">
<title>AQUORA Therapiebericht ${dog.name}</title><style>
body{font-family:-apple-system,Segoe UI,Roboto,sans-serif;color:#2E3438;margin:32px;max-width:900px;line-height:1.5}
header{display:flex;align-items:center;gap:18px;border-bottom:1px solid #DCE6EC;padding-bottom:14px}
header img{width:104px}
h1{font-size:17px;margin:0;letter-spacing:.3em;font-weight:600}
h2{font-size:15px;margin:26px 0 8px}
p,td,th{font-size:14px}
table{border-collapse:collapse;width:100%}
th,td{border:1px solid #DCE6EC;padding:6px 8px;text-align:left;vertical-align:top}
th{background:#F6FAFC;font-weight:600}
.meta{color:#8A99A3}
@media print{body{margin:12mm}}
</style></head><body>
<header><img src="${LOGO}" alt=""><div><h1>AQUORA</h1><p class="meta">Therapiebericht Wasserlaufband</p></div></header>
<h2>${dog.name}</h2>
<p>${[
    dog.rasse,
    dog.farbe,
    dog.sex === "w" ? "weiblich" : "männlich",
    dog.kastriert ? "kastriert" : "nicht kastriert",
    dog.geb ? "geb. " + de(dog.geb) : "",
    dog.halter ? "Halter " + dog.halter : "",
  ]
    .filter(Boolean)
    .join(", ")}</p>
<p><strong>Bemerkungen:</strong> ${dog.bemerkung || "–"}</p>
<p class="meta">${dog.sessions.length} Sitzungen · ${min} Minuten Laufzeit · ${fmt(km, 2)} km total</p>
<h2>Verlauf</h2>
<table><thead><tr><th>Datum</th><th>kg</th><th>Wasser</th><th>Einh.</th><th>min</th><th>km</th><th>Hm</th><th>Ø km/h</th><th>Therapie</th><th>Bemerkungen</th></tr></thead><tbody>${rows}</tbody></table>
<p class="meta">Strecke = Skalenwert / 2 = km/h, multipliziert mit der Laufdauer. Steigmeter = Strecke x Steigung in Prozent. Erstellt am ${de(
    today()
  )}.</p>
</body></html>`;
}


/* ---------- App ---------- */

export default function Aquora() {
  const [dogs, setDogs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [warn, setWarn] = useState(null);
  const [editDog, setEditDog] = useState(null);
  const [editSession, setEditSession] = useState(null);
  const [confirmDel, setConfirmDel] = useState(false);

  useEffect(() => {
    (async () => {
      let list = [];
      try {
        const r = await window.storage.get(KEY, SHARED);
        list = r ? JSON.parse(r.value) : [];
      } catch {
        for (const k of OLD_KEYS) {
          try {
            const old = await window.storage.get(k, SHARED);
            if (old) {
              list = migrate(JSON.parse(old.value));
              break;
            }
          } catch {}
        }
      }
      setDogs(list);
      if (list.length) setSelected(list[0].id);
      setLoading(false);
    })();
  }, []);

  const persist = async (next) => {
    setDogs(next);
    try {
      const ok = await window.storage.set(KEY, JSON.stringify(next), SHARED);
      if (!ok) throw new Error("kein Resultat");
      setWarn(null);
    } catch {
      setWarn("Nicht gespeichert. Die Änderung gilt nur in dieser Sitzung.");
    }
  };

  const dog = dogs.find((d) => d.id === selected) || null;
  const therapists = useMemo(
    () => [...new Set(dogs.flatMap((d) => d.sessions.map((s) => s.therapeut).filter(Boolean)))],
    [dogs]
  );

  const chartData = useMemo(() => {
    if (!dog) return [];
    return [...dog.sessions]
      .sort((a, b) => a.datum.localeCompare(b.datum))
      .map((s) => {
        const t = totals(s);
        return {
          label: de(s.datum).slice(0, 5),
          gewicht: Number(s.gewicht) || null,
          dauer: t.dauer,
          speed: Number(fmt(t.speedAvg, 2)),
          km: Number(fmt(t.km, 3)),
          hm: Number(fmt(t.hm, 1)),
          wasser: s.wasserhoehe,
        };
      });
  }, [dog]);

  const saveDog = (d) => {
    persist(dogs.some((x) => x.id === d.id) ? dogs.map((x) => (x.id === d.id ? d : x)) : [...dogs, d]);
    setSelected(d.id);
    setEditDog(null);
    setConfirmDel(false);
  };

  const saveSession = (s) => {
    persist(
      dogs.map((d) =>
        d.id !== dog.id
          ? d
          : {
              ...d,
              sessions: d.sessions.some((x) => x.id === s.id)
                ? d.sessions.map((x) => (x.id === s.id ? s : x))
                : [...d.sessions, s],
            }
      )
    );
    setEditSession(null);
  };

  const kmTotal = dog ? dog.sessions.reduce((a, s) => a + totals(s).km, 0) : 0;
  const minTotal = dog ? dog.sessions.reduce((a, s) => a + totals(s).dauer, 0) : 0;
  const firstW = chartData.find((d) => d.gewicht)?.gewicht;
  const lastW = [...chartData].reverse().find((d) => d.gewicht)?.gewicht;
  const wDelta = firstW && lastW ? lastW - firstW : null;

  return (
    <div className="min-h-screen" style={{ background: C.page, color: C.ink }}>
      <style>{`
        .aq-water{transform-origin:bottom;animation:aqFill .7s cubic-bezier(.2,.7,.3,1) both}
        @keyframes aqFill{from{transform:scaleY(.2);opacity:.2}to{transform:scaleY(1)}}
        @media (prefers-reduced-motion: reduce){.aq-water{animation:none}}
        input:focus-visible,textarea:focus-visible,button:focus-visible,select:focus-visible{
          outline:2px solid ${C.waterDeep};outline-offset:2px}
        input[type=range]{height:34px;width:100%}
        textarea,input,select{font-size:16px}
        button{-webkit-tap-highlight-color:transparent}
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        <header
          className="flex flex-wrap items-center justify-between gap-4 pb-5 mb-6"
          style={{ borderBottom: `1px solid ${C.hair}` }}
        >
          <div className="flex items-center gap-4">
            <img src={LOGO} alt="AQUORA" style={{ width: 96 }} />
            <div>
              <div style={{ letterSpacing: "0.3em", fontWeight: 600, fontSize: 22 }}>AQUORA</div>
              <div className="mt-1 text-sm" style={{ color: C.ink3, letterSpacing: "0.14em" }}>
                Kraft durch Wasser · Therapiejournal
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Btn
              onClick={() =>
                download(`aquora-daten-${today()}.json`, "application/json", JSON.stringify(dogs, null, 2))
              }
              disabled={dogs.length === 0}
            >
              Daten sichern
            </Btn>
            <Btn tone="solid" onClick={() => { setEditDog(newDog()); setEditSession(null); }}>
              Hund erfassen
            </Btn>
          </div>
        </header>

        {warn && (
          <div
            className="mb-5 px-4 py-3 text-base"
            style={{ background: "#FBF1E4", color: "#8A5A22", border: "1px solid #EEDCC2", borderRadius: 12 }}
          >
            {warn}
          </div>
        )}

        {loading ? (
          <p className="text-base" style={{ color: C.ink3 }}>
            Daten werden geladen.
          </p>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Kartei */}
            {dogs.length > 0 && (
              <aside className="lg:shrink-0" style={{ width: "100%", maxWidth: 248 }}>
                <div className="mb-2 text-sm" style={{ color: C.ink3 }}>
                  Kartei · {dogs.length}
                </div>
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1">
                  {dogs.map((d) => {
                    const on = d.id === selected;
                    return (
                      <button
                        key={d.id}
                        onClick={() => {
                          setSelected(d.id);
                          setEditSession(null);
                          setEditDog(null);
                          setConfirmDel(false);
                        }}
                        className="flex items-center gap-3 px-3 py-2 shrink-0 lg:w-full text-left"
                        style={{
                          background: on ? C.surface : "transparent",
                          border: `1px solid ${on ? C.hair : "transparent"}`,
                          borderRadius: 12,
                          boxShadow: on ? `inset 3px 0 0 ${C.waterDeep}` : "none",
                        }}
                      >
                        <Avatar dog={d} size={36} />
                        <span className="min-w-0">
                          <span className="block text-base truncate" style={{ fontWeight: on ? 600 : 500 }}>
                            {d.name || "ohne Namen"}
                          </span>
                          <span className="block text-sm truncate" style={{ color: C.ink3 }}>
                            {d.sessions.length === 0
                              ? "keine Sitzung"
                              : `${d.sessions.length} Sitzungen`}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>
            )}

            <main className="min-w-0 flex-1 space-y-6">
              {editDog && (
                <Panel>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar dog={editDog} size={40} />
                    <h3 className="text-base" style={{ fontWeight: 600 }}>
                      {dogs.some((d) => d.id === editDog.id) ? "Grunddaten bearbeiten" : "Neuer Hund"}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Text label="Name" value={editDog.name} onChange={(v) => setEditDog({ ...editDog, name: v })} />
                    <Text label="Geburtsdatum" type="date" value={editDog.geb} onChange={(v) => setEditDog({ ...editDog, geb: v })} />
                    <Text label="Rasse" value={editDog.rasse} onChange={(v) => setEditDog({ ...editDog, rasse: v })} placeholder="z. B. Weimaraner" />
                    <Text
                      label="Farbe"
                      value={editDog.farbe}
                      onChange={(v) => setEditDog({ ...editDog, farbe: v })}
                      placeholder="z. B. schwarz-weiss"
                      hint="Bestimmt die Farbe im Kartei-Bild"
                    />
                    <Text label="Gewicht bei Erstaufnahme (kg)" type="number" value={editDog.gewicht} onChange={(v) => setEditDog({ ...editDog, gewicht: v })} />
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block">
                        <span className="block mb-1 text-sm" style={{ color: C.ink3 }}>
                          Geschlecht
                        </span>
                        <select
                          value={editDog.sex}
                          onChange={(e) => setEditDog({ ...editDog, sex: e.target.value })}
                          className="w-full px-3 py-3 text-base"
                          style={field}
                        >
                          <option value="w">weiblich</option>
                          <option value="m">männlich</option>
                        </select>
                      </label>
                      <label className="block">
                        <span className="block mb-1 text-sm" style={{ color: C.ink3 }}>
                          Kastriert
                        </span>
                        <button
                          onClick={() => setEditDog({ ...editDog, kastriert: !editDog.kastriert })}
                          className="w-full px-3 py-3 text-base text-left"
                          style={field}
                        >
                          {editDog.kastriert ? "ja" : "nein"}
                        </button>
                      </label>
                    </div>
                    <Text label="Halter" value={editDog.halter} onChange={(v) => setEditDog({ ...editDog, halter: v })} />
                    <div className="sm:col-span-3">
                      <span className="block mb-1 text-sm" style={{ color: C.ink3 }}>
                        Bemerkungen
                      </span>
                      <textarea
                        rows={3}
                        value={editDog.bemerkung}
                        onChange={(e) => setEditDog({ ...editDog, bemerkung: e.target.value })}
                        placeholder="Diagnose, Beschwerden, Vorgaben des Tierarztes"
                        className="w-full px-3 py-3 text-base"
                        style={field}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 self-center">
                      <Slide label="Bandhöhe Standard" value={editDog.laufbandhoehe} onChange={(v) => setEditDog({ ...editDog, laufbandhoehe: v })} min={0} max={20} />
                      <Slide label="Wasserhöhe Standard" value={editDog.wasserhoehe} onChange={(v) => setEditDog({ ...editDog, wasserhoehe: v })} min={0} max={20} />
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Btn tone="solid" onClick={() => saveDog(editDog)} disabled={!editDog.name.trim()}>
                      Hund speichern
                    </Btn>
                    <Btn tone="ghost" onClick={() => { setEditDog(null); setConfirmDel(false); }}>
                      Abbrechen
                    </Btn>
                    {dogs.some((d) => d.id === editDog.id) &&
                      (confirmDel ? (
                        <Btn
                          tone="danger"
                          onClick={() => {
                            const next = dogs.filter((d) => d.id !== editDog.id);
                            persist(next);
                            setSelected(next[0]?.id || null);
                            setEditDog(null);
                            setConfirmDel(false);
                          }}
                        >
                          {editDog.name} und {editDog.sessions.length} Sitzungen endgültig löschen
                        </Btn>
                      ) : (
                        <Btn tone="ghost" onClick={() => setConfirmDel(true)}>
                          Hund löschen
                        </Btn>
                      ))}
                  </div>
                </Panel>
              )}

              {!dog && !editDog && (
                <Panel>
                  <h3 className="text-base" style={{ fontWeight: 600 }}>
                    Kartei ist leer
                  </h3>
                  <p className="mt-2 text-base" style={{ color: C.ink2, maxWidth: "60ch" }}>
                    Erfasse zuerst die Grunddaten eines Hundes. Danach hältst du pro Sitzung die Einheiten
                    fest, und der Verlauf zeichnet sich automatisch.
                  </p>
                  <div className="mt-4">
                    <Btn tone="solid" onClick={() => setEditDog(newDog())}>
                      Ersten Hund erfassen
                    </Btn>
                  </div>
                </Panel>
              )}

              {dog && (
                <>
                  <Panel>
                    <div className="flex flex-col sm:flex-row gap-5">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-3">
                          <Avatar dog={dog} size={52} />
                          <div className="min-w-0">
                            <h2 className="text-2xl truncate" style={{ fontWeight: 600 }}>
                              {dog.name}
                            </h2>
                            <p className="text-base truncate" style={{ color: C.ink3 }}>
                              {[dog.rasse, dog.farbe].filter(Boolean).join(", ") || "Rasse nicht erfasst"}
                            </p>
                          </div>
                        </div>
                        <p className="mt-3 text-base" style={{ color: C.ink2 }}>
                          {[
                            dog.sex === "w" ? "weiblich" : "männlich",
                            dog.kastriert ? "kastriert" : "nicht kastriert",
                            dog.geb ? `geb. ${de(dog.geb)}` : null,
                            dog.halter ? `Halter ${dog.halter}` : null,
                          ]
                            .filter(Boolean)
                            .join(" · ")}
                        </p>
                        {dog.bemerkung && (
                          <p className="mt-3 text-base" style={{ maxWidth: "62ch" }}>
                            {dog.bemerkung}
                          </p>
                        )}
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Btn tone="solid" onClick={() => { setEditSession(newSession(dog)); setEditDog(null); }}>
                            Sitzung erfassen
                          </Btn>
                          <Btn onClick={() => { setEditDog(dog); setEditSession(null); }}>Grunddaten</Btn>
                          <Btn
                            onClick={() => download(`bericht-${dog.name}-${today()}.html`, "text/html", reportHtml(dog))}
                            disabled={dog.sessions.length === 0}
                          >
                            Bericht
                          </Btn>
                        </div>
                      </div>
                      <div className="sm:w-64 shrink-0">
                        <Tank
                          wasser={dog.wasserhoehe}
                          band={dog.laufbandhoehe}
                          label={lastW ? `${lastW} kg` : dog.gewicht ? `${dog.gewicht} kg` : ""}
                        />
                      </div>
                    </div>
                  </Panel>

                  {dog.sessions.length > 0 && (
                    <div
                      className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0"
                      style={{ background: C.surface, border: `1px solid ${C.hair}`, borderRadius: 14, borderColor: C.hair }}
                    >
                      <Metric value={dog.sessions.length} label="Sitzungen" />
                      <Metric value={minTotal} unit="min" label="Laufzeit total" />
                      <Metric value={fmt(kmTotal, 2)} unit="km" label="Strecke total" />
                      <Metric
                        value={wDelta == null ? "–" : `${wDelta > 0 ? "+" : ""}${fmt(wDelta, 1)}`}
                        unit={wDelta == null ? "" : "kg"}
                        label="Gewicht seit Start"
                        tone={wDelta == null ? C.ink3 : wDelta < 0 ? C.up : C.down}
                      />
                    </div>
                  )}

                  {editSession && (
                    <SessionForm
                      dog={dog}
                      session={editSession}
                      therapists={therapists}
                      onSave={saveSession}
                      onCancel={() => setEditSession(null)}
                    />
                  )}

                  {chartData.length > 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Chart title="Gewicht" data={chartData} dataKey="gewicht" unit="kg" />
                      <Chart
                        title="Strecke pro Sitzung"
                        data={chartData}
                        dataKey="km"
                        unit="km"
                        refs={[{ y: chartData[0].km, color: C.brass, label: "Start" }]}
                      />
                      <Chart
                        title="Laufdauer"
                        data={chartData}
                        dataKey="dauer"
                        unit="min"
                        refs={[{ y: chartData[0].dauer, color: C.brass, label: "Start" }]}
                      />
                      <Chart title="Ø Geschwindigkeit" data={chartData} dataKey="speed" unit="km/h" />
                      <Chart title="Wasserhöhe" data={chartData} dataKey="wasser" unit="Skala" />
                      <Chart title="Steigmeter" data={chartData} dataKey="hm" unit="m" />
                    </div>
                  )}

                  <div>
                    <h3 className="mb-3 text-sm" style={{ color: C.ink3 }}>
                      Verlauf
                    </h3>
                    {dog.sessions.length === 0 ? (
                      <Panel>
                        <p className="text-base" style={{ color: C.ink2, maxWidth: "60ch" }}>
                          Noch keine Sitzung erfasst. Nach der zweiten Sitzung erscheinen die Kurven.
                        </p>
                      </Panel>
                    ) : (
                      <Panel pad="p-0">
                        {[...dog.sessions]
                          .sort((a, b) => b.datum.localeCompare(a.datum))
                          .map((s, idx) => {
                            const t = totals(s);
                            const [y, m, d] = s.datum.split("-");
                            return (
                              <div
                                key={s.id}
                                className="flex gap-4 p-4"
                                style={{ borderTop: idx === 0 ? "none" : `1px solid ${C.hair}` }}
                              >
                                <div className="text-center shrink-0" style={{ width: 44 }}>
                                  <div className="text-xl tabular-nums leading-none" style={{ fontWeight: 600 }}>
                                    {d}
                                  </div>
                                  <div className="text-sm" style={{ color: C.ink3 }}>
                                    {MON[Number(m) - 1]} {y.slice(2)}
                                  </div>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
                                    <BlockProfile blocks={s.blocks} />
                                    <span className="text-base tabular-nums" style={{ color: C.ink2 }}>
                                      {t.dauer} min · {fmt(t.km, 3)} km · {fmt(t.hm, 1)} Hm · Wasser{" "}
                                      {s.wasserhoehe}
                                      {s.gewicht ? ` · ${s.gewicht} kg` : ""}
                                    </span>
                                  </div>
                                  <div className="mt-1 text-sm" style={{ color: C.ink3 }}>
                                    {s.blocks
                                      .map((b) => `${fmt(kmh(b.speed), 1)} km/h ${b.steigung}% ${b.dauer}′`)
                                      .join("  ·  ")}
                                    {s.therapeut ? ` — ${s.therapeut}` : ""}
                                  </div>
                                  {s.bemerkungen && (
                                    <p className="mt-2 text-base" style={{ maxWidth: "62ch" }}>
                                      {s.bemerkungen}
                                    </p>
                                  )}
                                  <div className="mt-2 flex gap-1">
                                    <Btn tone="ghost" size="sm" onClick={() => { setEditSession(s); setEditDog(null); }}>
                                      Bearbeiten
                                    </Btn>
                                    <Btn
                                      tone="ghost"
                                      size="sm"
                                      onClick={() =>
                                        persist(
                                          dogs.map((x) =>
                                            x.id === dog.id
                                              ? { ...x, sessions: x.sessions.filter((z) => z.id !== s.id) }
                                              : x
                                          )
                                        )
                                      }
                                    >
                                      Löschen
                                    </Btn>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                      </Panel>
                    )}
                  </div>
                </>
              )}
            </main>
          </div>
        )}

        <p className="mt-10 text-sm" style={{ color: C.ink3, maxWidth: "70ch" }}>
          Die Daten liegen in deiner persönlichen Ablage und sind für niemanden sonst sichtbar. Für den
          gemeinsamen Zugriff aus der Praxis braucht es eine Datenbank mit Login. Mit «Daten sichern» holst
          du jederzeit eine vollständige Kopie.
        </p>
      </div>
    </div>
  );
}
