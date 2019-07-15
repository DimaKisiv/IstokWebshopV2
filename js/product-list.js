class ProductList {
  constructor(productsUrl, renderContainer, cart) {
    this.cart = cart;
    this.productsUrl = productsUrl;
    this.renderContainer = renderContainer;
  }
  fetchProducts(categoryId, searchKey) {
    fetch(this.productsUrl)
      .then(result => result.json())
      .then(productsResult => {
        this.products = productsResult;
        this.products = categoryId 
        ? this.products.filter(prod => prod.categoryId == categoryId) 
        : this.products;
        this.products = searchKey
        ? this.products.filter(prod => prod.title.toLowerCase().indexOf(searchKey.toLowerCase()) != -1)
        : this.products;
        this.renderProducts(this.renderContainer);
        this.addEventListeners();
        $('#carouselIndicators').carousel(categoryId);
      });
  }
  getProductById(id) {
    return this.products.find(el => el.id === id);
  }
  renderProducts(container) {
    let productListDomString = '';
    this.products.forEach(product => {
      productListDomString += 
      
      `<div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100">
        <a href="#"><img class="card-img-top" src="img/products/${product.image}" alt="${product.title}"></a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">${product.title}</a>
          </h4>
          <h5>$${product.price}</h5>
          <p class="card-text">${product.description}</p>
        </div>
        <div class="card-footer">
        <button class="btn btn-info" data-toggle="modal"
        data-target="#productInfoModal" data-id="${
          product.id
        }">Info
      </button>
      <button class="btn btn-primary buy" data-id="${
        product.id
      }">
        $${product.price} - Buy
      </button>
        </div>
      </div>
    </div>`;
    });
    container.html(productListDomString);
  }
  addEventListeners() {
    $('#productInfoModal').on('show.bs.modal', event => {
      const button = $(event.relatedTarget); // Button that triggered the modal
      const id = String(button.data('id')); // Extract info from data-* attributes
      const product = this.getProductById(id);
      const modal = $('#productInfoModal');
      modal
        .find('.modal-body .card-img-top')
        .attr('src', 'img/products/' + product.image)
        .attr('alt', product.title);
      modal.find('.modal-body .card-title').text(product.title);
      modal.find('.modal-body .card-text').text(product.description);
      modal
        .find('button.buy')
        .text(`${product.price} - Buy`)
        .data('id', id);
    });
    $('.card.product button.buy, #productInfoModal button.buy').click(event => {
      const button = $(event.target);
      const id = button.data('id');
      this.cart.addProduct(id);
      window.showAlert('Product added to cart');
    });
    $('.btn.btn-primary.buy').click(event => {
      const button = $(event.target);
      const id = button.data('id');
      this.cart.addProduct(id);
      window.showAlert('Product added to cart');
    });
  }
}
