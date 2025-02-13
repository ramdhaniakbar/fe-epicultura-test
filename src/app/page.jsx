"use client";

import { useQuery } from "@tanstack/react-query";
import {
  useReactTable,
  getCoreRowModel,
  flexRender
} from "@tanstack/react-table";
import { useState } from "react";
import axios from "axios";

const columns = [
  { accessorKey: "unit", header: "UNIT" },
  { accessorKey: "meeting_room", header: "RUANG MEETING" },
  { accessorKey: "capacity", header: "KAPASITAS", cell: info => `${info.getValue()} Orang` },
  { accessorKey: "meeting_date", header: "TANGGAL RAPAT" },
  { accessorKey: "start_time", header: "WAKTU", cell: info => `${info.row.original.start_time} s/d ${info.row.original.end_time}` },
  { accessorKey: "number_of_participants", header: "JUMLAH PESERTA", cell: info => `${info.getValue()} Orang` },
  { accessorKey: "type_of_consumption", header: "JENIS KONSUMSI" },
];

export default function MeetingRoomTable() {
  const [page, setPage] = useState(1);

  // Fetch data from backend
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meetingRooms", page],
    queryFn: async () => {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/room-meetings?page=${page}&limit=10`);
      return response.data;
    },
  });

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  console.log('data ', data)

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading data</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Ruang Meeting</h2>
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="border p-2 text-left">
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map(row => (
              <tr key={row.id} className="border">
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id} className="p-2 border">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage(prev => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage(prev => prev + 1)}
          disabled={data?.data.length < 10}
        >
          Next
        </button>
      </div>
    </div>
  );
}