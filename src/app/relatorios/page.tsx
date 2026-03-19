'use client';

import React from 'react';

// Exemplo de interface para as vendas/relatórios
interface Venda {
  id: number;
  data: string;
  cliente: string;
  total: number;
  metodoPagamento: string;
}

export default function RelatoriosPage() {
  // Simulando seus dados (isso viria do seu banco/API ou Context)
  const vendas: Venda[] = [
    { id: 1, data: '2026-03-18', cliente: 'Consumidor Final', total: 55.0, metodoPagamento: 'Crédito' },
    { id: 2, data: '2026-03-18', cliente: 'Tiago', total: 12.5, metodoPagamento: 'Pix' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Relatórios de Vendas</h1>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="w-full text-left bg-white">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">ID</th>
              <th className="p-4">Data</th>
              <th className="p-4">Cliente</th>
              <th className="p-4">Total</th>
              <th className="p-4">Pagamento</th>
            </tr>
          </thead>
          <tbody>
            {vendas.map((venda) => (
              /* A correção principal está aqui: key={venda.id} */
              <tr
                key={venda.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="p-4">#{venda.id}</td>
                <td className="p-4">{new Date(venda.data).toLocaleDateString('pt-BR')}</td>
                <td className="p-4">{venda.cliente}</td>
                <td className="p-4">R$ {venda.total.toFixed(2)}</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {venda.metodoPagamento}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {vendas.length === 0 && (
        <p className="mt-4 text-center text-gray-500">Nenhuma venda encontrada.</p>
      )}
    </div>
  );
}
