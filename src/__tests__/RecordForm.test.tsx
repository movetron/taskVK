import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DataForm from '../components/DataForm';
import { act } from 'react-dom/test-utils';

describe('RecordForm', () => {
  const onAddMock = jest.fn();

  test('отображает ошибки валидации при неверных данных', async () => {
    render(<DataForm onAdd={onAddMock} />);

    fireEvent.click(screen.getByText(/сохранить/i));

    expect(await screen.findByText(/имя обязательно/i)).toBeTruthy();
    expect(await screen.findByText(/возраст должен быть положительным/i)).toBeTruthy();
    expect(await screen.findByText(/email обязателен/i)).toBeTruthy();
    expect(await screen.findByText(/город обязателен/i)).toBeTruthy();
    expect(await screen.findByText(/профессия обязательна/i)).toBeTruthy();
  });

  test('поля успешно заполняются и форма отправляется', async () => {
    const onAddMock = jest.fn();

    render(<DataForm onAdd={onAddMock} />);

    // Ввод текста без act — userEvent сам всё обработает
    await userEvent.type(screen.getByLabelText(/имя/i), 'Петр Петров');
    await userEvent.type(screen.getByLabelText(/возраст/i), '30');
    await userEvent.type(screen.getByLabelText(/email/i), 'petr@example.com');
    await userEvent.type(screen.getByLabelText(/город/i), 'Казань');
    await userEvent.type(screen.getByLabelText(/профессия/i), 'Программист');

    fireEvent.click(screen.getByText(/сохранить/i));

    // Ожидаем вызова onAddMock
    await waitFor(() => {
      expect(onAddMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'Петр Петров',
          age: 30,
          email: 'petr@example.com',
          city: 'Казань',
          profession: 'Программист',
        })
      );
    });
 });

});