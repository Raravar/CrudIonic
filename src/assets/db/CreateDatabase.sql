CREATE TABLE IF NOT EXISTS contacto(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    nombre TEXT,
    apellidos TEXT,
    domicilio INTEGER,
    email TEXT,
    fono TEXT);

    
INSERT INTO contacto
    ( nombre, apellidos, domicilio, email,fono) VALUES 
    ('Juan','Perez Muñoz','Calle Siempre Viva 234','jpm@gmail.com','+56912345678');
INSERT INTO contacto
    ( nombre, apellidos, domicilio, email,fono) VALUES 
    ('Ana','Silva Aguilera','Calle Larga #123','anaSilva.a@gmail.com','+56987654321');