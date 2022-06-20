import {createContext} from 'react'

const SubjectContext = createContext()

const SubjectProvider = SubjectContext.Provider;
const SubjectConsumer = SubjectContext.Consumer;


export {SubjectProvider, SubjectConsumer, SubjectContext};