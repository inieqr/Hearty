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


export const ActivityTable = ({ data }) => {

    let dataArr = Array.from(data);
    const handleLabExport = async () => {
        console.log('exporting...')
        jsonexport(dataArr, function (err, csv) {
            if (err) return console.error(err);
            const csvFile = new Blob([csv], { type: 'text/csv' });
            let downloadLink = document.createElement("a");
            downloadLink.download = 'John_Doe_Activity.csv';
            downloadLink.href = window.URL.createObjectURL(csvFile);
            downloadLink.style.display = "none";

            document.body.appendChild(downloadLink);
            downloadLink.click();
        });
    }

    return (
        <>
            <Box d='flex' alignItems='center' mb={4}>
                <Heading d='inline'></Heading>
                <Heading
                    lineHeight={1.1}
                    fontWeight="black"
                    fontSize={{ base: '3xl', sm: '4xl' }}>
                    <Text
                        as={'span'}
                        color={'red.400'}
                        position={'relative'}>
                        Activity <Text as={'span'} color='gray.800'>
                            Tracker
                        </Text>
                    </Text>

                </Heading>
                <Button onClick={handleLabExport} ml='4'>Export as CSV</Button>
            </Box>
            <Table variant='simple'>
                <TableCaption>Activity History (as of {new Date().toLocaleDateString()})</TableCaption>
                <Thead>
                    <Tr>
                        {/* {tableKeys.map((key, index) => (
                            <Th key={index}>{key}</Th>
                        ))} */}
                        <Th>Activity Date</Th>
                        <Th>Type</Th>
                        <Th>Length</Th>
                        <Th>Intensity (out of 10)</Th>
                        <Th>Rating (out of 5)</Th>
                        <Th>Heart Rate (bpm)</Th>
                        <Th>Notes</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {dataArr.map((d, index) => {
                        return (
                            <Tr key={d.index}>
                                <Td>{d.actDate}</Td>
                                <Td >{d.type}</Td>
                                <Td>{d.length}</Td>
                                <Td>{d.intensity}</Td>

                                <Td>{d.rating}</Td>
                                <Td>{d.hr}</Td>
                                <Td>{d.notes}</Td>

                            </Tr>
                        )
                    })}
                </Tbody>




            </Table>
        </>
    )
}