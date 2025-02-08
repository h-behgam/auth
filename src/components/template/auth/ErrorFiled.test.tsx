import { render, screen } from '@testing-library/react';
import ErrorFiled from '../ErrorFiled';

describe('ErrorFiled Component', () => {
  it('باید یک پیام خطا نمایش دهد اگر مقدار `item` یک رشته باشد', () => {
    render(<ErrorFiled item='این یک خطای تستی است' />);

    // چک می‌کنیم که متن نمایش داده شده است
    expect(screen.getByText('این یک خطای تستی است')).toBeInTheDocument();
  });

  it('باید چندین پیام خطا نمایش دهد اگر مقدار `item` یک آرایه باشد', () => {
    const errors = ['خطای اول', 'خطای دوم'];
    render(<ErrorFiled item={errors} />);

    // چک می‌کنیم که هر دو خطا در صفحه وجود دارند
    errors.forEach((error) => {
      expect(screen.getByText(error)).toBeInTheDocument();
    });
  });

  it('باید دارای کلاس `text-red-700` باشد', () => {
    render(<ErrorFiled item='یک خطای تستی' />);

    // پیدا کردن عنصر و چک کردن کلاس آن
    const errorMessage = screen.getByText('یک خطای تستی');
    expect(errorMessage).toHaveClass('text-red-700');
  });
});
