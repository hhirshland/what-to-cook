import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import IngredientsModule from "./components/IngredientsModule";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>What to cook</h1>
      <p>Find a tasty meal to cook with the ingredients you have!</p>
      <IngredientsModule />
    </main>
  );
}
