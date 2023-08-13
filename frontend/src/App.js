import React, { useState } from "react";
import "./App.css";
import SignupForm from "./components/SignupForm";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Signup Page</h1>
      </header>
      <main>
        <SignupForm />
      </main>
    </div>
  );
}

export default App;
