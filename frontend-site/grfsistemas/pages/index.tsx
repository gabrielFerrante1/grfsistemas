import Head from 'next/head';
import Link from 'next/link';
import {
	Fade,
	Zoom
} from 'react-awesome-reveal';
import { Col, Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import {
	DiCodeBadge, DiCss3, DiHtml5, DiJsBadge
} from 'react-icons/di';
import {
	FaLaravel,
	FaPhp,
	FaReact
} from 'react-icons/fa';
import {
	FiDatabase
} from 'react-icons/fi';
import {
	GrConfigure, GrLineChart, GrObjectGroup, GrShield, GrTextWrap, GrTooltip
} from 'react-icons/gr';
import { AlertCookie } from '../components/AlertCookie';
import styles from '../styles/Home.module.css';

const Home  = () => {
  const { t } = useTranslation(); 
  return ( 
      <div style={{marginBottom:'8em'}}>
          <Head>
            <title>Desenvolvimento de sistemas web e mobile - Grf Sistemas</title>  

            <meta name="robots" content="index" />
            <meta name="author" content="Grf  Sistemas" />
            <meta name="keywords" content="sistema grf, Grf, Sistemas, Grf Sistemas, grf sistemas, html, php, javascript, dev, desenvolvedor, progamador, web, desenvolvedor web, progamação,  loja virtual, e-commerce, blog,  sql, criação de sistemsa profissionais, densevolvimento de sistemas web, marketing digital, densevolvimento de sistemas" />
          </Head>

		  <AlertCookie />

          <section style={{marginTop:'5.2em',padding:'0 10px'}}> 
				<Zoom delay={400} triggerOnce> 
                  <h1 className={styles.titleSection}>
                      {t('GET_YOUR_SYSTEM')}
                    <span>
                      {t('SYSTEM')}
                    </span> 
                  </h1>  
				</Zoom>

				<Fade  direction='left' triggerOnce>
					<p className={styles.textSection}>
						{t('INDEX_SECTION1_TEXT1')}
						<br />
						{t('INDEX_SECTION1_TEXT2')}
					</p>
				</Fade>

				<Fade delay={300} direction='up' triggerOnce>
					<Link href="/sistemas">
						<button className={styles.btnSection}>
						{t('INDEX_SECTION1_TEXT3')}
						</button>
					</Link>
				</Fade>
          </section>

          <section className={styles.sectionContent}>
            <Container>
              <Row>
					<Zoom delay={300} triggerOnce>
						<h1 className={styles.titleSection}>
								{t('INDEX_SECTION2_TEXT1')}
							<span>
								{t('INDEX_SECTION2_TEXT2')}?
							</span> 
						</h1> 
					</Zoom>
              </Row>

              <Row> 
					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce>
							<GrShield className={styles.iconSection}/>

							<h4 className={styles.titleBeneficiariesGenerals}>{t('INDEX_SECTION2_TEXT3')}</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION2_TEXT4')}</p>
						</Fade>
					</Col> 

					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce>
							<GrLineChart className={styles.iconSection}/>

							<h4 className={styles.titleBeneficiariesGenerals}>{t('INDEX_SECTION3_TEXT1')}</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION3_TEXT2')}</p>
						</Fade>
					</Col>

					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce>
							<GrConfigure className={styles.iconSection}/>

							<h4 className={styles.titleBeneficiariesGenerals}>{t('INDEX_SECTION4_TEXT1')}</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION4_TEXT2')}</p>
						</Fade>
					</Col> 
              </Row>

			  <Row> 
					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce>
							<GrObjectGroup className={styles.iconSection}/>

							<h4 className={styles.titleBeneficiariesGenerals}>{t('INDEX_SECTION5_TEXT1')}</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION5_TEXT2')}</p>
						</Fade>
					</Col>

					<Col lg={4}>
						<Fade direction='up' triggerOnce>
							<GrTextWrap className={styles.iconSection}/>

							<h4 className={styles.titleBeneficiariesGenerals}>{t('INDEX_SECTION6_TEXT1')}</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION6_TEXT2')}</p>
						</Fade>
					</Col> 

					<Col lg={4}>
						<Fade direction='up' triggerOnce>
							<GrTooltip className={styles.iconSection}/>

							<h4 className={styles.titleBeneficiariesGenerals}>{t('INDEX_SECTION7_TEXT1')}</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION7_TEXT2')}</p>
						</Fade>
					</Col> 
              </Row>
            </Container>
          </section>

		  <section className={styles.sectionContent}>
			<Container>
				<Row>
					<Zoom delay={300} triggerOnce>
						<h1 className={styles.titleSection}>
								{t('INDEX_SECTION8_TEXT1')}
							<span>
								{t('INDEX_SECTION8_TEXT2')}?
							</span>
						</h1>
					</Zoom>
				</Row>

				<Row>
					<Col lg={4}>
						<Fade delay={200} direction='left' triggerOnce>
							<img className={styles.imageSection} src="/imgs/icone_site_conteudo_passo_a_passo.png" />
							<p className={`${styles.textSection} text-center`}>{t('INDEX_SECTION9_TEXT1')}</p>
						</Fade>
					</Col>

					<Col lg={4}>
						<Fade delay={300} direction='left' triggerOnce>
							<img className={styles.imageSection} src="/imgs/icone_recursos_passo_a_passo.png" />
							<p className={`${styles.textSection} text-center`}>{t('INDEX_SECTION9_TEXT2')}</p>
						</Fade>
					</Col>

					<Col lg={4}>
						<Fade delay={400} direction='left' triggerOnce>
							<img className={styles.imageSection} src="/imgs/icone_pronot_passo_a_passo.png" />
							<p className={`${styles.textSection} text-center`}>{t('INDEX_SECTION9_TEXT3')}</p>
						</Fade>
					</Col> 
				</Row>
			</Container> 
          </section>

		  <section className={styles.sectionContent}>
			<Container>
				<Row>
					<Zoom delay={300} triggerOnce>
						<h1 className={styles.titleSection}>
								{t('INDEX_SECTION10_TEXT1')}
							<span>
								{t('INDEX_SECTION11_TEXT2')}
							</span> 
						</h1> 
					</Zoom>
				</Row> 

				<Row> 
					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce> 
							<FaPhp className={styles.iconSectionDev}/>
							
							<h4 className={styles.titleBeneficiariesGenerals}>PHP</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION12_TEXT1')}</p>
						</Fade>
					</Col> 

					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce>
							<DiJsBadge className={styles.iconSectionDev}/>

							<h4 className={styles.titleBeneficiariesGenerals}>JavaScript</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION13_TEXT1')}</p>
						</Fade>
					</Col>

					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce>
							<DiHtml5 className={styles.iconSectionDev}/>

							<h4 className={styles.titleBeneficiariesGenerals}>Html</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION14_TEXT1')}</p>
						</Fade>
					</Col> 
				</Row>

				<Row> 
					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce> 
							<DiCss3 className={styles.iconSectionDev}/>
							
							<h4 className={styles.titleBeneficiariesGenerals}>Css</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION15_TEXT1')}</p>
						</Fade>
					</Col> 

					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce>
							<FiDatabase className={styles.iconSectionDev}/>

							<h4 className={styles.titleBeneficiariesGenerals}>Database</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION16_TEXT1')}</p>
						</Fade>
					</Col>

					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce>
							<DiCodeBadge className={styles.iconSectionDev}/>

							<h4 className={styles.titleBeneficiariesGenerals}>MVC</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION17_TEXT1')}</p>
						</Fade>
					</Col> 
				</Row>

				<Row> 
					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce> 
							<FaLaravel className={styles.iconSectionDev}/>
							
							<h4 className={styles.titleBeneficiariesGenerals}>Laravel</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION18_TEXT1')}</p>
						</Fade>
					</Col> 

					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce>
							<FaReact className={styles.iconSectionDev}/>

							<h4 className={styles.titleBeneficiariesGenerals}>React</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION19_TEXT1')}</p>
						</Fade>
					</Col>

					<Col lg={4}>
						<Fade delay={200} direction='up' triggerOnce>
							<FaReact className={styles.iconSectionDev}/>

							<h4 className={styles.titleBeneficiariesGenerals}>React Native</h4> 
							<p className={styles.textSection}>{t('INDEX_SECTION20_TEXT1')}</p>
						</Fade>
					</Col> 
				</Row>
			</Container> 
    	  </section> 
      </div> 
  )
}

export default Home
