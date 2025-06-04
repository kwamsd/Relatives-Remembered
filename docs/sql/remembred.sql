CREATE DATABASE remembered_db;
\c remembered_db;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    lastname VARCHAR(100) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    mail VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    mobilephone VARCHAR(20),
    username VARCHAR(100) UNIQUE NOT NULL
);

-- Table: admins (droits spéciaux)
CREATE TABLE admins (
    id SERIAL PRIMARY KEY,
    mail VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- Table: templates (profils de défunts créés par un user)
CREATE TABLE templates (
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
    description TEXT,
    image_url TEXT,
    date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    validated BOOLEAN DEFAULT FALSE
);

-- Table: backgrounds (choix de background + couleurs)
CREATE TABLE backgrounds (
    id SERIAL PRIMARY KEY,
    id_template INTEGER REFERENCES templates(id) ON DELETE CASCADE,
    id_user INTEGER REFERENCES users(id) ON DELETE SET NULL,
    background_url TEXT,
    color_main VARCHAR(7) NOT NULL, --100%
    color_overlay VARCHAR(7) NOT NULL --38% pour les borders
);

-- Table: anecdotes (visiteurs + approval)
CREATE TABLE anecdotes (
    id SERIAL PRIMARY KEY,
    id_template INTEGER REFERENCES templates(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    is_approved BOOLEAN DEFAULT FALSE,
    submitter_name VARCHAR(100),
    date_submitted TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table: donations (soutiens financiers facultatifs)
CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    id_template INTEGER REFERENCES templates(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    donor_name VARCHAR(255),
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);