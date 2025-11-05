CREATE DATABASE dbservices;

CREATE TABLE enlaces (
    id SERIAL PRIMARY KEY,
    original VARCHAR(255) not null,
    arcortado VARCHAR(255) not null,
    codigo VARCHAR(255) not null,
    fuente VARCHAR(255),
    estado boolean,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE peticiones (
  id SERIAL PRIMARY KEY,
  ruta VARCHAR(255) NOT NULL,
  metodo VARCHAR(10) NOT NULL,
  ip_address VARCHAR(50),
  agente VARCHAR(255),
  estado boolean DEFAULT true,
  fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- example of insert
INSERT INTO enlaces(original,codigo,arcortado,fuente,estado)
VALUES
('https://www.facebook.com/fcpn.umsa','123','FCPN.EDU.BO/E/123','facebook',true),
('https://www.iadb.org/es/como-trabajar-juntos/estudiantes-y-recien-graduados','ABC','FCPN.EDU.BO/E/ABC','yahoo',true);

INSERT INTO peticiones(ruta,metodo,ip_address,agente)
VALUES('/','GET','192.168.0.11','MI PC');