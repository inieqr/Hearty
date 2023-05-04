import {
    IconButton,
    Avatar,
    Box,
    CloseButton,
    Flex,
    HStack,
    VStack,
    ScaleFade,
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

export const User = ({ active, children }) => {
    const handleSignOut = () => {
        localStorage.setItem('uniheart_login_state', false);
        window.location.href = '/'
    }
    return (
        <Flex alignItems={'center'}>
            <Menu>
                <MenuButton
                    py={2}
                    transition="all 0.3s"
                    _focus={{ boxShadow: 'none' }}>
                    <HStack>
                        <Avatar
                            size={'sm'}
                            src={
                                'https://i.imgur.com/VN2mz3I.jpg'
                            }
                        />
                        <VStack
                            display={{ base: 'none', md: 'flex' }}
                            alignItems="flex-start"
                            spacing="1px"
                            ml="2">
                            <Text fontSize="sm"> john@doe.com</Text>
                            <Text fontSize="xs" color="gray.600">
                                UniHeart member
                            </Text>
                        </VStack>
                        <Box display={{ base: 'none', md: 'flex' }}>
                            <FiChevronDown />
                        </Box>
                    </HStack>
                </MenuButton>
                <MenuList
                    bg={useColorModeValue('white', 'gray.900')}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}>
                    {/* <MenuItem>Profile</MenuItem>
                    <MenuItem>Settings</MenuItem> */}
                    {/* <MenuDivider /> */}
                    <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                </MenuList>
            </Menu>
        </Flex>
    )

}