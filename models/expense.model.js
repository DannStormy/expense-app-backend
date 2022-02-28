const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
    {
        funds: { type: Number, required: true },
    },
    { collection: 'expense-data' }
)

const Expense = mongoose.model('ExpenseData', expenseSchema);

module.exports = Expense;