const Modal = {
    open(){
        // Abrir modal
        // Adicionar a class active ao modal 
        // alert('Abrir o model') 
        document
        .querySelector('.modal-overlay')
        .classList
        .add('active')

    },
    close(){
        // fechar o modal
        // remover a class active do modal
        document
        .querySelector('.modal-overlay')
        .classList
        .remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -50001,
        date: '23/01/2021',
    },
    {
        id: 2,
        description: 'Website',
        amount: 50000,
        date: '23/01/2021',
    },
    {
        id: 3,
        description: 'Internet',
        amount: -20012,
        date: '23/01/2021',
    },
    {
        id: 4,
        description: 'App',
        amount: 20000,
        date: '23/01/2021',
    },
]

//Eu preciso somar as entradas;
//Depois eu preciso somar as saídas e;
//Remover das entradas o valor das saídas;
//Assim eu terei o total

const Transaction = {
    incomes(){
        //somar as entradas
    },
    expenses(){
        //somar as saídas
    },
    total(){
        //entradas - saídas
    }
}

//Eu preciso pegar as minhas transações do 
//ou seja substituir os dados HTML com os dados JS
//meu objeto do javascript
//E colocar lá no HTML

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        // console.log(transaction);

        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)
        // console.log(transaction);

        DOM.transactionsContainer.appendChild(tr)
    },
    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)


        const html = `        
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date"${transaction.date}</td>
        <td>
            <img src="./assets/minus.svg" alt="Remover Transação">
        </td>              
        `
        return html
    }
}
const Utils = {
    formatCurrency(value){
        // console.log(value);

    const signal = Number(value) < 0 ? "-": ""

    value = String(value).replace(/\D/g, "")

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return signal + value

    }
}


DOM.addTransaction(transactions[0])

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})