const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();

async function crearUser(data) {
    return await prisma.usuario.create({
        data:{
            email:data.email, 
            password:data.password
        }
        })
}

async function obtenerPorEmail(email) {
    return await prisma.usuario.findUnique({where: {email}})
}
module.exports = {
    crearUser,
    obtenerPorEmail
}