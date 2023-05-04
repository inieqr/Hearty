import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Text,
    Button,
    Icon,
    Box,
    Heading
} from '@chakra-ui/react';
import * as jsonexport from "jsonexport/dist"
import React, { useState, useEffect } from 'react';
import { BsDownload } from 'react-icons/bs'

export const EnvTableComponent = ({ data }) => {
    let dataArr = Array.from(data);
    const handleLabExport = async () => {
        console.log('exporting...')
        jsonexport(dataArr, function (err, csv) {
            if (err) return console.error(err);
            const csvFile = new Blob([csv], { type: 'text/csv' });
            let downloadLink = document.createElement("a");
            downloadLink.download = 'John_Doe_Env.csv';
            downloadLink.href = window.URL.createObjectURL(csvFile);
            downloadLink.style.display = "none";

            document.body.appendChild(downloadLink);
            downloadLink.click();
        });
    }



    return (
        <>
            <Box d='flex' alignItems='center' my={4}>
                <Heading d='inline'></Heading>

                <Heading
                    lineHeight={1.1}
                    fontWeight="black"
                    fontSize={{ base: '3xl', sm: '4xl' }}>
                    <Text
                        as={'span'}
                        color={'red.400'}
                        position={'relative'}>
                        Environmental
                    </Text>
                    <Text as={'span'} ml='4' >
                        Predictions
                    </Text>
                </Heading>
                <Button onClick={handleLabExport} ml='4'>Export as CSV</Button>
            </Box>
            <Table variant='simple'>
                <TableCaption>History of Environmental Model Heart Disease Predictions (as of {new Date().toLocaleDateString()})</TableCaption>
                <Thead>
                    <Tr>
                        {/* {tableKeys.map((key, index) => (
                            <Th key={index}>{key}</Th>
                        ))} */}
                        <Th>Date</Th>
                        <Th>Prediction</Th>
                        <Th>Age</Th>
                        <Th>Sex</Th>
                        <Th>Height</Th>
                        <Th>Weight</Th>
                        <Th>Do you smoke? (y/n)</Th>
                        <Th>Do you drink? (y/n)</Th>
                        <Th>Are you active? (y/n)</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {dataArr.map((d, index) => {
                        if (d.type !== 'env') return;
                        return (
                            <Tr key={d.index} bg={d.prediction === 'At risk' ? 'red.100' : 'transparent'}>
                                <Td>{d.date}</Td>
                                <Td >{d.prediction}</Td>
                                <Td>{d.enteredData.age}</Td>
                                <Td>{d.enteredData.gender}</Td>
                                <Td>{d.enteredData.height}</Td>
                                <Td>{d.enteredData.weight}</Td>
                                <Td>{d.enteredData.smoke}</Td>
                                <Td>{d.enteredData.alco}</Td>
                                <Td>{d.enteredData.active}</Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </>
    )
}