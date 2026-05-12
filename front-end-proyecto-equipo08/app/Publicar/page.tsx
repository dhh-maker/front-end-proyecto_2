'use client';
import { useRef, useState } from 'react';
import styles from './Publicar.module.css';

interface FormData {
  titulo: string;
  descripcionCorta: string;
  descripcionCompleta: string;
  requisitos: string;
  duracion: string;
  modalidad: string;
  tipoServicio: string;
  ubicacion: string;
  correo: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const DURACIONES = ['6 meses', '12 meses', '18 meses', '24 meses'];
const MODALIDADES = ['Presencial', 'Remoto', 'Híbrida'];
const TIPOS_SERVICIO = [
  'Desarrollo de software',
  'Análisis de datos',
  'Soporte técnico',
  'Investigación',
  'Administración de sistemas',
  'Docencia y tutorías',
  'Diseño y comunicación',
  'Otro',
];

const SUGERENCIAS = [
  { emoji: '📋', label: 'Responsabilidades', texto: 'Apoyar en el desarrollo de..., dar seguimiento a..., elaborar reportes...' },
  { emoji: '🛠️', label: 'Herramientas',       texto: 'Python, Excel, SQL, Git, Figma, Office 365...' },
  { emoji: '🎯', label: 'Habilidades',         texto: 'Trabajo en equipo, comunicación efectiva, autodidacta...' },
  { emoji: '🕐', label: 'Horario',             texto: 'Lunes a viernes 9:00–14:00 hrs, flexible o remoto...' },
  { emoji: '🎁', label: 'Beneficios',          texto: 'Carta de recomendación, constancia, capacitación...' },
];

const VACANTE_INICIAL: FormData = {
  titulo: '',
  descripcionCorta: '',
  descripcionCompleta: '',
  requisitos: '',
  duracion: '',
  modalidad: '',
  tipoServicio: '',
  ubicacion: '',
  correo: '',
};
//validacion
function validar(data: FormData): FormErrors {
  const errores: FormErrors = {};
  if (!data.titulo.trim())              errores.titulo = 'El título de la vacante es obligatorio.';
  if (!data.descripcionCorta.trim())    errores.descripcionCorta = 'Agrega una descripción corta.';
  if (!data.descripcionCompleta.trim()) errores.descripcionCompleta = 'La descripción completa es obligatoria.';
  if (!data.requisitos.trim())          errores.requisitos = 'Lista al menos un requisito.';
  if (!data.duracion)                   errores.duracion = 'Selecciona la duración.';
  if (!data.modalidad)                  errores.modalidad = 'Selecciona la modalidad.';
  if (!data.tipoServicio)               errores.tipoServicio = 'Selecciona el tipo de servicio.';
  if (!data.ubicacion.trim())           errores.ubicacion = 'Indica la ubicación.';
  if (!data.correo.trim()) {
    errores.correo = 'El correo de contacto es obligatorio.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.correo)) {
    errores.correo = 'Ingresa un correo válido.';
  }
  return errores;
}

//campo
function Campo({
  id, label, error, required = false, children,
}: {
  id: string; label: string; error?: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className={`${styles.campo} ${error ? styles.campoError : ''}`}>
      <label className={styles.label} htmlFor={id}>
        {label} {required && <span className={styles.req}>*</span>}
      </label>
      {children}
      {error && <p className={styles.errorMsg} role="alert">{error}</p>}
    </div>
  );
}

export default function Registro() {
  const [form, setForm]           = useState<FormData>(VACANTE_INICIAL);
  const [errores, setErrores]     = useState<FormErrors>({});
  const [enviado, setEnviado]     = useState(false);
  const [enviando, setEnviando]   = useState(false);
  const refs = useRef<Partial<Record<keyof FormData, HTMLElement | null>>>({});

  function set(campo: keyof FormData, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
  }

  function insertarSugerencia(texto: string) {
    set('descripcionCompleta', form.descripcionCompleta
      ? `${form.descripcionCompleta}\n${texto}`
      : texto
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nuevosErrores = validar(form);

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      const primerCampo = Object.keys(nuevosErrores)[0] as keyof FormData;
      refs.current[primerCampo]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (refs.current[primerCampo] as HTMLElement | null)?.focus();
      return;
    }

    setEnviando(true);
    await new Promise((r) => setTimeout(r, 900));
    setEnviando(false);
    setEnviado(true);
  }

  if (enviado) {
    return (
      <div className={styles.successWrapper}>
        <div className={styles.successCard}>
          <span className={styles.successIcon}>🎉</span>
          <h2 className={styles.successTitle}>¡Vacante enviada!</h2>
          <p className={styles.successMsg}>
            Gracias. Tu vacante fue enviada y será revisada por nuestro equipo.
          </p>
          <button className={styles.btnPrimary} onClick={() => { setEnviado(false); setForm(VACANTE_INICIAL); }}>
            Publicar otra vacante
          </button>
        </div>
      </div>
    );
  }

  const descLen    = form.descripcionCompleta.length;
  const reqLen     = form.requisitos.length;
  const MAX        = 800;

  return (
    <main className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Publicar Vacante</h1>
        <p className={styles.pageSubtitle}>Registra una nueva oportunidad de servicio social</p>
      </div>

      <div className={styles.infoBanner}>
        <span className={styles.infoIcon}>ℹ️</span>
        <div>
          <strong>Proceso de validación</strong>
          <p>Todas las vacantes publicadas pasan por un proceso de revisión por parte de la coordinación.</p>
        </div>
      </div>

      <form className={styles.form} onSubmit={handleSubmit} noValidate>

        <Campo id="titulo" label="Título de la vacante" required error={errores.titulo}>
          <input
            id="titulo"
            className={styles.input}
            placeholder="Ej: Desarrollo de Sistema de Gestión Académica"
            value={form.titulo}
            onChange={(e) => set('titulo', e.target.value)}
            ref={(el) => { refs.current.titulo = el; }}
          />
        </Campo>

        <Campo id="descripcionCorta" label="Descripción corta" required error={errores.descripcionCorta}>
          <input
            id="descripcionCorta"
            className={styles.input}
            placeholder="Breve resumen de la vacante (1–2 oraciones)"
            value={form.descripcionCorta}
            onChange={(e) => set('descripcionCorta', e.target.value)}
            ref={(el) => { refs.current.descripcionCorta = el; }}
          />
        </Campo>

        <Campo id="descripcionCompleta" label="Descripción completa" required error={errores.descripcionCompleta}>
          <div className={styles.sugerencias}>
            <p className={styles.sugerenciasLabel}>Sugerencias para completar:</p>
            <div className={styles.sugerenciasRow}>
              {SUGERENCIAS.map((s) => (
                <button
                  key={s.label}
                  type="button"
                  className={styles.chip}
                  onClick={() => insertarSugerencia(`${s.label}: ${s.texto}`)}
                  title={s.texto}
                >
                  {s.emoji} {s.label}
                </button>
              ))}
            </div>
          </div>
          <textarea
            id="descripcionCompleta"
            className={`${styles.textarea} ${descLen > MAX ? styles.textareaOver : ''}`}
            placeholder="Descripción detallada de las actividades y responsabilidades"
            rows={6}
            value={form.descripcionCompleta}
            onChange={(e) => set('descripcionCompleta', e.target.value)}
            ref={(el) => { refs.current.descripcionCompleta = el; }}
          />
          <p className={`${styles.charCount} ${descLen > MAX ? styles.charOver : ''}`}>
            {descLen} / {MAX} caracteres
          </p>
        </Campo>

        <Campo id="requisitos" label="Requisitos" required error={errores.requisitos}>
          <textarea
            id="requisitos"
            className={`${styles.textarea} ${reqLen > MAX ? styles.textareaOver : ''}`}
            placeholder="Lista los requisitos separados por comas o por línea."
            rows={4}
            value={form.requisitos}
            onChange={(e) => set('requisitos', e.target.value)}
            ref={(el) => { refs.current.requisitos = el; }}
          />
          <p className={`${styles.charCount} ${reqLen > MAX ? styles.charOver : ''}`}>
            {reqLen} / {MAX} caracteres
          </p>
        </Campo>

        <div className={styles.row2}>
          <Campo id="duracion" label="Duración" required error={errores.duracion}>
            <select
              id="duracion"
              className={styles.select}
              value={form.duracion}
              onChange={(e) => set('duracion', e.target.value)}
              ref={(el) => { refs.current.duracion = el; }}
            >
              <option value="">Selecciona duración</option>
              {DURACIONES.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </Campo>

          <Campo id="modalidad" label="Modalidad" required error={errores.modalidad}>
            <select
              id="modalidad"
              className={styles.select}
              value={form.modalidad}
              onChange={(e) => set('modalidad', e.target.value)}
              ref={(el) => { refs.current.modalidad = el; }}
            >
              <option value="">Selecciona modalidad</option>
              {MODALIDADES.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
          </Campo>
        </div>

        <Campo id="tipoServicio" label="Tipo de servicio" required error={errores.tipoServicio}>
          <select
            id="tipoServicio"
            className={styles.select}
            value={form.tipoServicio}
            onChange={(e) => set('tipoServicio', e.target.value)}
            ref={(el) => { refs.current.tipoServicio = el; }}
          >
            <option value="">Selecciona un tipo</option>
            {TIPOS_SERVICIO.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </Campo>

        <Campo id="ubicacion" label="Ubicación" required error={errores.ubicacion}>
          <input
            id="ubicacion"
            className={styles.input}
            placeholder="Ej: Ciudad Universitaria, CDMX"
            value={form.ubicacion}
            onChange={(e) => set('ubicacion', e.target.value)}
            ref={(el) => { refs.current.ubicacion = el; }}
          />
        </Campo>

        <Campo id="correo" label="Correo de contacto" required error={errores.correo}>
          <input
            id="correo"
            type="email"
            className={styles.input}
            placeholder="correo@institucion.unam.mx"
            value={form.correo}
            onChange={(e) => set('correo', e.target.value)}
            ref={(el) => { refs.current.correo = el; }}
          />
        </Campo>

        <p className={styles.nota}>
          📌 La vacante será procesada para verificación por nuestro equipo antes de publicarse.
        </p>

        <button type="submit" className={styles.btnPrimary} disabled={enviando}>
          {enviando ? (
            <><span className={styles.spinner} /> Enviando…</>
          ) : (
            <>Publicar Vacante <span>→</span></>
          )}
        </button>
      </form>
    </main>
  );
}