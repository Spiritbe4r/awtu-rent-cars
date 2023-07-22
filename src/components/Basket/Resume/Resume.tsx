import {useState, useEffect} from "react";
import {Button} from "semantic-ui-react";
import {useRouter} from "next/router";
import {forEach} from "lodash";
import {useAuth} from "@/hooks";
import styles from "./Resume.module.scss";

interface IProductBasket{

    price: number;
    quantity: number;
}
interface ResumeProps {
    products: IProductBasket[];
    nextStep: number;
    btnText: string;
    nextDisabled?: boolean;
}

export const Resume = (props: ResumeProps) => {
    const {products, nextStep, btnText, nextDisabled = false} = props;
    const [total, setTotal] = useState<number | null>(null);
    const {user} = useAuth();
    const router = useRouter();

    useEffect(() => {
        let totalTemp = 0;
        forEach(products, (product) => {
            totalTemp += product.price * product?.quantity;
        });
        setTotal(totalTemp);
    }, [products]);

    const goToNextStep = () => {
        if (user) {
            router.replace({ query: { ...router.query, step: nextStep } })
                .then(resp=>console.log(resp));
        } else {
            router.push("/join/login")
                .then(resp=>console.log(resp));
        }
    };

    if (!total) return null;

    return (
        <div className={styles.container}>
            <h2>Resumen</h2>

            <div className={styles.prices}>
                <div>
                    <span>Total</span>
                    <span>{total.toFixed(2)} S/.</span>
                </div>
            </div>

            <Button primary fluid disabled={nextDisabled} onClick={goToNextStep}>
                {btnText}
            </Button>
        </div>
    );
}
