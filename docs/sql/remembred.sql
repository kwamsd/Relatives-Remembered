CREATE DATABASE remembered_db;
\c remembered_db;

-- Table: users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    mobilephone VARCHAR(20),
    username VARCHAR(100) UNIQUE NOT NULL
);

-- Table: admin
CREATE TABLE admin (
    id SERIAL PRIMARY KEY,
    mail VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Table: template (deceased person)
CREATE TABLE template (
    id SERIAL PRIMARY KEY,
    id_user INTEGER REFERENCES users(id) ON DELETE SET NULL,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    second_name VARCHAR(100),
    third_name VARCHAR(100),
    birth DATE,
    death DATE,
    job VARCHAR(100),
    nationality VARCHAR(100),
    gender VARCHAR(50),
    anecdote TEXT,
    image_url TEXT,
    description TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    validated BOOLEAN DEFAULT FALSE
);

-- Table: background
CREATE TABLE background (
    id SERIAL PRIMARY KEY,
    id_template INTEGER REFERENCES template(id) ON DELETE CASCADE,
    id_user INTEGER REFERENCES users(id) ON DELETE SET NULL,
    background_url TEXT,
    color_main VARCHAR(7) NOT NULL, -- HEX code, e.g., #FF5733
    color_overlay VARCHAR(7) NOT NULL
);

-- Table: anecdote
CREATE TABLE anecdote (
    id SERIAL PRIMARY KEY,
    id_template INTEGER REFERENCES template(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    email_submitted VARCHAR(255),
    date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: donation (optionnelle si la page donation est active)
CREATE TABLE donation (
    id SERIAL PRIMARY KEY,
    id_template INTEGER REFERENCES template(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    donor_name VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
