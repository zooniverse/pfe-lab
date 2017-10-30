import React from 'react';
import DragReorderable from 'drag-reorderable';

export default class CategoriesEditor extends React.Component {
  constructor(props) {
    super(props);

    this.handleAddCategory = this.handleAddCategory.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCategoryReorder = this.handleCategoryReorder.bind(this);
    this.handleRemoveCategory = this.handleRemoveCategory.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.renderTable = this.renderTable.bind(this);
  }

  handleAddCategory() {
    const newCategory = 'Example';
    const categories = this.props.categories;
    categories.push(newCategory);
    this.props.onChange(categories);
  }

  handleInputChange(idx, event) {
    const categories = this.props.categories;
    categories[idx] = event.target.value;
    this.props.onChange(categories);
  }

  handleCategoryReorder(newCategoryOrder) {
    this.props.onChange(newCategoryOrder);
  }

  handleRemoveCategory(categoryToRemove) {
    const categories = this.props.categories;
    const indexToRemove = categories.indexOf(categoryToRemove);
    if (indexToRemove > -1) {
      categories.splice(indexToRemove, 1);
      this.props.onChange(categories);
    }
  }

  renderRow(category) {
    const idx = this.props.categories.indexOf(category);
    return (
      <tr key={idx}>
        <td>
          <input
            type="text"
            name="category"
            value={category}
            onChange={this.handleInputChange.bind(this, idx)}
          />
        </td>
        <td>
          <button onClick={this.handleRemoveCategory.bind(this, category)} type="button">
            <i className="fa fa-remove" />
          </button>
        </td>
      </tr>
    );
  }

  renderTable(categories) {
    return (
      <table className="external-links-table">
        <thead>
          <tr>
            <th>Category</th>
          </tr>
        </thead>
        <DragReorderable
          tag="tbody"
          items={categories}
          render={this.renderRow}
          onChange={this.handleCategoryReorder}
        />
      </table>
    );
  }

  render() {
    return (
      <div>
        {(this.props.categories.length > 0)
          ? this.renderTable(this.props.categories)
          : null}

        <button type="button" onClick={this.handleAddCategory}>Add category</button>
      </div>
    );
  }
}

CategoriesEditor.defaultProps = {
  categories: []
};

CategoriesEditor.propTypes = {
  onChange: React.PropTypes.func,
  categories: React.PropTypes.arrayOf(
    React.PropTypes.string
  )
};
