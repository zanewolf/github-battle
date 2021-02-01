import React from 'react'

const {Consumer, Provider} =React.createContext()

// consumer is how components use information we want available to the file structure
export const ThemeConsumer = Consumer
// provider is how we define what info is available
export const ThemeProvider = Provider

// barebones because for the context all you need to do is import and export the props