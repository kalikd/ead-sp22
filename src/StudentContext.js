import {createContext} from 'react'

const StudentContext = createContext()

const StudentProvider = StudentContext.Provider;
const StudentConsumer = StudentContext.Consumer;


export {StudentProvider, StudentConsumer, StudentContext};