// Classe que representa uma conta bancária genérica
class BankAccount {
    constructor(balance) {
        this.balance = balance; // Saldo da conta
    }

    // Método para saque
    withdraw(amount) {
        if (amount <= this.balance) {
            this.balance -= amount; // Desconta o valor do saldo
            return this.balance; // Retorna o novo saldo
        } else {
            throw new Error("Saldo insuficiente para o saque.");
        }
    }

    // Método para depósito
    deposit(amount) {
        this.balance += amount; // Adiciona o valor ao saldo
        return this.balance; // Retorna o novo saldo
    }
}
// Classe que representa uma conta poupança, estendendo BankAccount
class SavingsBankAccount extends BankAccount {
    constructor(balance, minimumBalance) {
        super(balance); // Chama o construtor da classe pai
        this.minimumBalance = minimumBalance; // Valor mínimo da conta
    }

    // Método para saque com verificação do saldo mínimo
    withdraw(amount) {
        if (this.balance - amount >= this.minimumBalance) {
            super.withdraw(amount); // Chama o método de saque da classe pai
            return this.balance; // Retorna o novo saldo
        } else {
            throw new Error("Saldo insuficiente considerando o valor mínimo da conta.");
        }
    }
}

// Classe que representa uma conta rentável, estendendo BankAccount
class ProfitableBankAccount extends BankAccount {
    constructor(balance) {
        super(balance); // Chama o construtor da classe pai
    }

    // Método para depósito com bonificação e comissão
    deposit(amount) {
        const bonus = amount * 0.01; // Bonificação de 1%
        super.deposit(amount + bonus - 3); // Adiciona valor bonificado descontando a comissão
        return this.balance; // Retorna o novo saldo
    }

    // Método para saque com taxa
    withdraw(amount) {
        super.withdraw(amount + 0.5); // Desconta o saque mais a taxa
        return this.balance; // Retorna o novo saldo
    }
}
// Classe que representa um cliente do banco
class Client {
    constructor(name) {
        this.name = name; // Nome do cliente
        this.accounts = []; // Contas do cliente
    }

    // Método para adicionar uma conta ao cliente
    addAccount(account) {
        if (account instanceof SavingsBankAccount || account instanceof ProfitableBankAccount) {
            this.accounts.push(account); // Adiciona a conta à lista de contas do cliente
        } else {
            throw new Error("Somente contas poupança ou rentáveis são permitidas.");
        }
    }
}

// Criando uma instância de BankAccount
let generalAccount = new BankAccount(1000);
console.log(`Saldo inicial (Conta Geral): ${generalAccount.balance}`);

// Testando o método de saque
generalAccount.withdraw(100);
console.log(`Saldo após saque de R$100 (Conta Geral): ${generalAccount.balance}`);

// Criando uma instância de SavingsBankAccount
let savingsAccount = new SavingsBankAccount(500, 100);
console.log(`Saldo inicial (Conta Poupança): ${savingsAccount.balance}`);

// Testando o método de saque na conta poupança
try {
    savingsAccount.withdraw(450);
    console.log(`Saldo após saque na Conta Poupança: ${savingsAccount.balance}`);
} catch (error) {
    console.log(`Erro no saque da Conta Poupança: ${error.message}`);
}

// Criando uma instância de ProfitableBankAccount
let profitableAccount = new ProfitableBankAccount(1000);
console.log(`Saldo inicial (Conta Rentável): ${profitableAccount.balance}`);

// Testando o método de depósito na conta rentável
profitableAccount.deposit(500);
console.log(`Saldo após depósito de R$500 (Conta Rentável): ${profitableAccount.balance}`);

// Testando o método de saque na conta rentável
profitableAccount.withdraw(100);
console.log(`Saldo após saque de R$100 (Conta Rentável): ${profitableAccount.balance}`);

// Criando um cliente e adicionando contas a ele
let client = new Client("João");
client.addAccount(savingsAccount);
client.addAccount(profitableAccount);
console.log(`Cliente ${client.name} tem ${client.accounts.length} contas.`);
