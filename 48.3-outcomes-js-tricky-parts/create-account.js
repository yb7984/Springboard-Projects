function createAccount(pin, amount = 0) {
    let _pin = pin;
    let _balance = amount;

    const INVALID_PIN = "Invalid PIN.";

    return {
        checkBalance: (pin) => {
            if (pin === _pin) {
                return `$${_balance}`;
            } else {
                return INVALID_PIN;
            }
        },
        deposit: (pin, amount) => {
            if (pin === _pin) {
                _balance += amount;

                return `Succesfully deposited $${amount}. Current balance: $${_balance}.`;
            } else {
                return INVALID_PIN;
            }
        },
        withdraw: (pin, amount) => {
            if (pin === _pin) {
                if (amount <= _balance) {
                    _balance -= amount;

                    return `Succesfully withdrew $${amount}. Current balance: $${_balance}.`;
                } else {
                    return `Withdrawal amount exceeds account balance. Transaction cancelled.`;
                }
            } else {
                return INVALID_PIN;
            }
        },
        changePin: (pin, newPin) => {
            if (pin === _pin) {
                _pin = newPin;

                return `PIN successfully changed!`;
            } else {
                return INVALID_PIN;
            }
        },
    };
}

module.exports = { createAccount };
