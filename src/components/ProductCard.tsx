import Image from 'next/image';
import { useCart, Product } from '../context/CartContext';

interface ProductCardProps {
  produto: Product;
}

export default function ProductCard({ produto }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow bg-white">
      {/* Container da Imagem com Next.js Image para melhor performance */}
      <div className="relative w-full h-48 mb-4 overflow-hidden rounded-md bg-gray-100">
        <Image
          src={produto.image}
          alt={produto.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={produto.id === 1} // Prioriza o carregamento do primeiro item
        />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-800">
          {produto.name}
        </h3>

        <p className="text-xl font-bold text-green-600">
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(produto.price)}
        </p>

        <button
          onClick={() => addToCart(produto)}
          className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors w-full"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}
