import React from 'react';
import $ from 'jquery';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.baseUrl = "http://devpoint-ajax-example-server.herokuapp.com/api/v1";
    this.getProducts = this.getProducts.bind(this);
    this.products = this.products.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.state = { products: [] }
  }

  addProduct(e) {
    e.preventDefault();
    let { name, description, base_price, addForm } = this.refs;
    $.ajax({
      url: `${this.baseUrl}/products`,
      type: 'POST',
      data: {
        product: {
          name: name.value,
          description: description.value,
          base_price: base_price.value
        }
      }
    }).done( product => {
      if (this.state.products.length)
        this.setState({ products: [{...product}, ...this.state.products ] });
      else
        this.getProducts();
      addForm.reset();
    })
  }

  getProducts() {
    $.ajax({
      url: `${this.baseUrl}/products`,
      type: 'GET'
    }).done( products => {
      this.setState({ products });
    });
  }

  deleteProduct(id) {
    //OPTIMISTIC UPDATING
    this.setState({ products: this.state.products.filter( p => p.id !== id) })

    $.ajax({
      url: `${this.baseUrl}/products/${id}`,
      type: 'DELETE'
    }).fail( () => {
      alert('Product failed to delete')
      this.getProducts();
    });
  }

  products() {
    return this.state.products.map( product => {
      let { name, id, description, base_price } = product;
      return (
        <tr key={id}>
          <td>{name}</td>
          <td>{description}</td>
          <td>{base_price}</td>
          <td>
            <button 
              className="btn red" 
              onClick={() => this.deleteProduct(id)}
            >
              Delete
            </button>
          </td>
        </tr>
      )
    });
  }

  render() {
    return (
      <div>
        <h3 className="center">Products</h3>
        <form ref="addForm" onSubmit={this.addProduct}>
          <input ref="name" placeholder="name" required={true} />
          <input ref="description" placeholder="description" />
          <input ref="base_price" placeholder="Price" type="number" />
          <button className="btn">Submit</button>
        </form>
        <button className="btn" onClick={ this.getProducts }>Get Products</button>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            { this.products() }
          </tbody>
        </table>
      </div>
    )
  }

}

export default Products;
