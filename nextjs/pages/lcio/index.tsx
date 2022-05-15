import Link from "next/link";
import { Flex, Heading } from "@chakra-ui/react";
import useSWR from "swr";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box
  } from '@chakra-ui/react'

import { Button, FormControl, FormErrorMessage, FormLabel, Icon, InputGroup } from '@chakra-ui/react'
import { FiFile } from 'react-icons/fi'
import { ReactNode, useRef, useState } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import FileUpload from '../../components/file_upload';
import NavBar from '../../components/navbar';
import {useEffect} from 'react';
type FormValues = {
  file_: File
}

function Lcio(): JSX.Element {
    const [eventData, setEventData] = useState([]);
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
    
    const onSubmit = handleSubmit((data, e) => {
        const formData = new FormData();
        formData.append('file_', data.file_[0]);
        fetch('/api/lcio', { method: 'POST', body: formData }).then(response => {
            response.json().then(parsedJson => {
                setEventData(parsedJson); 
            })
        });    
    
    })
  
  
    return (
      <Flex direction="column">
      <NavBar/>

      <Flex direction="column" pt="2%" align="center" justifyContent="center">
        
      <Heading as="h3">Upload a .slcio file here to view</Heading>

      </Flex>
      <Flex align="center" justifyContent="center">
        <form onSubmit={onSubmit}>
          <FormControl isInvalid={!!errors.file_} isRequired>
            <FormLabel>{'File input'}</FormLabel>
  
            <FileUpload
              accept={'.slcio'}
              register={register('file_', { })}
            >
              <Button leftIcon={<Icon as={FiFile} />}>
                Upload
              </Button>
            </FileUpload>
  
            <FormErrorMessage>
              {errors.file_ && errors?.file_.message}
            </FormErrorMessage>
          </FormControl>
  
          <button>Submit</button>
        </form>

      </Flex>

      <Flex align="center" justifyContent="center">

        {eventData.map((event, index) => { return (
        <TableContainer>
        <Table variant='simple'>
          <TableCaption>SLCIO file details</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Event Number</Td>
              <Td>{event.event_number}</Td>
            </Tr>
            <Tr>
              <Td>Run Number</Td>
              <Td>{event.run_number}</Td>
            </Tr>
            <Tr>
              <Td>Detector</Td>
              <Td>{event.detector}</Td>
            </Tr>
            <Tr>
              <Td>Collections</Td>
              <Td>{event.collections}</Td>
            </Tr>
            <Tr>
              <Td>Calohits Count</Td>
              <Td>{event.calohits_count}</Td>
            </Tr>
            <Tr>
              <Td>Calohits</Td>
              <Td>{event.calohits}</Td>
            </Tr>

          </Tbody>
        </Table>
      </TableContainer>)})}
      </Flex>
      </Flex>

    );
}

export default Lcio;
