"use client";

import React, { useEffect, useState } from "react";
import ProtectedLayout from "@/components/Layout/ProtectedLayout";
import dynamic from "next/dynamic";

// Dynamically import TaskMap to prevent SSR issues
const TaskMap = dynamic(() => import("@/components/tasks/TasksMap"), {
  ssr: false,
  loading: () => <div className="text-center text-gray-600">Loading map...</div>
});

export default function Page() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_TASK_API_URL || "http://localhost:8084";

  useEffect(() => {
    // Get token on client side only
    const userToken = localStorage.getItem("token");
    setToken(userToken);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!token) return;
      
      try {
        const res = await fetch(`${API_BASE_URL}/api/tasks/get/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTasks();
    }
  }, [token, API_BASE_URL]);

  return (
    <ProtectedLayout>
      {loading ? (
        <div className="text-center text-gray-600">Loading tasks...</div>
      ) : (
        <TaskMap tasks={tasks} />
      )}
    </ProtectedLayout>
  );
}
