import { render, screen } from 'test/utilities';
import PackingList from '.';

it('renders the Packing List application', () => {
  render(<PackingList />);
});

it('has the correct title', async () => {
  render(<PackingList />);
  screen.getByText('Packing List');
});

it('has an input field for a new item', () => {
  render(<PackingList />);
  screen.getByLabelText('New Item Name');
});

it('has a "Add New Item" button that is disabled when the input is empty',() => {
  render(<PackingList />);
  expect(screen.getByLabelText('New Item Name')).toHaveValue('')
  expect(screen.getByRole('button', { name: 'Add New Item'})).toBeDisabled()
});

it('enables the "Add New Item" button when there is text in the input field', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item'});
  await user.type(newItemInput, 'Pencil')
  expect(addNewItemButton).toBeEnabled()
});

it('adds a new item to the unpacked item list when the clicking "Add New Item"', async () => {
  const { user } = render(<PackingList />);
  const newItemInput = screen.getByLabelText('New Item Name');
  const addNewItemButton = screen.getByRole('button', { name: 'Add New Item'});
  const unpackedList = screen.getByTestId('unpacked-items-list')
  expect(unpackedList.children).toHaveLength(0)
  await user.type(newItemInput, 'Pencil')
  await user.click(addNewItemButton)
  expect(unpackedList.children).toHaveLength(1)
  // expect(screen.getByLabelText('Pencil')).not.toBeChecked()
});
