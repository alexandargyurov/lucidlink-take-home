import React from "react";

import FileBrowser from "./components/FileBrowser/FileBrowser";
import { Sidebar } from "./components/Sidebar/Sidebar";

function App(): React.JSX.Element {
  return (
    <>
      {/* <nav>navbar</nav> */}

      <main>
        <Sidebar />
        <FileBrowser />
      </main>
    </>
  );
}

export default App;
