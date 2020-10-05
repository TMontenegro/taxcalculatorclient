import Head from "next/head";
import styles from "../styles/Home.module.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useState } from "react";

export default function Home() {
  // http://taxcalculator-env-1.eba-dfnvacpx.us-east-1.elasticbeanstalk.com/checkout

  const importedOptions = [
    {
      value: true,
      label: "yes",
    },
    {
      value: false,
      label: "no",
    },
  ];

  const categoriesOptions = [
    {
      value: "book",
      label: "book",
    },
    {
      value: "food",
      label: "food",
    },
    {
      value: "medical",
      label: "medical",
    },
    {
      value: "none",
      label: "none",
    },
  ];

  const [products, setProducts] = useState([]);
  const [taxedProducts, setTaxedProducts] = useState([]);

  const [showTaxedProduct, setShowTaxedProduct] = useState(false);
  const [showProduct, setShowProduct] = useState(true);

  const [imported, setImported] = useState("");

  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");

  const handleImported = (event) => {
    setImported(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleAmount = (event) => {
    setAmount(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleNewProduct = (event) => {
    event.preventDefault();
    setShowProduct(true);
    setShowTaxedProduct(false);
    setTaxedProducts([]);
    setProducts([
      ...products,
      {
        imported,
        description,
        category,
        amount,
        price,
      },
    ]);
  };

  async function handleProducts (event){
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(products)
    };
    const response = await fetch('http://taxcalculator-env-1.eba-dfnvacpx.us-east-1.elasticbeanstalk.com/checkout', requestOptions);
    const taxedProducts = await response.json();
    setTaxedProducts(taxedProducts);
    setProducts([]);
    
    setShowProduct(false);
    setShowTaxedProduct(true);
  }

  const resetProducts = () => {
    setShowProduct(true);
    setShowTaxedProduct(false);
    setProducts([]);
    setTaxedProducts([]);
    setImported("");
    setDescription("");
    setCategory("");
    setAmount("");
    setPrice("");
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tax Calculator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to{" "}
          <a
            href="https://github.com/TMontenegro/taxcalculator"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tax Calculator!
          </a>
        </h1>

        <p className={styles.description}>
          <code className={styles.code}>
            A demo project for Liferay Interview
          </code>
        </p>

        <div className={styles.taxCalculatorContainer}>
          <div className={styles.taxCalculatorForm}>
            {showTaxedProduct && (
                <div className={styles.taxCalculatorFormContent}>
                  <div className={styles.taxCalculatorFormSection}>
                  <Button
                    variant="contained"
                    onClick={resetProducts}
                  >
                    Make a new order
                  </Button>
                  </div>
                </div>
            )}
            {showProduct && (
              <form
                className={styles.taxCalculatorFormContent}
                onSubmit={handleNewProduct}
              >
                <h4>You can only have a receipt if you have added at least one product</h4>
                <div className={styles.taxCalculatorFormSection}>
                  <TextField
                    id="imported"
                    select
                    label="Imported product?"
                    value={imported}
                    onChange={handleImported}
                    variant="outlined"
                    className={styles.taxCalculatorFormImported}
                    required
                  >
                    {importedOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className={styles.taxCalculatorFormSection}>
                  <TextField
                    id="description"
                    label="Description"
                    value={description}
                    onChange={handleDescription}
                    variant="outlined"
                    className={styles.taxCalculatorFormItem}
                    required
                  />
                  <TextField
                    id="category"
                    select
                    label="Category"
                    value={category}
                    onChange={handleCategory}
                    variant="outlined"
                    className={styles.taxCalculatorFormItem}
                    required
                  >
                    {categoriesOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </div>
                <div className={styles.taxCalculatorFormSection}>
                  <TextField
                    type="number"
                    id="amount"
                    label="Amount"
                    value={amount}
                    onChange={handleAmount}
                    variant="outlined"
                    className={styles.taxCalculatorFormItem}
                    required
                  />
                  <TextField
                    type="number"
                    id="price"
                    label="Price"
                    value={price}
                    onChange={handlePrice}
                    variant="outlined"
                    className={styles.taxCalculatorFormItem}
                    required
                  />
                </div>
                <div className={styles.taxCalculatorFormSection}>
                  <Button
                    type="submit"
                    variant="contained"
                    className={styles.taxCalculatorFormItem}
                  >
                    Add product
                  </Button>
                  <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={handleProducts}
                    className={styles.taxCalculatorFormItem}
                    disabled={products.length == 0}
                  >
                    Make Receipt
                  </Button>
                </div>
              </form>
            )}
          </div>
          {showProduct && (
            <div className={styles.taxCalculatorProducts}>
              <div className={styles.productsContainer}>
                {products.map((product, index) => (
                  <a key={index} className={styles.card}>
                    <h3>{product.description}</h3>
                    <div className={styles.productContent}>
                      <p><b>Category:</b> {product.category}</p>
                      <p><b>Amount:</b> {product.amount}</p>
                    </div>
                    <div className={styles.productContent}>
                      <p>Price: {product.price}</p>
                      <p>Imported: {product.imported ? "Yes" : "No"}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
          {showTaxedProduct && (
            <div className={styles.taxCalculatorProducts}>
            <div className={styles.productsContainer}>
              <>
                <a className={styles.card}>
                  <p>Total Price: {taxedProducts.total}</p>
                </a>
                <a className={styles.card}>
                  <p>Total Taxes Paid: {taxedProducts.saleTax}</p>
                </a>
                
                {taxedProducts.products.map((taxedProduct, index) => (
                  <a key={index} className={styles.card}>
                    <h3>{taxedProduct.description}</h3>
                    <div className={styles.productContent}>
                      <p>Category: {taxedProduct.category}</p>
                      <p>Amount: {taxedProduct.amount}</p>
                    </div>
                    <div className={styles.productContent}>
                      <p>Taxed Price: {taxedProduct.price}</p>
                      <p>Imported: {taxedProduct.imported ? "Yes" : "No"} </p>
                    </div>
                  </a>
                ))}
              </>
            </div>
          </div>
          )}
        </div>

        <div className={styles.grid}></div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/TMontenegro"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made by
          <img src="/github.svg" alt="Github Logo" className={styles.logo} />
          Tales Montenegro
        </a>
      </footer>
    </div>
  );
}
