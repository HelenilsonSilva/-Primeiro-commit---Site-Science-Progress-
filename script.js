// Estado global da aplicação
let currentProduct = { name: '', price: '', image: '' };
let cart = [];

function openProduct(name, price, imageUrl) {
    currentProduct = { name, price, image: imageUrl };
    document.getElementById('detail-title').innerText = name;
    document.getElementById('detail-price').innerText = price;
    document.getElementById('detail-img').src = imageUrl;
    navigateTo('details');
}

// Função para alternar entre as páginas de forma fluida
function navigateTo(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Abre a página de detalhes populando as informações do produto selecionado
function openProduct(name, price) {
    currentProduct = { name, price };
    document.getElementById('detail-title').innerText = name;
    document.getElementById('detail-price').innerText = price;
    document.getElementById('detail-img-text').innerText = name;
    navigateTo('details');
}

// Adiciona o produto atual ao carrinho de compras
function addToCart() {
    cart.push({ ...currentProduct });
    updateCartUI();
    navigateTo('cart');
}

// Atualiza a interface do carrinho (quantidade no badge, itens e valor total)
function updateCartUI() {
    const countElem = document.getElementById('cart-count');
    const listElem = document.getElementById('cart-items-list');
    const summaryElem = document.getElementById('cart-summary-section');
    const totalText = document.getElementById('cart-total-text');

    countElem.innerText = cart.length;

    if (cart.length === 0) {
        listElem.innerHTML = '<p style="color: var(--gray-medium);">Seu carrinho está vazio.</p>';
        summaryElem.style.display = 'none';
    } else {
        let html = '';
        let total = 0;
        
        cart.forEach((item, index) => {
            // Converte a string de preço (ex: "R$ 1.890,00") para formato numérico de cálculo
            let numericPrice = parseFloat(
                item.price.replace('R$ ', '').replace('.', '').replace(',', '.')
            );
            total += numericPrice;

            html += `
                <div class="cart-item">
                    <div>
                        <strong style="font-size: 1.05rem;">${item.name}</strong>
                        <div style="color: var(--primary); font-weight: 600; font-size: 0.95rem; margin-top: 4px;">${item.price}</div>
                    </div>
                    <button style="background: none; border: none; color: #dc3545; cursor: pointer; font-weight: 600; font-size: 0.9rem; padding: 0.5rem;" onclick="removeFromCart(${index})">Remover</button>
                </div>
            `;
        });

        listElem.innerHTML = html;
        summaryElem.style.display = 'block';
        totalText.innerText = `Total: R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
}

// Remove um item específico do carrinho pelo índice
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}
