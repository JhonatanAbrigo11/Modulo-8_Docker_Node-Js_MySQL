const {PrismaClient} = require("@prisma/client")
const prisma = new PrismaClient();

async function getTareas(usuarioId) {
    return await prisma.tarea.findMany({
        where: {
            usuarioId:usuarioId
        }
    });
}

async function deleteTarea(id) {
    const tareaId = parseInt(id, 10);

    const tarea = await prisma.tarea.findUnique({
        where: { id: tareaId }
    });

    if (!tarea) {
        throw new Error(`La tarea con id ${tareaId} no existe`);
    }

    return await prisma.tarea.delete({
        where: { id: tareaId }
    });
}



async function createTarea(data,usuarioId) {
    return prisma.tarea.create({
        data:{
             ...data,
             usuarioId:usuarioId
        }
    })
}
module.exports =  {
    getTareas,
    deleteTarea,
    createTarea
}