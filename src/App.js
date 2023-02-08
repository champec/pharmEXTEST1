import logo from './logo.svg';
import './App.css';
import { PharmacyAuthScreen, UserAuthScreen, Dashboard } from './screen';
import { useEffect, useState } from 'react';
import { OrganisationProvider, UsersProvider } from './Context';
import { supabasePharmacyClient, supabaseUserClient } from './supabase/auth';

function App() {
const [pharmacySession, setPharmacySession] = useState()
const [userSession, setUserSession] = useState()

console.log("PHARMACY", pharmacySession, "USER", userSession)
  return (
    <OrganisationProvider setPharmacySession={setPharmacySession}>
      <UsersProvider setUserSession={setUserSession}>
       <div className="App">
      <header className="App-header">
       { pharmacySession && !userSession ? <UserAuthScreen /> : userSession && pharmacySession ? <Dashboard /> : <PharmacyAuthScreen />}
      </header>
    </div>
    </UsersProvider>
    </OrganisationProvider>
  );
}

export default App;
