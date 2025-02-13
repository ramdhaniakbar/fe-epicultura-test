"use client"

import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function MeetCreatePage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    unit: "",
    meeting_room: "",
    capacity: "",
    meeting_date: "",
    start_time: "",
    end_time: "",
    number_of_participants: "",
    type_of_consumption: '',
    nominal_consumption: "",
  })

  const meetingRooms = {
    "Ruang Prambanan": 10,
    "Ruang Borobudur": 20,
    "Ruang Merapi": 15,
  }

  const { mutate, isPending } = useMutation({
    mutationKey: ["createMeetingRoom"],
    mutationFn: async (data) => {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/room-meeting`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
    onSuccess: (result) => {
      console.log("result", result);

      toast.success(result?.message || "Meeting room successfully created!");
      router.push('/')
    },
    onError: (error) => {
      console.error("Create error:", error);
      const apiErrors = error?.response?.data?.errors;
      if (apiErrors && typeof apiErrors === "object") {
        setErrors(apiErrors);
      } else {
        setErrors({});
        toast.error(error?.response?.data?.message || "An error occurred");
      }
    },
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        type_of_consumption: checked
          ? [...prev.type_of_consumption, value]
          : prev.type_of_consumption.filter((item) => item !== value),
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const convertedData = {
      ...formData,
      nominal_consumption: parseInt(formData.nominal_consumption, 10) || 0,
      capacity: parseInt(formData.capacity, 10) || 0,
      number_of_participants: parseInt(formData.number_of_participants, 10) || 0, 
    };
    console.log('converted data ', convertedData)

    mutate(convertedData)
  }

  useEffect(() => {
    if (formData.meeting_room) {
      setFormData((prev) => ({
        ...prev,
        capacity: meetingRooms[formData.meeting_room] || "",
      }))
    }
  }, [formData.meeting_room])

  console.log('form data ', formData)

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-4">
          <Link
            href="/"
            className="h-fit px-4 py-2 bg-[#4D768E] text-white rounded-lg hover:bg-[#3D5F75]"
          >
            <ChevronLeft />
          </Link>
          <div className="flex flex-col">
            <h2 className="text-2xl font-bold">Ruang Meeting</h2>
            <p className="text-gray-500">Ruang Meeting</p>
          </div>
        </div>
      </div>
      <div className="p-6 bg-white shadow rounded-md">
        <h2 className="text-xl font-bold mb-4">Informasi Ruang Meeting</h2>
        <form onSubmit={handleSubmit}>
          {/* Unit & Meeting Room */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block font-medium">Unit</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Pilih Unit</option>
                <option value="Unit Keuangan">Unit Keuangan</option>
                <option value="Unit SDM">Unit SDM</option>
              </select>
            </div>
            <div>
              <label className="block font-medium">Ruang Meeting</label>
              <select
                name="meeting_room"
                value={formData.meeting_room}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Pilih Ruangan Meeting</option>
                {Object.keys(meetingRooms).map((room) => (
                  <option key={room} value={room}>
                    {room}
                  </option>
                ))}
              </select>
            </div>

            {/* Capacity */}
            <div className="mb-4">
              <label className="block font-medium">Kapasitas</label>
              <input
                type="text"
                name="capacity"
                value={formData.capacity}
                disabled
                placeholder="Kapasitas Ruangan"
                className="w-full p-2 border rounded bg-gray-200"
              />
            </div>
          </div>

          <h2 className="text-xl font-bold mb-4">Informasi Rapat</h2>

          {/* Meeting Date & Time */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block font-medium">Tanggal Rapat*</label>
              <input
                type="date"
                name="meeting_date"
                value={formData.meeting_date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Waktu Mulai</label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block font-medium">Waktu Selesai</label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* Participants */}
          <div className="mb-4">
            <label className="block font-medium">Jumlah Peserta</label>
            <input
              type="number"
              name="number_of_participants"
              value={formData.number_of_participants}
              onChange={handleChange}
              placeholder="Masukan Jumlah Peserta"
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Consumption */}
          <div className="mb-4">
            <label className="block font-medium">Jenis Konsumsi</label>
            <div className="flex flex-col gap-2">
              {["Snack Siang", "Makan Siang", "Snack Sore"].map((type) => (
                <label key={type}>
                  <input type="radio" name="type_of_consumption" value={type} checked={formData.type_of_consumption === type} onChange={handleChange} className="mr-2" />
                  {type}
                </label>
              ))}
            </div>
          </div>

          {/* Nominal Konsumsi */}
          <div className="mb-4">
            <label className="block font-medium">Nominal Konsumsi</label>
            <div className="flex items-center border rounded">
              <span className="p-2 bg-gray-200">Rp.</span>
              <input
                type="number"
                name="nominal_consumption"
                value={formData.nominal_consumption}
                onChange={handleChange}
                className="w-full p-2 border-l rounded-r"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-6">
            <Link
              href='/'
              className="px-4 py-2 text-red-500 rounded"
            >
              Batal
            </Link>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-[#4D768E] hover:bg-[#3D5F75] rounded"
            >
              {isPending ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
