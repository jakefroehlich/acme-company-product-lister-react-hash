const URL = "https://acme-users-api-rev.herokuapp.com/api/";
const app = document.querySelector('#app');

console.log(app)

const e = React.createElement

// const APIfetch = (type) => {
//     fetch(`${URL}${type}`)
//         .then(res => res.json())
//         .then(data => {
//             console.log(data)
//             return data
//             })
// }

// APIfetch('companies');
// APIfetch('products');

const getCompanies = fetch(`${URL}companies`)
const getProducts = fetch(`${URL}products`)

const cMapper = (array) => {
    array.map(obj => {
        e('li', null, `${obj.name}`)
    })
}

const pMapper = (array) => {
    array.map(obj => {
        e('li', null, `${obj.name} - ${obj.description}`)
    })
}

class CompanyList extends React.Component {
    state = { companies: []};

    render() {
        // const comps = APIfetch('companies');
        e('ul', )


    }
}

class ProductList extends React.Component {
 
    render() {
        const { products } = this.props;

        return e('ul', null, products.map(product => {
            return e('li', null, `${product.name} - ${product.description}` )
        }))

        // for (let i = 0; i < products.length; i++) {
        //     e('li', null, `${products[i].name} - ${products[i].description}`)
        // }

    }
}

class Nav extends React.Component {
    state = { view:products };

    render() {
        e('nav', null)
    }
}

class App extends React.Component {
    state = { companies: [],
    products: [],
    view: 'products',
    };

    componentDidMount() {
        Promise.all([getCompanies, getProducts])
            // .then(res => res.map(res => res.json()))
            // .then(data => console.log(data))
            .then(res => Promise.all(res.map(data => data.json())))
            .then(data => {
                this.state.companies = data[0];
                this.state.products = data[1];
            })    
            
            this.render()
    }

    render() {

        const { companies, products, view} = this.state;
        const nav = e(Nav ,{ companies, products, view });
        let chosenView;
        console.log(this.state)
        if (view == 'products') {
            chosenView = e(ProductList, { products });
        }
        else {
            chosenView = e(CompanyList, { companies })
        }


        console.log(chosenView)
        return e('div', null, chosenView)
    }
}

ReactDOM.render(e(App), app) 