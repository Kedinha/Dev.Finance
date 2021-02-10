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

const Storage = {
    get() {
        // console.log(localStorage);
        return JSON.parse(localStorage.getItem("dev.finances:transations")) || []
    },

    set(transactions) {
        localStorage.setItem("dev.finances:transactions", 
        JSON.stringify(transactions))
    }
}


const Transaction = {
    all: Storage.get(),
    /* [
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
    ], */

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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        // console.log(transaction);
        tr.dataset.index = index

        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)

        const html = `        
        <td class="description">${transaction.description}</td>
        <td class="${CSSclass}">${amount}</td>
        <td class="date"${transaction.date}</td>
        <td>
            <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover Transação">
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
    formatAmount(value) {
        value = Number(value) * 100
        // console.log(value);
        return Math.round(value)
    },

    formatDate(date) {
        // console.log(date);
        const splittedDate = date.split("-") // split remove o argumento

        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },


    formatCurrency(value){
        // console.log(value);

    const signal = Number(value) < 0 ? "-": ""
    //     value = value.replace(/\,?\.?/g, "") * 100

    // value = String(value).replace(/\D/g, "") //corrigido na aula 4

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
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date} = Form.getValues()
        // console.log(Form.getValues());
        if (description.trim() === "" || //trim limpeza dos espaços vazios
            amount.trim() === "" ||
            date.trim() === "" ) {
            throw new Error ("Por favor, preencha todos os campos!")
        }    
    },

    formatValues() {
        let { description, amount, date} = Form.getValues()

        amount = Utils.formatAmount(amount)

        date = Utils.formatDate(date)

        // console.log(date);

        return {
            description,
            amount,
            date
        }
    },

    saveTransaction(transaction){
        Transaction.add(transaction)
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event) {
        // console.log(event);
        event.preventDefault()

        try {
        // verificar se todas as informações foram preenchidas
        Form.validateFields() //validar os campos
        //formatar os dados para salvar
        const transaction = Form.formatValues()
        //salvar
        Form.saveTransaction(transaction)
        //apagar os dados do formulário
        Form.clearFields()
        //modal feche
        Modal.close()
        //Atualizar a aplicação
        // App.reload() já existe o reload no add
        } catch (error) {
            alert(error.message)
        }
    }
}


// Storage.set("HEllo")
Storage.get()

const App = {
    init() { 
    Transaction.all.forEach((transaction, index) => {
        DOM.addTransaction(transaction, index)
    })
    DOM.updateBalance()

    Storage.set(Transaction.all)
    
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    },
}
App.init()

// Transaction.remove(0)

// DOM.addTransaction(transactions[0])
