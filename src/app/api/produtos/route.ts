import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

// Função auxiliar para extrair ID da URL
function getIdFromUrl(request: Request): number | null {
  const url = new URL(request.url)
  const idStr = url.pathname.split("/").pop()
  const id = Number(idStr)
  return isNaN(id) ? null : id
}

/** GET /api/produtos */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const searchParams = url.searchParams

    const codigo = searchParams.get("codigo")
    const nome = searchParams.get("nome")

    // 🔎 BUSCAR POR CÓDIGO DE BARRAS (PDV)
    if (codigo) {
      const produto = await prisma.produto.findUnique({
        where: { codigoBarra: codigo }
      })

      return NextResponse.json(produto)
    }

    // 🔎 BUSCAR POR NOME
    if (nome) {
      const produto = await prisma.produto.findFirst({
        where: {
          nome: {
            contains: nome
          }
        }
      })

      return NextResponse.json(produto)
    }

    // 🔎 BUSCAR POR ID
    const id = getIdFromUrl(request)

    if (id !== null) {
      const produto = await prisma.produto.findUnique({
        where: { id }
      })

      if (!produto) {
        return NextResponse.json(
          { error: "Produto não encontrado" },
          { status: 404 }
        )
      }

      return NextResponse.json(produto)
    }

    // 📦 LISTAR TODOS
    const produtos = await prisma.produto.findMany({
      orderBy: { nome: "asc" }
    })

    return NextResponse.json(produtos)

  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Erro ao buscar produtos" },
      { status: 500 }
    )
  }
}
