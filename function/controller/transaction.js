import db from '../models/index.js';

const { Society, Transaction } = db;

// Create Transaction
export const createTransaction = async (req, res) => {
  try {
    const {
      societyId,
      month,
      amount,
      dueDate,
      status,
      paymentDate,
      paymentMethod
    } = req.body;

    // Basic Validations
    if (!societyId) return res.status(400).json({ message: "Licence No is required" });
    if (!month) return res.status(400).json({ message: "Month is required" });
    if (!amount) return res.status(400).json({ message: "Amount is required" });
    if (!paymentDate) return res.status(400).json({ message: "Payment Date is required" });
    if (!dueDate) return res.status(400).json({ message: "Due Date is required" });


    const society = await Society.findOne({
        where: { id:societyId }
    });
     console.log(society)
    if (!society) {
      return res.status(404).json({ message: "Invalid Licence No — Society not found" });
    }

    const newTransaction = await Transaction.create({
      societyId,
      month,
      amount,
      dueDate,
      status,
      paymentDate,
      paymentMethod
    });

    return res.status(201).json({
      transaction: newTransaction,
      message: "Transaction successfully created!"
    });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const updateTransaction = async (req, res) => {
  const {
    societyId,
    month,
    amount,
    dueDate,
    status,
    paymentDate,
    paymentMethod
  } = req.body;

  if (!societyId) {
    return res.status(400).json({ message: "Licence No is required" });
  }

  try {
    const transaction = await Transaction.findOne({ where: { societyId } });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found for this Licence No" });
    }

    const transactions =await Transaction.update(
      {
        month,
        amount,
        dueDate,
        status:"paid",
        paymentDate,
        paymentMethod
      },
      { where: { societyId } }
    );

    return res.status(200).json({ message: "Transaction updated successfully",transactions });

  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const getTransaction = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();

    if (!transactions || transactions.length === 0) {
      return res.status(404).json({ message: 'No transactions found' });
    }

    return res.status(200).json({ transactions });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    const transaction = await Transaction.findOne({ where: { id } });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    return res.status(200).json({ transaction });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Transaction ID is required' });
    }

    const transaction = await Transaction.findOne({ where: { id } });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    await Transaction.destroy({ where: { id } });

    return res.status(200).json({ message: 'Transaction deleted successfully' });

  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
