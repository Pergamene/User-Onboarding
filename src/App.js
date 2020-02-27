import React, { useState } from 'react';

import Form from './components/Form.jsx';

function App() {
  const [userData, setUserData] = useState([]);

  return (
    <div className="App">
      <Form userData={userData} setUserData={setUserData} />
    </div>
  );
}

export default App;
