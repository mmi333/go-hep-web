import { Input, FormControl, FormLabel, InputGroup, InputLeftElement, FormErrorMessage, Icon } from "@chakra-ui/react";
import { FiFile } from "react-icons/fi";
import { useController } from "react-hook-form";
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { ReactNode, useRef, useState } from 'react'

type FileUploadProps = {
	register: UseFormRegisterReturn
	accept?: string
	children?: ReactNode
  }
  
const FileUpload = (props: FileUploadProps) => {
	const { register, accept, children } = props
	const inputRef = useRef<HTMLInputElement | null>(null)
	const { ref, ...rest } = register as {ref: (instance: HTMLInputElement | null) => void}
  
	const handleClick = () => inputRef.current?.click()
  
	return (
		<InputGroup onClick={handleClick}>
		  <input
			type={'file'}
			hidden
			accept={accept}
			{...rest}
			ref={(e) => {
			  ref(e)
			  inputRef.current = e
			}}
		  />
		  <>
			{children}
		  </>
		</InputGroup>
	)
  }

export default FileUpload;
