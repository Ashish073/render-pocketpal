const router = require("express").Router();
const authenticateToken = require("../middleware/jwtMiddleware");
const { Expense, validate } = require("../models/expenseModel");

router.get('/', authenticateToken, async (req, res) => {
    const userId = req.user._id;
    try {
        const expenses = await Expense.find({ userId }).select('-userId');
        if (!expenses) {
            return res.status(404).json({ message: 'No Data Found' });
        }
        res.status(200).json({
            expenses: expenses,
            message: "Fetched successfully"
        });
    } catch (error) {
        console.error('Error fetching expenses:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.post('/add', authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const { category, amount, description } = req.body;
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ success: false, error: error.details[0].message });

        const newExpense = new Expense({
            userId: userId,
            category,
            amount,
            description
        });

        await newExpense.save();
        const expenses = await Expense.find({ userId }).select('-userId');
        res.status(201).json({ success: true, message: 'Expense added successfully', expenses });
    } catch (error) {
        console.error('Error adding expense:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.put('/:id', authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;
    const { category, amount, date, description } = req.body;
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).json({ success: false, error: error.details[0].message });

        let expense = await Expense.findById(id);
        if (!expense) return res.status(404).json({ success: false, error: 'Expense not found' });

        expense.category = category;
        expense.amount = amount;
        expense.date = date;
        expense.description = description;

        await expense.save();

        const expenses = await Expense.find({ userId }).select('-userId');
        res.status(200).json({ success: true, message: 'Expense updated successfully', expenses });
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const { id } = req.params;
    try {
        const deletedExpense = await Expense.findByIdAndDelete(id);
        if (!deletedExpense) return res.status(404).json({ success: false, error: 'Expense not found' });

        const expenses = await Expense.find({ userId }).select('-userId');
        res.status(200).json({ success: true, message: 'Expense deleted successfully', expenses });
    } catch (error) {
        console.error('Error deleting expense:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.get('/dates', authenticateToken, async (req, res) => {
    const userId = req.user._id;
    try {
        // const dates = await Expense.find({ userId }).distinct('createdAt');
        const dates = await Expense.aggregate([
            { $match: { userId: userId } },
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } } } },
            { $project: { _id: 0, date: "$_id" } }
        ]);
        res.status(200).json({ success: true, dates: dates.map(entry => entry.date) });
    } catch (error) {
        console.error('Error fetching expense dates:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});

router.get('/expenses-by-date', authenticateToken, async (req, res) => {
    const userId = req.user._id;
    const { date } = req.query;
    try {
        let expenses;
        if (date) {
            expenses = await Expense.find({ userId, createdAt: date }).select('-userId');
        } else {
            expenses = await Expense.find({ userId }).select('-userId');
        }
        res.status(200).json({ success: true, expenses });
    } catch (error) {
        console.error('Error fetching expenses by date:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
});


module.exports = router;
