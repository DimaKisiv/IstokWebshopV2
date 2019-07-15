const cart = new Cart($('#cartModal'));

const productList = new ProductList(
  'data/products.json',
  $('#products-container'),
  cart
);

const categoriesList = new CategoriesList(
    'data/categories.json',
    $('.list-group.categories'),
    productList
);

document.querySelector('.btn.btn-search').addEventListener('click', () => {
    productList.fetchProducts(null, $('.form-control.search').val());
});

document.querySelector('.form-control.search').addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        productList.fetchProducts(null, $('.form-control.search').val());
    }
});