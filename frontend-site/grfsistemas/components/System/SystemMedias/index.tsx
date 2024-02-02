import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Carousel } from 'antd'; 
import { SystemMedia } from '../../../types/System';
import styles from './SystemMedias.module.css';  

type Props = {
    medias: SystemMedia[]
}

function RightArrow(props: any) {
    const { onClick  } = props;

    return (
      <div
        className={styles.arrowRightCarousel} 
        onClick={onClick}
      >
           <ChevronRightIcon />
        </div>
    );
}

function LeftArrow(props: any) {
    const { onClick } = props;

    return (
      <div
        className={styles.arrowLeftCarousel} 
        onClick={onClick}
      >
           <ChevronLeftIcon />
        </div>
    );
}

export const SystemMedias = ({medias}: Props) => (
        <div>
            <Carousel
                autoplay
                autoplaySpeed={9000}
                pauseOnHover
                draggable
                arrows
                nextArrow={<RightArrow />}
                prevArrow={<LeftArrow />}
                className={styles.carousel}
            >
                {medias.map((item, key) => (
                    <div key={key} className={styles.carouselDivImg}>
                        <img 
                            src={item.source}
                            className='img-fluid'
                        />
                    </div> 
                ))} 
            </Carousel>
        </div>

)