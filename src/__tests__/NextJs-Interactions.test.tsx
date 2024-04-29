import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import PageButtonClicks from '@/app/page-button-clicks/page';

describe('NextJS Interactions', () => {
  test('Alert button', async () => {
    const user = userEvent.setup();
    render(<PageButtonClicks />);

    const alertButton = screen.getByRole('button', { name: /Alert Button/i });
    expect(alertButton).toBeInTheDocument();

    await user.click(alertButton);
    expect(alertButton).toHaveTextContent('Alert Button Clicked');
    await user.click(alertButton);
    expect(alertButton).toHaveTextContent('Alert Button');
    await user.click(alertButton);
    expect(alertButton).toHaveTextContent('Alert Button Clicked');
  });
});
