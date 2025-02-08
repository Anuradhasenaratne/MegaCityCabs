// import React from 'react'

// const UserMange = () => {
//   return (
//     <div>UserMange</div>
//   )
// }

// export default UserMange

import { useState, useEffect } from "react";
import { useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";
import ApiService from "../../service/ApiService";

const UserMange = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await ApiService.getAllUsers();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    const columns = [
        { accessorKey: "id", header: "ID" },
        { accessorKey: "userName", header: "User Name" },
        { accessorKey: "nic", header: "NIC" },
        { accessorKey: "role", header: "Role" },
        { accessorKey: "phoneNumber", header: "Phone Number" },
        { accessorKey: "bookingConfirmationCode", header: "Confirmation ID" },
    ];

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">User Management</h2>
            <div className="overflow-x-auto">
                <table className="w-full border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-100">
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th key={header.id} className="px-4 py-2 text-left border-b">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map(row => (
                            <tr key={row.id} className="hover:bg-gray-50">
                                {row.getVisibleCells().map(cell => (
                                    <td key={cell.id} className="px-4 py-2 border-b">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserMange;
