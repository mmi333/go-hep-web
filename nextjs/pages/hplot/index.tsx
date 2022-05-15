import Link from "next/link";
import { Flex } from "@chakra-ui/react";
import useSWR from "swr";

import React, { ReactNode, useRef, useState, useEffect } from 'react'
import { Button, FormControl, FormErrorMessage, FormLabel, Icon, InputGroup, Input, Img, Box, Heading } from '@chakra-ui/react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { FiFile } from 'react-icons/fi'
import FileUpload from '../../components/file_upload';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import NavBar from '../../components/navbar';


function Hplot(): JSX.Element {
  const [selectedFile, setSelectedFile] = useState(undefined)
  const [preview, setPreview] = useState(undefined)

  const [hist, setHist] = useState('')

  
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
      if (!selectedFile) {
          setPreview(undefined)
          return
      }

      const objectUrl = URL.createObjectURL(selectedFile)
      setPreview(objectUrl)

      // free memory when ever this component is unmounted
      return () => URL.revokeObjectURL(objectUrl)
  }, [selectedFile])

  const onSelectFile = e => {
      if (!e.target.files || e.target.files.length === 0) {
          setSelectedFile(undefined)
          return
      }

      // I've kept this example simple by using the first image instead of multiple
      setSelectedFile(e.target.files[0])
  }
  const handleSubmit = async e => {
    e.preventDefault();
    const body = {
      "title": e.target[0].value,
      "npoints": e.target[1].value,
      "mu": e.target[2].value,
      "sigma": e.target[3].value,
      "nbins": e.target[4].value,
      "min": e.target[5].value,
      "max": e.target[6].value,
    }
    const res = await fetch("/api/hplot", { method: "POST", body: JSON.stringify(body)});
    // const data = await res.json();
    // console.log(data);
    const buffer = await res.arrayBuffer();
    const binaryString = Array.from(new Uint8Array(buffer), byte => String.fromCharCode(byte)).join("");
    const theImage = btoa(binaryString);
    
    setHist(theImage);
    // setHist(true);
  };

  return (
      <>
          <NavBar/>
      <Flex width="full" align="center" justifyContent="center" direction="column" pt="2%">
        <Heading as="h3">Upload a histogram image to view here</Heading>
          <Input width="25%" textAlign="center" type='file' onChange={onSelectFile} />
          {selectedFile && 
      <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <Button onClick={() => zoomIn()}>+</Button>
            <Button onClick={() => zoomOut()}>-</Button>
            <Button onClick={() => resetTransform()}>x</Button>
          </div>
          <TransformComponent>
            <Img src={preview} alt="image" />
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>

          
       }

          <Box p={2}>
            <Box textAlign="center">
              <Heading as="h3">Or build your histogram by filling the parameters here</Heading>
            </Box>
            <Box my={4} textAlign="left">
              <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                  <FormLabel>Title</FormLabel>
                  <Input variant="flushed" type="string" defaultValue="Histogram"/>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Npoints</FormLabel>
                  <Input variant="flushed" type="number" defaultValue="100" min="10"/>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Mu</FormLabel>
                  <Input variant="flushed" type="number" defaultValue="0" step="0.1"/>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Sigma</FormLabel>
                  <Input variant="flushed" type="number" defaultValue="1" step="0.1" min="0"/>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Number of bins</FormLabel>
                  <Input variant="flushed" type="number" defaultValue="20" min="0"/>
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Min</FormLabel>
                  <Input variant="flushed" type="number" defaultValue="-4" />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Max</FormLabel>
                  <Input variant="flushed" type="number" defaultValue="4"  />
                </FormControl>

                <Button width="full" mt={4} type="submit">
                  Submit
                </Button>
              </form>
            </Box>
          </Box>
        {hist &&
        
        <TransformWrapper
      initialScale={1}
      initialPositionX={200}
      initialPositionY={100}
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <React.Fragment>
          <div className="tools">
            <Button onClick={() => zoomIn()}>+</Button>
            <Button onClick={() => zoomOut()}>-</Button>
            <Button onClick={() => resetTransform()}>x</Button>
          </div>
          <TransformComponent>
            <Img src={`data:image/jpeg;base64,${hist}`} alt="hist" />
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>}
    </Flex>

      </>
  );

  
  

}

export default Hplot;


