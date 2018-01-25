import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { organizationShape } from '../model';
import CategoriesEditor from '../components/categories-editor';

class CategoriesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetOrganization = this.resetOrganization.bind(this);

    this.state = {
      categories: [],
      show: false
    };
  }

  componentDidMount() {
    this.setCategories();
  }

  setCategories() {
    let categoriesWithKeys = [];
    if (this.props.organization.categories && this.props.organization.categories.length > 1) {
      categoriesWithKeys = this.props.organization.categories
        .map((category, index) => Object.assign({}, { key: index, label: category }));
    }
    this.setState({ categories: categoriesWithKeys });
  }

  handleSubmit() {
    const categories = this.state.categories.map(categoryObject => categoryObject.label);
    this.setState({ show: false });
    this.props.updateOrganization({ categories });
  }

  handleChange(categories) {
    this.setState({ show: true, categories });
  }

  resetOrganization() {
    this.setState({ show: false });
    this.setCategories();
  }

  render() {
    return (
      <div>
        <h5>Categories</h5>
        <div>
          <label className="form__label" htmlFor="categories">
            Project Categories
            <CategoriesEditor
              id="categories"
              name="categories"
              onChange={this.handleChange}
              categories={this.state.categories}
            />
          </label>
          <small className="form__help">
            Add categories for volunteers to filter projects by.
            A project must have a tag that matches a category to be filtered.
            Category display order can be rearranged by dragging.
          </small>
        </div>
        {this.state.show &&
        <div>
          <button onClick={this.handleSubmit}>Save</button>
          <button onClick={this.resetOrganization}>Cancel</button>
        </div>}
      </div>);
  }
}

CategoriesContainer.defaultProps = {
  organization: {},
};

CategoriesContainer.propTypes = {
  organization: organizationShape,
  updateOrganization: PropTypes.func
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(CategoriesContainer);
