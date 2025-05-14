import React from 'react';
import { Document, Page, Text, Font, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import fontDev from './layiji_mahaniyom1.ttf';
import moment from 'moment/min/moment-with-locales';
import { Table, TableHeader, TableCell, TableBody, DataTableCell } from '@david.kucsai/react-pdf-table';

// Register font
Font.register({ family: 'font', src: fontDev });

// Create styles for PDF
const styles = StyleSheet.create({
    page: {
        fontFamily: 'font',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    header: {
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 14,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    subTitle: {
        fontSize: 14,
        marginBottom: 10,
    },
    date: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: 'right',
    },
    table: {
        marginVertical: 10,
    },
    tableHeader: {
        backgroundColor: '#FF6B00',
        color: '#FFFFFF',
        fontSize: 12,
        textAlign: 'center',
    },
    tableCell: {
        padding: 5,
        fontSize: 12,
        textAlign: 'center',
    },
    summary: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'right',
    },
});

const Invoice = ({ order }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.title}>BOOKSTORE</Text>
                    <Text style={styles.subTitle}>ใบเสร็จรับเงิน</Text>
                </View>

                {/* Date */}
                <Text style={styles.date}>
                    วันที่: {moment().locale('th').format('LL')}
                </Text>

                {/* Table */}
                <Table data={order.products} style={styles.table}>
                    <TableHeader>
                        <TableCell style={styles.tableHeader}>รายการสินค้า</TableCell>
                        <TableCell style={styles.tableHeader}>จำนวน</TableCell>
                        <TableCell style={styles.tableHeader}>ราคา (บาท)</TableCell>
                    </TableHeader>
                    <TableBody>
                        <DataTableCell getContent={(x) => x.product.title} style={styles.tableCell} />
                        <DataTableCell getContent={(x) => x.count} style={styles.tableCell} />
                        <DataTableCell getContent={(x) => x.price.toFixed(2)} style={styles.tableCell} />
                    </TableBody>
                </Table>

                {/* Summary */}
                <Text style={styles.summary}>
                    ราคารวมสุทธิ: {Number(order.cartTotal).toFixed(2)} บาท
                </Text>
            </Page>
        </Document>
    );
};

export default Invoice;
