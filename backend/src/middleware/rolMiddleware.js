function autorizarRoles(...rolesPermitidos){
    return (req,res,next) =>{
        const usuario = req.usuario;
        if(!usuario) return res.status(401).json({message:"Uusuario no autenticado"})
        if(!rolesPermitidos.includes(usuario.rol)) return res.status(403).json({message:"Usuario no autorizado"})


        next();
    }
}



module.exports = {
    autorizarRoles
}
