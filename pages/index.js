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
      label: "Sim",
    },
    {
      value: false,
      label: "Não",
    },
  ];

  const [imported, setImported] = React.useState("");

  const handleImported = (event) => {
    setImported(event.target.value);
  };

  const categoriesOptions = [
    {
      value: "book",
      label: "Livros",
    },
    {
      value: "food",
      label: "Alimentos",
    },
    {
      value: "medical",
      label: "Remédios",
    },
    {
      value: "none",
      label: "Nenhuma das opções",
    },
  ];

  const [categories, setCategories] = React.useState("");

  const handleCategories = (event) => {
    setCategories(event.target.value);
  };

  const [products, setProducts] = useState([
    {
      id: 1,
      description: "Apple",
      category: "Food",
      amount: 1,
      price: 10.0,
      imported: "Sim",
    },
    {
      id: 2,
      description: "The Lord Of The Rings",
      category: "Book",
      amount: 1,
      price: 47.5,
      imported: "Não",
    },
  ]);
  const [product, setProduct] = useState("");

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
              noValidate
              autoComplete="off"
            >
              <div className={styles.taxCalculatorFormSection}>
                <TextField
                  id="imported"
                  select
                  label="Produto importado?"
                  value={imported}
                  onChange={handleImported}
                  variant="outlined"
                  className={styles.taxCalculatorFormImported}
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
                  label="Descrição"
                  variant="outlined"
                  className={styles.taxCalculatorFormItem}
                />
                <TextField
                  id="category"
                  select
                  label="Categoria"
                  value={categories}
                  onChange={handleCategories}
                  variant="outlined"
                  className={styles.taxCalculatorFormItem}
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
                  label="Quantidade"
                  variant="outlined"
                  className={styles.taxCalculatorFormItem}
                />
                <TextField
                  type="number"
                  id="price"
                  label="Preço"
                  variant="outlined"
                  className={styles.taxCalculatorFormItem}
                />
              </div>
              <div className={styles.taxCalculatorFormSection}>
                <Button
                  type="button"
                  onClick={() => setProducts([...products, product])}
                  variant="contained"
                  className={styles.taxCalculatorFormItem}
                >
                  Adicionar produto
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={styles.taxCalculatorFormItem}
                >
                  Gerar Recibo
                </Button>
              </div>
            </form>
          </div>
          <div className={styles.taxCalculatorProducts}>
            <div className={styles.productsContainer}>
              {products.map((product) => (
                <a key={product.key} href="" className={styles.card}>
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
