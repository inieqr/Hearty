import {
    Box,
    Center,
    HStack,
    Stack,
    StackDivider,
    useDisclosure,
    Button,
    ChakraProvider,
} from '@chakra-ui/react'
import * as React from 'react'
import { HiOutlineMenu, HiX } from 'react-icons/hi'
import { NavLink } from './NavLink'
import { NavList } from './NavList'
import { NavListItem } from './NavListItem'
import { useEffect, useState } from 'react'
import { User } from '../User'
const links = [
    // {
    //     label: 'Predict',
    //     href: '/predict',
    // },
    // {
    //     label: 'Prevention',
    //     href: '/prevention',
    // },
    // {
    //     label: 'BMI Calculator',
    //     href: '/bmi',
    // }
]

const MobileNavContent = (props) => {
    const { isOpen, onToggle } = useDisclosure()
    return (
        <Box {...props}>
            <Center
                as="button"
                p="2"
                fontSize="2xl"
                onClick={onToggle}
                color="white"
            >
                {isOpen ? <HiX /> : <HiOutlineMenu />}
            </Center>
            <NavList
                pos="absolute"
                insetX="0"
                bg="black"
                top="64px"
                animate={isOpen ? 'enter' : 'exit'}
            >
                <Stack spacing="0" divider={<StackDivider borderColor="black" />}>
                    {links.map((link, index) => (
                        <NavListItem key={index} >
                            <NavLink.Mobile href={link.href}>{link.label}</NavLink.Mobile>
                        </NavListItem>
                    ))}
                    <NavListItem
                        style={{
                            flex: '1',
                        }}
                    >
                    </NavListItem>
                </Stack>
            </NavList>
        </Box>
    )
}

const DesktopNavContent = (props) => {
    const [loggedIn, setLoggedIn] = useState(false)
    useEffect(() => {
        if (localStorage.getItem('uniheart_login_state') === 'true') {
            setLoggedIn(true)
        }
    }, [])

    let bg = 'red.400'
    let color = 'white'
    let hover = 'red.500'
    if (props.active === 'login') {
        bg = 'transparent'
        color = 'red.400'
        hover = ''
    }
    return (
        <HStack spacing="8" align="stretch" {...props}>
            {links.map((link, index) => (
                // <NavLink.Desktop key={index} href={link.href} fontSize="xl" fontWeight="bold" _hover={{
                //   color: "grey",
                // }}>
                //       {link.label}
                // </NavLink.Desktop>

                // <motion.a key={index} whileHover={{ scale: 1.1  }}>
                <NavLink.Desktop key={index} href={link.href} color={props.active === link.label.toLowerCase() ? 'red.500' : 'black.light'}>
                    {link.label}
                </NavLink.Desktop>
                // </motion.a>
            ))}

            {
                loggedIn ?
                    <User />
                    :
                    <Button bg={bg} _hover={{ bg: hover }} color={color} as='a' href='/login'>
                        <NavLink.Desktop>
                            Login
                        </NavLink.Desktop>
                    </Button>
            }



        </HStack >
    )
}

export const NavContent = {
    Mobile: MobileNavContent,
    Desktop: DesktopNavContent,
}