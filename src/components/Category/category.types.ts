export type CategoryProps = {
  id: string;
  name: string;
  isChecked: boolean;
  handleCategoryCheckbox(id: string): void;
};
