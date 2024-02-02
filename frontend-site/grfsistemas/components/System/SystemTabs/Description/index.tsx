import { Empty } from "antd"
import { useTranslation } from "react-i18next"

type Props = {
    description: string
}

export const Description = ({description}: Props) => {
    const {t} = useTranslation();

    return (
        <div>
            {description != null ?
                <div className='appDescription'>
                    {description}
                </div>
            : 
                <Empty
                    style={{margin:'15px 0'}}
                    image={'imgs/empty.png'}
                    imageStyle={{
                        height: 80 
                    }}
                    description={
                        <span style={{color:'var(--colorText)'}}>
                            {t('EMPTY_DESCRIPTION')}
                        </span>
                    }
                />
            }

        <style global jsx>
        {`
            .appDescription {
                max-height: 270px;
                overflow: hidden;
                color: var(--colorText300)
            }

            .appDescription:hover {
                overflow: auto
            }

            
            .appDescription::-webkit-scrollbar {
                width: 6px;
               
            }

            .appDescription::-webkit-scrollbar-track {
                background: transparent;
            }
            
            .appDescription::-webkit-scrollbar-thumb {
                background-color: var(--primary); 
                border-radius: 20px;
            }

            .appDescription::-webkit-scrollbar-thumb:hover {
                background-color: #6a6969;
            }

        `}
        </style>
        </div>
    )
}