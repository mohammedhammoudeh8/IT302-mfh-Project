import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import CompetitionsList from "./components/CompetitionsList";
import Competition from "./components/Competition";

export default function App() {
  const [user] = useState({ name: "student" });

  const ucid = process.env.REACT_APP_UCID;         // mfh
  const resource = process.env.REACT_APP_RESOURCE; // competitions

  const listPath = `/${ucid}_${resource}`;       // /mfh_competitions
  const detailPath = `/${ucid}_${resource}/:id`; // /mfh_competitions/:id

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: 16 }}>
      <nav style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link to="/">Home</Link>
        <Link to={listPath}>All {resource}</Link>
        <span style={{ marginLeft: "auto" }}>
          {user ? `Logged in as ${user.name}` : "Logged out"}
        </span>
      </nav>

      <Routes>
        <Route path="/" element={<CompetitionsList />} />
        <Route path={listPath} element={<CompetitionsList />} />
        <Route path={detailPath} element={<Competition user={user} />} />
      </Routes>
    </div>
  );
}