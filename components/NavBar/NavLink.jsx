import { chakra, useColorModeValue } from '@chakra-ui/react'
import * as React from 'react'

const DesktopNavLink = (props) => {
    return (
        <chakra.a
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderBottom="2px"
            borderColor="transparent"
            transition="all 0.2s"
            fontSize="xl"
            fontWeight='bold'
            _hover={{
                color: 'red.light'
            }}
            {...props}
        />
    )
}

const MobileNavLink = (props) => {
    return (
        <chakra.a
            display="block"
            textAlign="center"
            fontWeight="bold"
            py="5"
            fontSize="lg"
            color="white"
            w="full"
            _hover={{
                bg: 'blackAlpha.200',
            }}
            {...props}
        />
    )
}

export const NavLink = {
    Mobile: MobileNavLink,
    Desktop: DesktopNavLink,
}