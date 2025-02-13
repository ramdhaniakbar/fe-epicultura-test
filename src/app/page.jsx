"use client"

import { useQuery } from "@tanstack/react-query"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"
import { useState } from "react"
import axios from "axios"

const columns = [
  { accessorKey: "unit", header: "UNIT" },
  { accessorKey: "meeting_room", header: "RUANG MEETING" },
  {
    accessorKey: "capacity",
    header: "KAPASITAS",
    cell: (info) => `${info.getValue()} Orang`,
  },
  { accessorKey: "meeting_date", header: "TANGGAL RAPAT" },
  {
    accessorKey: "start_time",
    header: "WAKTU",
    cell: (info) =>
      `${info.row.original.start_time} s/d ${info.row.original.end_time}`,
  },
  {
    accessorKey: "number_of_participants",
    header: "JUMLAH PESERTA",
    cell: (info) => `${info.getValue()} Orang`,
  },
  { accessorKey: "type_of_consumption", header: "JENIS KONSUMSI" },
]

export default function MeetingRoomTable() {
  const [page, setPage] = useState(1)

  // Fetch data from backend
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meetingRooms", page],
    queryFn: async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/room-meetings?page=${page}&limit=10`
      )
      return response.data
    },
  })

  const table = useReactTable({
    data: data?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data</p>

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold">Ruang Meeting</h2>
          <p className="text-gray-500">Ruang Meeting</p>
        </div>
        <button className="px-4 py-2 bg-[#4D768E] text-white rounded-lg hover:bg-[#3D5F75]">
          + Pesan Ruangan
        </button>
      </div>
      <div className="p-6 bg-white shadow-md rounded-lg">
        {/* Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border border-gray-300 rounded-lg">
            <thead className="bg-gray-100 text-left">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="border p-3 text-gray-700 font-semibold"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="p-3 border text-gray-700">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center p-4 text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4 text-gray-700">
          <span>
            <strong>
              Showing {(page - 1) * 10 + 1}-{Math.min(page * 10, 1000)} of 1000
            </strong>
          </span>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 border rounded-md hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className={`px-3 py-1 border rounded-md ${
                  page === num ? "bg-[#4D768E] text-white" : "hover:bg-gray-200"
                }`}
                onClick={() => setPage(num)}
              >
                {num}
              </button>
            ))}
            <button
              className="px-3 py-1 border rounded-md hover:bg-gray-200 disabled:opacity-50"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={data?.data.length < 10}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
