import {createContext} from 'react'

const StudentContext = createContext()

StudentProvider = StudentContext.Provider;
StudentConsumer = StudentContext.Consumer;

export {StudentConsumer, StudentProvider}