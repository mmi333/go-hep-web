import Link from "next/link";
import {Flex, Button} from "@chakra-ui/react"

  
const NavBar = () => {
  
	return (
        <Flex>
            <Flex position="sticky" align="center" bg="#007d9c" color="#007d9c" w="100%">
                <Flex>
                <Link href="/" passHref>
                    <Button colorScheme='#007d9c' as="a" variant="solid" aria-label="Home" my={5} w="100%"  color="white">
                    Home
                    </Button>
                </Link>

                <Link href="/lcio" passHref>
                    <Button colorScheme='#007d9c' as="a" variant="solid" aria-label="Lcio" my={5} w="100%" color="white">
                    Lcio
                    </Button>
                </Link>

                <Link href="/hplot" passHref>
                    <Button colorScheme='#007d9c' as="a" variant="solid" aria-label="Hplot" my={5} w="100%"  color="white">
                    Hplot
                    </Button>
                </Link>

                </Flex>
            </Flex> 
        </Flex>
	)
  }

export default NavBar;
