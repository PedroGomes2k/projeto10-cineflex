// preço de cada ingresso (a API não tem preço, então fica fixo aqui)
export const PRICE = 20

export function formatPrice(value) {
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}
