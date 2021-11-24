CREATE TABLE IF NOT EXISTS asistencia(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    asignatura TEXT,
    seccion TEXT,
    sesion TEXT);

INSERT INTO asistencia
    ( asignatura, seccion, sesion) VALUES 
    ('Ingles Avanzado','008V','12 Noviembre');

INSERT INTO asistencia
    ( asignatura, seccion, sesion ) VALUES
    ('Arquitectura','002V','08 Noviembre');
