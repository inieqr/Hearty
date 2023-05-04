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

export const TableComponent = ({ data }) => {
    let dataArr = Array.from(data);
    const handleLabExport = async () => {
        console.log('exporting...')
        jsonexport(dataArr, function (err, csv) {
            if (err) return console.error(err);
            const csvFile = new Blob([csv], { type: 'text/csv' });
            let downloadLink = document.createElement("a");
            downloadLink.download = 'John_Doe_Lab.csv';
            downloadLink.href = window.URL.createObjectURL(csvFile);
            downloadLink.style.display = "none";

            document.body.appendChild(downloadLink);
            downloadLink.click();
        });
    }



    return (
        <>
            <Box d='flex' alignItems='center' mb={4} mt={16}>
                <Heading d='inline'></Heading>

                <Heading
                    lineHeight={1.1}
                    fontWeight="black"
                    fontSize={{ base: '3xl', sm: '4xl' }}>
                    <Text
                        as={'span'}
                        color={'red.400'}
                        position={'relative'}>
                        Lab <Text as={'span'} color='gray.800' >
                            Predictions
                        </Text>
                    </Text>

                </Heading>
                <Button onClick={handleLabExport} ml='4'>Export as CSV</Button>
            </Box>
            <Table variant='simple'>
                <TableCaption>History of Lab Model Heart Disease Predictions (as of {new Date().toLocaleDateString()})</TableCaption>
                <Thead>
                    <Tr>
                        {/* {tableKeys.map((key, index) => (
                            <Th key={index}>{key}</Th>
                        ))} */}
                        <Th>Date</Th>
                        <Th>Prediction</Th>
                        <Th isNumeric>Age</Th>
                        <Th>Sex</Th>
                        <Th>Chest Pain Type</Th>
                        <Th>Resting Blood Pressure</Th>
                        <Th>Cholesterol</Th>
                        <Th>Fasting Blood Sugar</Th>
                        <Th>Resting ECG</Th>
                        <Th>Max Heart Rate</Th>
                        <Th>Exercise Induced Angina</Th>
                        <Th>ST Depression</Th>
                        <Th>Oldpeak</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {dataArr.map((d, index) => {
                        if (d.type !== 'lab') return;
                        return (
                            <Tr key={d.index} bg={d.prediction === 'At risk' ? 'red.100' : 'transparent'}>
                                <Td>{d.date}</Td>
                                <Td >{d.prediction}</Td>
                                <Td>{d.enteredData.Age}</Td>
                                <Td>{d.enteredData.Sex}</Td>
                                <Td>{d.enteredData.ChestPainType}</Td>
                                <Td>{d.enteredData.RestingBP}</Td>
                                <Td>{d.enteredData.Cholesterol}</Td>
                                <Td>{d.enteredData.FastingBS}</Td>
                                <Td>{d.enteredData.RestingECG}</Td>
                                <Td>{d.enteredData.MaxHR}</Td>
                                <Td>{d.enteredData.ExerciseAngina}</Td>
                                <Td>{d.enteredData["ST_Slope"]}</Td>
                                <Td>{d.enteredData.Oldpeak}</Td>

                            </Tr>
                        )
                    })}
                </Tbody>




            </Table>


        </>
    )
}