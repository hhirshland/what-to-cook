import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import IngredientsModule from "./components/IngredientsModule";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image src="/logo.png" width={300} height={300} alt="logo"></Image>
      <h1>What to Cook</h1>
      <p>Find a tasty meal to cook with the ingredients you have!</p>
      <IngredientsModule />
    </main>
  );
}
