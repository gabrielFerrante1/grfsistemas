import styles from '../styles/MyPurchases.module.scss'
import { Container, Row } from "react-bootstrap"
import { useTranslation } from 'react-i18next'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default () => {
    const { t } = useTranslation()

    return (
        <Container fluid className={styles.containerPage}>
            <Row>
                <h3 className={styles.tituloPage}>
                    {t('MY_SHOPPING')}
                </h3> 
            </Row> 
            <Row>
                <TableContainer >
                    <Table className={styles.tablePurchases} variant='unstyled'>
                        <Thead>
                            <Tr>
                                <Th style={{width:'100%'}}>{ t('SYSTEMS') }</Th>
                                <Th>{ t('TOTAL_PRICE') }</Th>
                                <Th>{ t('DATE') }</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            <Tr>
                                <Td>Sistema gestão de finanças</Td>
                                <Td>R$ 293,39</Td>
                                <Td isNumeric>29/12/2009 20:13</Td>
                                <Td>
                                    <button className={styles.purchasesReceipt}>Recibo</button>
                                    <button className={styles.purchasesReceipt}>Detalhes</button>
                                </Td>
                            </Tr>
                            <Tr>
                                <Td>feet</Td>
                                <Td>centimetres (cm)</Td>
                                <Td isNumeric>30.48</Td> <Td isNumeric>30.48</Td>
                            </Tr>
                            <Tr>
                                <Td>yards</Td>
                                <Td>metres (m)</Td>
                                <Td isNumeric>0.91444</Td> <Td isNumeric>30.48</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Row>
        </Container>
    )
}