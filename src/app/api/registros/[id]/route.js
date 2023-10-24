import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

//GET REQUEST
export async function GET (request, {params: {id}}){
    try {
        const corredor = await prisma.racers.findFirst({
            where: {
                id: Number(id)
            }
        })
        if(!corredor){
            return NextResponse.json({mensaje: 'El corredor no existe'},{status: 404})
        }
        return NextResponse.json(corredor)
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({mensaje: error.message}, {status: 500})  
        } 
    }
}

//DELETE REQUEST
export async function DELETE(request, { params: { id } }) {
    try {
        // Verifica si el corredor existe
        const corredor = await prisma.racers.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (!corredor) {
            return NextResponse.json({ mensaje: 'El corredor no existe' }, { status: 404 });
        }

        // Elimina el corredor
        await prisma.racers.delete({
            where: {
                id: Number(id)
            }
        });

        return NextResponse.json({ mensaje: 'Corredor eliminado' });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ mensaje: error.message }, { status: 500 });
        }
    }
}

//PUT REQUEST
export async function PUT(request, {params: {id}}) {
    try {
        // Verifica si el corredor existe
        const corredor = await prisma.racers.findFirst({
            where: {
                id: Number(id)
            }
        });

        if (!corredor) {
            return NextResponse.json({ mensaje: 'El corredor no existe' }, { status: 404 });
        }

        const {nombre, edad, genero, clase}= await request.json()
        // Actualiza los datos del corredor (Debes proporcionar los datos actualizados en el cuerpo de la solicitud)
        const updatedCorredor = await prisma.racers.update({
            where: {
                id: Number(id)
            },
            data: {
                nombre,
                edad,
                genero,
                clase
            }
        });

        return NextResponse.json(updatedCorredor);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ mensaje: error.message }, { status: 500 });
        }
    }
}
