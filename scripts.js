/**
 * @file script.js
 * @description Implementação de uma lista de compras interativa com persistência local.
 */

/**
 * Elemento do formulário para adicionar novos itens.
 * @type {HTMLFormElement}
 */
const form = document.getElementById('form-add-item');

/**
 * Campo de entrada para novos itens.
 * @type {HTMLInputElement}
 */
const input = document.getElementById('input-new-item');

/**
 * Elemento da lista onde os itens serão exibidos.
 * @type {HTMLUListElement}
 */
const listItems = document.getElementById('item-list');

/**
 * Array que armazena os itens da lista de compras.
 * @type {string[]}
 */
let itens = JSON.parse(localStorage.getItem('itens')) || [];

/**
 * Renderiza os itens da lista de compras na interface do usuário.
 * Limpa a lista atual e cria elementos para cada item no array 'itens'.
 * @function
 */
function renderItems() {
    listItems.innerHTML = '';
    itens.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'item';
        li.innerHTML = `
            <span>${item}</span>
            <button onclick="removeItem(${index})">&#x1F5D1;</button>
        `;
        listItems.appendChild(li);
    });
}

/**
 * Adiciona um novo item à lista de compras.
 * @function
 * @param {Event} e - O evento de submit do formulário. (submit)
 */
function addItem(e) {
    e.preventDefault();
    const newItem = input.value.trim();
    if (newItem) {
        itens.push(newItem);
        localStorage.setItem('itens', JSON.stringify(itens));
        input.value = '';
        renderItems();
    }
}

/**
 * Remove um item da lista de compras.
 * @function
 * @param {number} index - O índice do item a ser removido.
 */
function removeItem(index) {
    itens.splice(index, 1);
    localStorage.setItem('itens', JSON.stringify(itens));
    renderItems();
}

// Adiciona um ouvinte de evento para o envio do formulário
form.addEventListener('submit', addItem);

// Renderiza os itens iniciais
renderItems();
