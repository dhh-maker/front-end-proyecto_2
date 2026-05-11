/*export default function Postulaciones(){
    return(<>Aqui van a ver muchas muchas postulaciones yo creo</>)
}*/
//AQUI ENLAZAMOS CON VACANTES, UNA VEZ Q SE RELACIONE CON LA BASE DE DATOS
'use client';
import styles from './Postulaciones.module.css';

type EstadoPostulacion =
  | 'Enviada'
  | 'Leída'
  | 'Revisada'
  | 'En proceso'
  | 'Aceptada'
  | 'Rechazada';

interface Postulacion {
  id: number;
  titulo: string;
  institucion: string;
  fechaEnvio: string;
  modalidad: string;
  duracion: string;
  estado: EstadoPostulacion;
}
// AQUÍ SE OBTENDRÁN LAS POSTULACIONES DESDE SUPABASE (fetch a Supabase)---------------------------------------------------------------------------------
// algo asi: const { data } = await supabase
//   .from('postulaciones')
//   .select('*')
//   .eq('usuario_id', session.user.id)
// ─────────────────────────────────────────────
const MOCK_POSTULACIONES: Postulacion[] = [
  {
    id: 1,
    titulo: 'Análisis de Datos en Instituto de Investigaciones Biomédicas',
    institucion: 'Instituto de Investigaciones Biomédicas, UNAM',
    fechaEnvio: '9 de febrero de 2024',
    modalidad: 'Presencial',
    duracion: '6 meses',
    estado: 'Revisada',
  },
  {
    id: 2,
    titulo: 'Administración de Bases de Datos en Biblioteca Central',
    institucion: 'Biblioteca Central, UNAM',
    fechaEnvio: '7 de febrero de 2024',
    modalidad: 'Híbrida',
    duracion: '6 meses',
    estado: 'Aceptada',
  },
  {
    id: 3,
    titulo: 'Desarrollo de Sistema Web para Coordinación Escolar',
    institucion: 'FES Acatlán, UNAM',
    fechaEnvio: '1 de febrero de 2024',
    modalidad: 'Remoto',
    duracion: '12 meses',
    estado: 'En proceso',
  },
  {
    id: 4,
    titulo: 'Soporte Técnico y Redes — Dirección de Cómputo',
    institucion: 'Dirección General de Cómputo, UNAM',
    fechaEnvio: '25 de enero de 2024',
    modalidad: 'Presencial',
    duracion: '6 meses',
    estado: 'Enviada',
  },
  {
    id: 5,
    titulo: 'Análisis Estadístico para Proyecto de Epidemiología',
    institucion: 'Facultad de Medicina, UNAM',
    fechaEnvio: '18 de enero de 2024',
    modalidad: 'Remoto',
    duracion: '6 meses',
    estado: 'Rechazada',
  },
];
//iconos
const ESTADO_META: Record<
  EstadoPostulacion,
  { clase: string; icono: string }
> = {
  Enviada:    { clase: styles.badgeEnviada,   icono: '📤' },
  Leída:      { clase: styles.badgeLeida,     icono: '👁️' },
  Revisada:   { clase: styles.badgeRevisada,  icono: '🔍' },
  'En proceso': { clase: styles.badgeProceso, icono: '⚙️' },
  Aceptada:   { clase: styles.badgeAceptada,  icono: '✅' },
  Rechazada:  { clase: styles.badgeRechazada, icono: '❌' },
};

function Badge({ estado }: { estado: EstadoPostulacion }) {
  const { clase, icono } = ESTADO_META[estado];
  return (
    <span className={`${styles.badge} ${clase}`}>
      <span className={styles.badgeIcon}>{icono}</span>
      {estado}
    </span>
  );
}
//card postulacion
function CardPostulacion({ post }: { post: Postulacion }) {
  function handleVerVacante() {
    // AQUÍ IRÁ LA REDIRECCIÓN A LA VACANTE
    // Ejemplo: router.push(`/Vacantes/${post.id}`)
    console.log('Redirigir a vacante:', post.id);
  }

  return (
    <article className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitleGroup}>
          <h3 className={styles.cardTitulo}>{post.titulo}</h3>
          <p className={styles.cardInstitucion}>
            <span className={styles.iconSmall}>🏛️</span>
            {post.institucion}
          </p>
        </div>
        <Badge estado={post.estado} />
      </div>

      <div className={styles.cardMeta}>
        <span className={styles.metaItem}>
          <span className={styles.iconSmall}>📅</span>
          Postulado el {post.fechaEnvio}
        </span>
        <span className={styles.metaDivider} aria-hidden="true" />
        <span className={styles.metaItem}>
          <span className={styles.iconSmall}>🗂️</span>
          {post.modalidad}
        </span>
        <span className={styles.metaDivider} aria-hidden="true" />
        <span className={styles.metaItem}>
          <span className={styles.iconSmall}>⏱️</span>
          {post.duracion}
        </span>
      </div>

      {/* AQUÍ SE AGREGARÁN LOS COMENTARIOS DE LA INSTITUCIÓN DESDE SUPABASE */}
      {/* Ejemplo: post.comentario && <p className={styles.comentario}>{post.comentario}</p> */}

      <div className={styles.cardFooter}>
        {/* AQUÍ IRÁ LA REDIRECCIÓN A LA VACANTE */}
        <button className={styles.btnVerVacante} onClick={handleVerVacante}>
          Ver vacante
          <span className={styles.btnArrow}>→</span>
        </button>
      </div>
    </article>
  );
}

//principal
export default function MisPostulaciones() {
  // AQUÍ SE OBTENDRÁN LAS POSTULACIONES DESDE SUPABASE------------------------------------
  const postulaciones = MOCK_POSTULACIONES;

  return (
    <main className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Mis Postulaciones</h1>
          <p className={styles.pageSubtitle}>
            Seguimiento de tus solicitudes de servicio social
          </p>
        </div>
        <span className={styles.countBadge}>
          {postulaciones.length} postulacion{postulaciones.length !== 1 ? 'es' : ''}
        </span>
      </div>

      {postulaciones.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>📭</span>
          <p className={styles.emptyTitle}>Aún no tienes postulaciones</p>
          <p className={styles.emptySub}>
            Explora las vacantes disponibles y postúlate a las que te interesen.
          </p>
        </div>
      ) : (
        <div className={styles.list}>
          {postulaciones.map((post) => (
            <CardPostulacion key={post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
