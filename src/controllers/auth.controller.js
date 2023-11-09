import { Router } from 'express'
import passport from 'passport'
const router = Router();
import {localAuthService} from '../services/local-auth-service'

router.get('/login', (req, res) => {
    res.render('login');
});

//
router.post('/login', passport.authenticate('local'), {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
});



// Ruta para mostrar el formulario de registro
router.get('/register', (req, res) => {
    res.render('register'); // Aquí renderiza una vista de registro
});

// Ruta para procesar la solicitud de registro
router.post('/register', (req, res) => {
    const {
        username,
        password
    } = req.body;

    // Utiliza el servicio de autenticación local para registrar al usuario
    localAuthService.registerUser(username, password)
        .then(() => {
            res.redirect('/login');
        })
        .catch((err) => {
            // Maneja errores de registro
            res.render('register', {
                error: err.message
            });
        });
});

// Ruta para cerrar sesión
router.get('/logout', (req, res) => {
    req.logout(); // Passport agrega el método logout a la solicitud
    res.redirect('/');
});

module.exports = router;