# Script para corrigir build Next.js + TypeScript
Write-Host "1?? Limpando node_modules, package-lock.json e .next"
Remove-Item -Recurse -Force node_modules, package-lock.json, .next

Write-Host "2?? Instalando dependências..."
npm install

Write-Host "3?? Corrigindo ESLint automaticamente..."
npx eslint src --fix

Write-Host "4?? Corrigindo Prisma e tipos automaticamente..."

# Criar src/lib/prisma.ts com export default prisma
$prismaFile = "src/lib/prisma.ts"
if (!(Test-Path $prismaFile)) {
    New-Item -Path $prismaFile -ItemType File -Force
}
@"
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export default prisma;
"@ | Set-Content $prismaFile

# Substituir any[] e useState<any> por tipos corretos
Get-ChildItem -Path src -Recurse -Include *.tsx,*.ts | ForEach-Object {
    (Get-Content $_.FullName) |
    ForEach-Object {
        $_ -replace 'useState<any>\(\[\]\)', 'useState<Produto[]>([])' `
           -replace 'carrinho: any\[\]', 'carrinho: Produto[]' `
           -replace 'vendas: any\[\]', 'vendas: Venda[]'
    } | Set-Content $_.FullName
}

Write-Host "5?? Corrigindo rotas de API do Prisma..."

# dashboard/route.ts
$dashboardRoute = "src/app/api/dashboard/route.ts"
if (Test-Path $dashboardRoute) {
@"
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const vendas = await prisma.venda.findMany({
            include: { itemvenda: { include: { produto: true } } },
            orderBy: { data: 'desc' },
        });
        return NextResponse.json(vendas);
    } catch (error) {
        return NextResponse.json({ error: 'Erro ao buscar vendas' }, { status: 500 });
    }
}
"@ | Set-Content $dashboardRoute
}

# produtos/route.ts
$produtosRoute = "src/app/api/produtos/route.ts"
if (Test-Path $produtosRoute) {
@"
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const codigo = searchParams.get('codigo') || '';

    try {
        const produto = await prisma.produto.findFirst({
            where: { codigoBarra: codigo }
        });
        return NextResponse.json(produto);
    } catch (error) {
        return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }
}
"@ | Set-Content $produtosRoute
}

Write-Host "6?? Rodando checagem TypeScript..."
npx tsc --noEmit

Write-Host "? Script finalizado. Agora tente rodar: npm run build"