const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  createUser,
  getUserByEmail,
  getUserByUsername,
  getUserById
} = require('../models/userModel');

exports.getProfile = async (req, res) => {
  try {
    const user = await getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'Utilisateur introuvable' });
    // Ne renvoyez pas le password
    delete user.password;
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { lastname, firstname, mail, password, mobilephone, username } = req.body;

  try {
    // 1) Vérification email
    if (await getUserByEmail(mail)) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // 2) Vérification username
    if (await getUserByUsername(username)) {
      return res.status(400).json({ error: "Ce nom d'utilisateur existe déjà." });
    }

    // 3) Hash du mot de passe et création
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      lastname,
      firstname,
      mail,
      password: hashedPassword,
      mobilephone,
      username
    });

    res.status(201).json({
      message: 'Utilisateur créé',
      user: { id: newUser.id, mail: newUser.mail }
    });
  } catch (error) {
    // 4) En option, gestion des erreurs de contrainte unique
    if (error.code === '23505') {
      // NB : adapter selon le nom exact de la contrainte en base
      if (error.constraint === 'users_mail_key') {
        return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
      }
      if (error.constraint === 'users_username_key') {
        return res.status(400).json({ error: "Ce nom d'utilisateur existe déjà." });
      }
    }
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.loginUser = async (req, res) => {
  // 1) Validation des champs
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { mail, password } = req.body;

  try {
    // 2) Récupérer l'utilisateur par e-mail
    const user = await getUserByEmail(mail);
    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    // 3) Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // 4) Générer le JWT
    const token = jwt.sign(
      { userId: user.id, mail: user.mail },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    // 5) Stocker le token dans un cookie HTTP-Only
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 // expire dans 24h
    });

    // 6) On renvoie juste un message de succès
    return res.json({ message: 'Connecté' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erreur serveur' });
  }
};

exports.logoutUser = (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    .json({ message: 'Déconnecté' });
};
