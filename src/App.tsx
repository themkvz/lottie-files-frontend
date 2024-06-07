
import { AnimationList } from './components/animationList'
import { Footer } from './components/footer'
import { Header } from './components/header'

import { IndexedDBConfig } from 'use-indexeddb/dist/interfaces';
import setupIndexedDB from "use-indexeddb";
import { useEffect, useState } from 'react';
import { UploadButton } from './components/uploadButton';
import { SearchBar } from './components/searchBar';

const iDBConfig: IndexedDBConfig = {
  databaseName: "animationsDB",
  version: 1,
  stores: [
    {
      name: "animations",
      id: { keyPath: "id", autoIncrement: true },
      indices: [
        { name: "lottieId", keyPath: "lottieId", options: { unique: true } },
        { name: "data", keyPath: "data" },
      ],
    },
  ],
};

function App() {
  const [search, setSearch] = useState('')

  useEffect(() => {
    setupIndexedDB(iDBConfig)
  }, []);

  return (
    <div className="relative min-h-screen grid grid-cols-1 grid-rows-[auto_1fr_auto]">
      <Header />

      <main className='flex-1'>
        <SearchBar setSearch={setSearch} value={search} />
        <AnimationList search={search} />

        <UploadButton />
      </main>

      <Footer />
    </div>
  )
}

export default App
