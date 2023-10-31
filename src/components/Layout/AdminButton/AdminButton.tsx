import { Icon } from "semantic-ui-react";
import Link from "next/link";
import styles from "./AdminButton.module.scss";
import { useAuth } from "@/hooks";

export function AdminButton() {
  const { isAdmin} = useAuth();

  const roleText = isAdmin ? "Admin" : "Seller";
  return (
    <Link href="/admin" className={styles.adminButton}>
      <Icon name="configure" />
      {roleText}
    </Link>
  );
}
