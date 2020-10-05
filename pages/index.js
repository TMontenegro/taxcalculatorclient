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

  const handleProducts = (event) => {
    event.preventDefault();

    console.log("products", products);
  };

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
            <form
              className={styles.taxCalculatorFormContent}
              onSubmit={handleNewProduct}
            >
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
                  Adicionar produto
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={handleProducts}
                  className={styles.taxCalculatorFormItem}
                  disabled={products.length == 0}
                >
                  Gerar Recibo
                </Button>
              </div>
            </form>
          </div>
          {!!products.length && (
            <div className={styles.taxCalculatorProducts}>
              <div className={styles.productsContainer}>
                {products.map((product, index) => (
                  <a key={index} href="" className={styles.card}>
                    <h3>{product.description}</h3>
                    <div className={styles.productContent}>
                      <p>Category: {product.category}</p>
                      <p>Amount: {product.amount}</p>
                    </div>
                    <div className={styles.productContent}>
                      <p>Price: {product.price}</p>
                      <p>Imported: {product.imported}</p>
                    </div>
                  </a>
                ))}
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
