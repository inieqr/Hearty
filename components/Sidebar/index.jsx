import React, { ReactNode } from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    HStack,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Img
} from '@chakra-ui/react';
import {
    FiHome,
    FiMenu,
    FiBell,
    FiChevronDown,
} from 'react-icons/fi';
import { MdOutlineHealthAndSafety } from 'react-icons/md'
import { AiOutlineHeart, AiOutlineCheckCircle, AiOutlineDotChart } from 'react-icons/ai'
import { BsCalculator, BsBarChart } from 'react-icons/bs'
import { BiWalk } from 'react-icons/bi'
import { User } from '../User'
const LinkItems = [
    { name: 'Home', icon: FiHome, href: '/' },
    { name: 'Predict', icon: AiOutlineHeart, href: '/predict' },
    { name: 'Prediction History', icon: AiOutlineDotChart, href: '/statistics' },
    { name: 'BMI Calculator', icon: BsCalculator, href: '/bmi' },
    { name: 'Activity Tracker', icon: BiWalk, href: '/activity-tracker' },
    { name: 'Activity Log', icon: BsBarChart, href: '/activity-log' },
    { name: 'Prevention', icon: MdOutlineHealthAndSafety, href: '/prevention' },
];

export const Sidebar = ({ active, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
                active={active}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent active={active} onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({ onClose, active, ...rest }) => {
    return (
        <Box
            // transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Img
                    src="/logo.png"
                    h="12"
                    display="inline"
                    mr="3"
                    mt="-1"
                />
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name} icon={link.icon} href={link.href} active={active}>
                    {link.name}
                </NavItem>
            ))
            }
        </Box >
    );
};

const NavItem = ({ icon, children, href, active, ...rest }) => {
    return (
        <Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                fontWeight='semibold'
                bg={active === children.toLowerCase() ? 'red.400' : 'transparent'}
                color={active === children.toLowerCase() ? 'white.off' : 'black.light'}
                transition='all 0.2s'
                _hover={{
                    bg: 'red.200',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link >
    );
};

const MobileNav = ({ onOpen, ...rest }) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}>
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />


            <Img
                src="/logo.png"
                h="12"
                display={{ base: 'inline', md: 'none' }}
                mr="3"
                mt="-1"
            />

            <HStack spacing={{ base: '0', md: '6' }}>
                <Menu>
                    <MenuButton>
                        <IconButton
                            size="lg"
                            variant="ghost"
                            aria-label="open menu"
                            icon={<FiBell />}
                        />


                    </MenuButton>
                    <MenuList
                        bg={useColorModeValue('white', 'gray.900')}
                        borderColor={useColorModeValue('gray.200', 'gray.700')}>
                        <MenuItem>
                            <Box d='flex' alignItems='center' color='gray.500'>
                                <Icon as={AiOutlineCheckCircle} mr='2' />
                                <Text fontSize="sm" fontWeight="semibold">
                                    Completed your check for today!
                                </Text>
                            </Box>
                        </MenuItem>
                        <MenuItem>
                            <Box d='flex' alignItems='center' color='gray.500'>
                                <Icon as={AiOutlineHeart} mr='2' />
                                <Text fontSize="sm" fontWeight="semibold">
                                    Negative prediction for heart disease!
                                </Text>
                            </Box>
                        </MenuItem>
                    </MenuList>
                </Menu>
                <User />

            </HStack>
        </Flex>
    );
};