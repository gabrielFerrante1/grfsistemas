import i18next from 'i18next'
import type { NextPage } from 'next'
import { Container, Row } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
	const { t } = useTranslation();

	return (
		<Container fluid className={styles.containerPage}>
			<Row>
				<h3 className={styles.tituloPage}>
					{t('HELLO')}, Gabriel Rossin Ferrante
				</h3>

			</Row>
	    </Container>
	)
}

export default Home
