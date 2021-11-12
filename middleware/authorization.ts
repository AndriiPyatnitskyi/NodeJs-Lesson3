import {Request, Response} from 'express';


// middleware for doing role-based permissions
export default function permit(...permittedRoles: [String]) {
    // return a middleware
    return (req: Request, res: Response, next: any) => {
        //
        // if (typeof(req.body?.token) == 'undefined') {
        //     return res.status(403).send("A token is required for authentication");
        // }
        //
        // const token = req.body?.token || req.query.token || req.headers["x-access-token"];
        //
        // if (!token) {
        //     return res.status(403).send("A token is required for authentication");
        // }
        //
        // try {
        //     req.user = jwt.verify(token, secretKey);
        // } catch (err) {
        //     console.log(err);
        //     return res.status(401).send("Invalid Token");
        // }
        // return next();
        //

        // const { user } = request
        //
        // if (user && permittedRoles.includes(user.role)) {
        //     next(); // role is allowed, so continue on the next middleware
        // } else {
        //     response.status(403).json({message: "Forbidden"}); // user is forbidden
        // }
    }
}
