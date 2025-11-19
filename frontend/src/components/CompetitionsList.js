import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DataService from "../service/CompetitionsDataService";

export default function CompetitionsList() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const [by, setBy] = useState("field"); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const normalizeData = (data) => {
    if (Array.isArray(data)) return data;
    if (Array.isArray(data.competitions)) return data.competitions;
    if (Array.isArray(data.results)) return data.results;
    return [];
  };

  const loadAll = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await DataService.getAll();
      console.log("GET ALL data:", res.data);
      setItems(normalizeData(res.data));
    } catch (err) {
      console.error(err);
      setError("Could not load data.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  const executeSearch = async () => {
    if (!query.trim()) {
      return loadAll();
    }
    setLoading(true);
    setError("");
    try {
      const res = await DataService.find(query, by);
      console.log("SEARCH data:", res.data);
      setItems(normalizeData(res.data));
    } catch (err) {
      console.error(err);
      setError("Search failed.");
      setItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const ucid = process.env.REACT_APP_UCID || "mfh";
  const resource = process.env.REACT_APP_RESOURCE || "competitions";

  return (
    <div>
      <h2>All {resource}</h2>

      {/* Search / filter controls */}
      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        <select value={by} onChange={(e) => setBy(e.target.value)}>
          <option value="field">field</option>
        </select>

        <input
          placeholder="Search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <button onClick={executeSearch}>Search</button>
        <button onClick={loadAll}>Reset</button>
      </div>

      {loading && <p>Loading…</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Cards */}
      <div style={{ display: "grid", gap: 12 }}>
        {(Array.isArray(items) ? items : []).map((it) => (
          <div
            key={it._id || it.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 8,
              padding: 12,
            }}
          >
            <h3 style={{ marginTop: 0 }}>
              {it.name || it.title || it._id || it.id}
            </h3>
            <p style={{ margin: "6px 0" }}>
              {it.description || it.summary || "No description"}
            </p>

            <Link to={`/${ucid}_${resource}/id/${it._id || it.id}`}>
              View details
            </Link>
          </div>
        ))}

        {Array.isArray(items) && !items.length && !loading && !error && (
          <p>No records found.</p>
        )}
      </div>
    </div>
  );
}