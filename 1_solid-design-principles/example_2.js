'use strict'

let Color = Object.freeze({
    red: 'red',
    green: 'green',
    blue: 'blue'
});

let Size = Object.freeze({
    small: 'Small',
    medium: 'medium',
    large: 'large'
});


class Product {
    constructor(name, color, size) {
        this.name = name;
        this.color = color;
        this.size = size;
    }
}

class ProductFilter {
    filterByColor(products, color) {
        return products.filter(product => product.color === color);
    }

    filterBySize(products, size) {
        return products.filter(product => product.size === size);
    }
}

class FilterSpecification {
    constructor() {
        if(this.constructor.name === 'FilterSpecification') {
            throw new Error('abstract class');
        }
    }

    isSatisfied(item) {
        throw new Error('Implement isSatisfied method');
    }
}


class ColorSpecification extends FilterSpecification {
    constructor(color) {
        super();
        this.color = color;
    }

    isSatisfied(item) {
        return item.color === this.color;
    }
}

class SizeSpecification extends FilterSpecification {
    constructor(size) {
        super();
        this.size = size;
    }

    isSatisfied(item) {
        return item.size === this.size;
    }
}

class AddSpecification extends FilterSpecification {
    constructor(...specs) {
        super();
        this.specs = specs;
    }

    isSatisfied(item) {
        return this.specs.every(x => x.isSatisfied(item))
    }
}

let apple = new Product('Apple', Color.green, Size.small);
let tree = new Product('Tree', Color.green, Size.large);
let house = new Product('House', Color.blue, Size.large);

let products = [apple, tree, house];

let pf = new ProductFilter();
console.log(`Green products (use ProductFilter):`);
for (let p of pf.filterByColor(products, Color.green))
    console.log(`* ${p.name} is green`)


class BetterFilter {
    filter(items, spec) {
        return items.filter(x => spec.isSatisfied(x))
    }
}

let bf = new BetterFilter();
console.log(`Green products (use BetterFilter):`);
for (let p of bf.filter(products, new ColorSpecification(Color.green)))
    console.log(`* ${p.name} is green`)


console.log(`Large and green products:`);
let spec = new AddSpecification(
    new ColorSpecification(Color.green),
    new SizeSpecification(Size.large)
)
for (let p of bf.filter(products, spec))
    console.log(`* ${p.name} is green and large`)
