import { useState } from "react";
import { Grid, Image, Segment } from "semantic-ui-react";
import styles from "./ImageCtnr.module.scss";
interface ImageObject {
    url: string;
    id?: string;
}

interface ImageProps {
    imgs?: ImageObject[];
}

export const ImageCtnr: React.FC<ImageProps> = ({ imgs = [{ url: '' }] }) => {
    const [mainImage, setMainImage] = useState<ImageObject>(imgs[0]);

    console.log('imgs', imgs);
    const handleClick = (image: ImageObject) => {
        console.log('SE HIZO CLICK', image);
        setMainImage(image);
    };

    return (
        <div className={styles['image-container']}>
            <div className={styles['main-screen']}>
                <Image src={mainImage?.url} alt={mainImage?.id} />
            </div>

            <Grid columns={4} stackable>
                {imgs.map((curElm, index) => (
                    <Grid.Column key={index}>
                        <Segment>
                            <div
                                className={`${styles['image-box']} ${curElm === mainImage ? styles['selected'] : ''}`}
                                onClick={() => handleClick(curElm)}
                            >
                                <Image
                                    src={curElm.url}
                                    alt={curElm.id}
                                    className={`ui image ${index > 0 ? styles['small-image'] : ''}`}
                                />
                            </div>
                        </Segment>
                    </Grid.Column>
                ))}
            </Grid>
        </div>
    );
};
