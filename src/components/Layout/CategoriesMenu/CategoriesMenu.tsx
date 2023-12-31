import { useState, useEffect } from "react";
import { map } from "lodash";
import Link from "next/link";
import { categoryCtrl } from "@/api";
import styles from "./CategoriesMenu.module.scss";

export function CategoriesMenu() {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryCtrl.getAll();
      
        setCategories(response);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className={styles.container}>
      {map(categories, (category:any) => (
        <Link key={category.id} href={`/categories/${category.slug}`}>
          {category.name}
        </Link>
      ))}
    </div>
  );
}
