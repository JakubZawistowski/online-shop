import jwt from 'jsonwebtoken';
import ENV from '../config.js'
export default async function Auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token);
        if (!token) {
            return res.status(401).json({ error: "Token not provided" });
        }

        const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

        // Sprawdzanie czy użytkownik jest autoryzowany
        if (!decodedToken) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = decodedToken; // Przypisanie zdekodowanych danych użytkownika do obiektu req

        next(); // Przekazanie kontroli do następnego middleware
    } catch (error) {
        console.error('Error during token verification:', error);
        res.status(401).json({ error: "Authentication Failed" });
    }
}

export function localVariables(req, res, next){
    req.app.locals = {
        OTP : null,
        resetSession : false
    }
    next()
}