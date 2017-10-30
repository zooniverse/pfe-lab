import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentOrganization } from '../action-creators';
import { organizationShape } from '../model';
import CategoriesEditor from '../components/categories-editor';

class CategoriesContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.resetOrganization = this.resetOrganization.bind(this);

    this.state = {
      categories: []
    };
  }

  componentDidMount() {
    this.setState({
      categories: this.props.organization.categories
    });
  }

  handleSubmit() {
    this.setState({ show: false });
    this.props.updateOrganization({ categories: this.state.categories });
  }

  handleChange(categories) {
    this.setState({ show: true, categories });
  }

  resetOrganization() {
    this.setState({ show: false });
    this.props.dispatch(setCurrentOrganization(this.props.organization));
  }

  render() {
    return (
      <div>
        <h5>Categories</h5>
        <div>
          <span className="form__label" htmlFor="categories">
            Project Categories
            <CategoriesEditor
              id="categories"
              name="categories"
              onChange={this.handleChange}
              categories={this.state.categories}
            />
          </span>
          <small className="form__help">
            Categories blah blah blah.
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
  dispatch: PropTypes.func,
  organization: organizationShape,
  updateOrganization: PropTypes.func
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(CategoriesContainer);
