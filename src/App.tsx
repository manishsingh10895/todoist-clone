import React, { useState } from 'react';
import './App.scss';
import { Header } from './components/layout/header';
import { Content } from './components/layout/Content';
import { SelectedProjectProvider } from './context/selected-project-context';
import { ProjectsProvider } from './context/project-context';
import { HeaderProvider } from './context/header-context';
import { LayoutProvider } from './context/layout-context';

const App: React.FC<any> = ({ darkModeDefault = false }) => {

  const [darkMode, setDarkMode] = useState(darkModeDefault);

  return (
    
      <HeaderProvider>
        <LayoutProvider>
        <SelectedProjectProvider>
          <ProjectsProvider>
            <main data-testid="application" className={darkMode ? 'darkmode' : undefined}>
              <Header darkMode={darkMode} setDarkMode={setDarkMode}></Header>
              <Content />
            </main>
          </ProjectsProvider>
        </SelectedProjectProvider>
        </LayoutProvider>
      </HeaderProvider>
  );
}

export default App;
