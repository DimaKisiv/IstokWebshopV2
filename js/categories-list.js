class CategoriesList {
    constructor(categoriesUrl, renderContainer, productsList) {
        this.productsList = productsList;
      fetch(categoriesUrl)
        .then(result => result.json())
        .then(categories => {
          this.categories = categories;
          this.renderCategories(renderContainer, categories);
          this.addEventListeners();
          this.productsList.fetchProducts(null, null);
        });
    }

    renderCategories(container ,categories) {
        let productListDomString = '';
        categories.forEach(cat =>{
            productListDomString += 
            `<a href="#search-bar" data-id="${cat.id}" 
            class="list-group-item .smooth" >${cat.title}</a>`;
        });
        container.html(productListDomString);
    }

    addEventListeners() {
        $(".list-group.categories .list-group-item").click(event => {
            const button = $(event.target);
            const id = button.data('id');
            this.productsList.fetchProducts(id, null);
        });
    }
}