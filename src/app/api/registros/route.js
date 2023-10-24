import { NextResponse } from "next/server"
import { prisma } from "@/libs/prisma";

export async function GET(){
    try {
        const corredor = await prisma.racers.findMany()
        return NextResponse.json(corredor)
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({mensaje: error.message}, {status: 500})  
        }      
    }
}

export async function POST(request){
    try {
        const {nombre, edad, genero, clase}= await request.json()
        const nuevoCorredor = await prisma.racers.create({
        data: {
            nombre,
            edad,
            genero,
            clase
        }
    })
    return NextResponse.json(nuevoCorredor)
    } catch (error) {
        if(error instanceof Error){
            return NextResponse.json({mensaje: error.message}, {status: 500})  
        } 
    }
}