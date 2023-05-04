import { Heading, Text, Box } from '@chakra-ui/react'

export const HeadingWithDesc = ({ desc, align, children }) => {
    return (
        <Box maxW={align === 'center' ? '700px' : ''} mx="auto" textAlign={align}>
            <Heading as="h1" size="xl" color="red.400" mb="4" fontWeight="extrabold">{children}</Heading>
            {desc && <Text fontWeight="normal" color="text.dark" fontSize="xl" my="3" >{desc}</Text>}
        </Box >
    )
}