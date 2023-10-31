import { User } from "@/types";
import { useState, useEffect } from "react";
import { Table, Image, Icon } from "semantic-ui-react";

const NOT_FOUND_IMG = "/images/not-found.jpg";

export function User(props:{user : User}) {
  const { user } = props;
  const [avatar, setAvatar] = useState(NOT_FOUND_IMG);
  const isAdmin = user.roles?.includes('ROLE_ADMIN');

  useEffect(() => {
    const imageUrl = user.profileImage?.url ?? NOT_FOUND_IMG;

    setAvatar(imageUrl);
  }, [user]);

  return (
    <>
      <Table.Cell width={1}>
        <Image src={avatar} alt={user.email} avatar />
      </Table.Cell>
      <Table.Cell>{user.email}</Table.Cell>
      <Table.Cell>
        <Icon
          name={isAdmin ? "check" : "close"}
          color={isAdmin ? "green" : "red"}
        />
      </Table.Cell>
    </>
  );
}
