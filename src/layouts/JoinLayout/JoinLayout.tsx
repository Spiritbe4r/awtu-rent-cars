import React, { useEffect } from 'react'
import styles from "./JoinLayout.module.scss"
import { useAuth } from '@/hooks';
import { map} from "lodash";
import { useRouter } from 'next/router';
import { Container, Icon } from 'semantic-ui-react';
import { Layout } from '@/components/Layout';
import { data } from './JoinLayout.data';

interface JoinLayoutProps {
  children: React.ReactNode;
}

export const JoinLayout = (props:JoinLayoutProps) => {
  const {children} = props;
  const  {user}  = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    if (user) router.push("/");
  }, []);

  if (user) return null;
  return (
    <Container className={styles.container}>
    <Layout.Logo /> 

    <div>
      <div className={styles.left}>
        {map(data, (item:any, index) => (
          <div key={index}>
            <Icon name={item.icon} />
            <div>
              <h3>{item.title}</h3>
              <span>{item.description}</span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.right}>{children}</div>
    </div>
  </Container>
  )
}



