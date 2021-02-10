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

//Eu preciso somar as entradas;
//Depois eu preciso somar as saídas e;
//Remover das entradas o valor das saídas;
//Assim eu terei o total

const Transaction = {
    all: [
        {
            
            description: 'Luz',
            amount: -50001,
            date: '23/01/2021',
        },
        {
            
            description: 'Website',
            amount: 500000,
            date: '23/01/2021',
        },
        {
            
            description: 'Internet',
            amount: -20012,
            date: '23/01/2021',
        },
        {
            
            description: 'App',
            amount: 200000,
            date: '23/01/2021',
        },
    ],

    add(transaction){
        Transaction.all.push(transaction)

        App.reload()
    },

     remove(index){
        Transaction.all.splice(index, 1)

        App.reload()
     },

    incomes(){
        //somar as entradas
        //pegar todas as transações
        let income = 0;
        //para cada transação,
        Transaction.all.forEach(transaction => {
            //ver se ela for > 0 
            if (transaction.amount > 0) {
                //somar a uma variavel e retornar a variavel
                income += transaction.amount;                
            }
            
        })
        return income;
    },
    expenses(){
        //somar as saídas
        let expense = 0;
        Transaction.all.forEach(transaction => {
            if (transaction.amount < 0 ) {
                //subtrair o valor e retornar
                expense += transaction.amount;
                
            }
        })
        return expense;
    },
    total(){
        return Transaction.incomes() + Transaction.expenses();       
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
    },

    updateBalance() {
        document
            .getElementById('incomeDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.incomes())
        document
            .getElementById('expenseDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.expenses())
        document
            .getElementById('totalDisplay')
            .innerHTML = Utils.formatCurrency(Transaction.total())
    },
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
}
const Utils = {
    formatCurrency(value){
        // console.log(value);

    const signal = Number(value) < 0 ? "-": ""

    value = String(value).replace(/\D/g, "") //corrigir na aula 4

    value = Number(value) / 100

    value = value.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues(){
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date:Form.date.value
        }
    },

    formatData(){
        console.log('Formatar os dados');
    },
    validateFields() {
        const { description, amount, date} = Form.getValues()
        // console.log(Form.getValues());
        if (description.trim() === "" || 
            amount.trim() == "" ||
            date.trim() === "" ) {
            throw new Error ("Por favor, preencha todos os campos")
        }
    
    },
    submit(event) {
        // console.log(event);
        event.preventDefault()
        // verificar se tadas as informações foram preenchidas
        Form.validateFields() //validar os campos
        //formatar os dados para salvar
        // Form.formatData()
        //salvar
        //apagar os dados do formulário
        //modal feche
        //Atualizar a aplicação
    }
}

const App = {
    init() { Transaction.all.forEach(transaction => {
        DOM.addTransaction(transaction)
    })
    DOM.updateBalance()
    
    },
    reload() {
        DOM.clearTransactions()
        App.init()
    },
}
App.init()

// Transaction.remove(0)

// DOM.addTransaction(transactions[0])
