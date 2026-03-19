export interface Produto {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
}

export const produtos: Produto[] = [
    {
        id: 1,
        nome: "Café Expresso",
        preco: 5,
        imagem: "/images/cafe.jpg"
    },
    {
        id: 2,
        nome: "Pão de Queijo",
        preco: 3.5,
        imagem: "/images/pao.jpg"
    },
    {
        id: 3,
        nome: "Croissant",
        preco: 7,
        imagem: "/images/croissant.jpg"
    },
    {
        id: 4,
        nome: "Suco de Laranja",
        preco: 8,
        imagem: "/images/suco.jpg"
    }
];