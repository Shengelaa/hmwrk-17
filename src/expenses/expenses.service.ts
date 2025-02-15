import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Injectable()
export class ExpensesService {
  private expenses = [
    {
      id: 1,
      category: 'category1',
      productName: 'product1',
      quantity: 1,
      price: 12,
      totalPrice: 15,
    },
    {
      id: 2,
      category: 'category2',
      productName: 'product2',
      quantity: 2,
      price: 22,
      totalPrice: 12,
    },
    {
      id: 3,
      category: 'category3',
      productName: 'product3',
      quantity: 13,
      price: 133,
      totalPrice: 1122,
    },
  ];

  create(createExpenseDto: CreateExpenseDto) {
    console.log('rec dto', CreateExpenseDto);
    const { category, productName, quantity, price } =
      createExpenseDto;

    if (!category || !productName || !quantity || !price )
      throw new HttpException(
        'category, productNBame , quantity , price and totarlPrice is required',
        HttpStatus.BAD_REQUEST,
      );

    const lastId = this.expenses[this.expenses.length - 1]?.id || 0;

    const totalPrice = quantity * price;

    const newExpenses = {
      id: lastId + 1,
      category,
      productName,
      quantity,
      price,
      totalPrice,
    };
    this.expenses.push(newExpenses);
    return newExpenses;
  }

  findAll() {
    return this.expenses;
  }

  findOne(id: number) {
    const expense = this.expenses.find((el) => el.id === id);
    if (!expense)
      throw new HttpException('expense nottn found', HttpStatus.NOT_FOUND);
    return expense;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    console.log(updateExpenseDto);
    console.log(id, 'id');
    const Index = this.expenses.findIndex((el) => el.id === +id);
    console.log(Index, 'inde');
    if (Index === -1)
      throw new HttpException('user nottn found', HttpStatus.NOT_FOUND);

    this.expenses[Index] = {
      ...this.expenses[Index],
      ...updateExpenseDto,
    };

    return this.expenses[Index];
  }

  remove(id: number) {
    const index = this.expenses.findIndex((el) => el.id === id);
    if (index === -1)
      throw new HttpException('user not found', HttpStatus.NOT_FOUND);
    const deletedExpense = this.expenses.splice(index, 1);
    return deletedExpense;
  }
}
