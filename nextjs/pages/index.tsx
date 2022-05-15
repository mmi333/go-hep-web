import NavBar from "../components/navbar";
import {Flex, Image, Heading} from "@chakra-ui/react"
function Index(): JSX.Element {

  return (
    <Flex direction="column" bgColor="#007d9c" height="20%">
    <NavBar/>
    <Flex direction="row" pl="10%">
    <Image src="/gopher.svg" alt="An SVG of the Golang Gopher mascot" boxSize='20%'/>
    <Heading as="h1" color="white">Use Go-HEP from your browser!</Heading>

    </Flex>
    </Flex>
  );
}

export default Index;
