import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
  static renderField({
    id, label, input, meta: { touched, error },
  }) {
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label htmlFor="{field.id}">
          {label}
          <input className="form-control" id={id} type="text" {...input} />
        </label>
        <div className="text-help">{touched ? error : ''}</div>
      </div>
    );
  }

  static onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(PostsNew.onSubmit.bind(this))}>
        <Field label="Title" id="title" name="title" component={PostsNew.renderField} />
        <Field
          label="Categories"
          id="categories"
          name="categories"
          component={PostsNew.renderField}
        />
        <Field label="Post Content" id="content" name="content" component={PostsNew.renderField} />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/" className="btn btn-danger">
          Cancel
        </Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.categories) {
    errors.categories = 'Enter a category';
  }
  if (!values.content) {
    errors.content = 'Enter some content';
  }
  return errors;
}

export default reduxForm({ validate, form: 'postsNewForm' })(connect(null, { createPost })(PostsNew));
