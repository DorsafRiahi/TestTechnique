const User = require('../models/User');

// GET /api/users  Récupérer tous les utilisateurs
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/users/:id  Récupérer un utilisateur par ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Utilisateur introuvable' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/users Créer un nouvel utilisateur
exports.addUser = async (req, res) => {
  const { name, email, phone, avatar } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Tous les champs (name, email, phone) sont requis.' });
  }
  try {
    const newUser = await User.create({ name, email, phone, avatar });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/users/:id  Modifier un utilisateur existant
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, avatar } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/users/:id  Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé.' });

    await user.destroy();

    res.json({ message: 'Utilisateur supprimé avec succès.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
