import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataService from "../service/CompetitionsDataService";

export default function Competition({ user }) {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await DataService.get(id);
        setItem(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  if (!item) return <p>Loading...</p>;

  return (
    <div>
      <h2>{item.name || item.title || "Detail"}</h2>
      <pre
        style={{
          background: "#f7f7f7",
          padding: 12,
          borderRadius: 8,
          overflowX: "auto",
        }}
      >
        {JSON.stringify(item, null, 2)}
      </pre>
      <p style={{ opacity: 0.7 }}>
        Viewing as {user?.name || "guest"}
      </p>
    </div>
  );
}
