"use client";
import { useEffect, useState } from "react";
import { Navbar, Footer } from "@/components/layout-components";
import { LayoutDashboard, Users, UserPlus } from "lucide-react";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-black pt-24">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 pb-20 mt-10">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg">
            <LayoutDashboard className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Admin Dashboard</h1>
            <p className="text-neutral-500">Manage CareerSprout application settings and data.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Total Registered Users</p>
              <h2 className="text-5xl font-black mt-2 dark:text-white">{users.length}</h2>
            </div>
            <Users className="h-16 w-16 text-blue-500 opacity-20" />
          </div>
          
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 rounded-2xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-neutral-500 uppercase tracking-widest">Active Sessions</p>
              <h2 className="text-5xl font-black mt-2 text-green-500">Active</h2>
            </div>
            <UserPlus className="h-16 w-16 text-green-500 opacity-20" />
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm p-8">
          <h2 className="text-xl font-bold mb-4 dark:text-white">User Directory</h2>
          {users.length === 0 ? (
            <p className="text-neutral-500">No users found in the database.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-neutral-200 dark:border-neutral-800">
                    <th className="pb-3 text-sm font-bold text-neutral-500 uppercase">User ID</th>
                    <th className="pb-3 text-sm font-bold text-neutral-500 uppercase">Name</th>
                    <th className="pb-3 text-sm font-bold text-neutral-500 uppercase">Email</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={i} className="border-b border-neutral-100 dark:border-neutral-800/50">
                      <td className="py-4 text-sm font-mono text-neutral-600 dark:text-neutral-400">{u.id}</td>
                      <td className="py-4 text-sm font-medium dark:text-white">{u.name}</td>
                      <td className="py-4 text-sm text-neutral-600 dark:text-neutral-400">{u.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
