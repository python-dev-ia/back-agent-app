import { Router, Request, Response } from 'express';
import { createUser, validateUser } from '../models/User';
import jwt from 'jsonwebtoken';

const router = Router();

// Registrar usuario
router.post('/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Validación básica
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Validar longitud de contraseña
    if (password.length < 6) {
      return res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' });
    }

    try {
      // Crear usuario
      const user = await createUser({ name, email, password });

      if (!user) {
        return res.status(409).json({ error: 'El email ya está registrado' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '30d' }
      );

      res.status(201).json({
        message: 'Usuario creado exitosamente',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (dbError) {
      console.error('Error de conexión a MongoDB:', dbError);
      return res.status(503).json({ error: 'Servicio no disponible. Verifica que MongoDB esté corriendo.' });
    }
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Login
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    try {
      // Validar credenciales
      const user = await validateUser(email, password);

      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generar token JWT
      const token = jwt.sign(
        { id: user._id, email: user.email, name: user.name },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '30d' }
      );

      res.json({
        message: 'Login exitoso',
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (dbError) {
      console.error('Error de conexión a MongoDB:', dbError);
      return res.status(503).json({ error: 'Servicio no disponible. Verifica que MongoDB esté corriendo.' });
    }
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

export default router;

