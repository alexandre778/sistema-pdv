// src/utils/iaSugestao.ts
interface SugestaoInput {
  texto: string
  contexto?: string
}

interface SugestaoOutput {
  resposta: string
  confianca?: number
}

export async function gerarSugestao(dados: SugestaoInput): Promise<SugestaoOutput> {
  // Simulação de chamada de IA
  const resposta: SugestaoOutput = {
    resposta: `Sugestão gerada para: ${dados.texto}`,
    confianca: 0.95,
  }
  return resposta
}