import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table'; // Adjust based on your file structure
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

// Named export for InodesTable
export function InodesTable({ data }) {
  const [selectedRowIds, setSelectedRowIds] = useState({});
  const selectAllRef = useRef(null);

  // Function to handle row selection
  const handleSelectRow = (id) => {
    setSelectedRowIds((prevSelected) => ({
      ...prevSelected,
      [id]: !prevSelected[id], // Toggle selection state for the row ID
    }));
  };

  // Function to handle selecting all rows
  const handleSelectAll = (isChecked) => {
    const newSelectedRowIds = {};
    if (isChecked) {
      data.forEach((row) => {
        newSelectedRowIds[row.id] = true;
      });
    }
    setSelectedRowIds(newSelectedRowIds);
  };

  // Function to handle downloading selected rows as CSV
  const handleDownloadSelected = () => {
    const selectedRows = data.filter((row) => selectedRowIds[row.id]);
    const csvContent = selectedRows.map((row) => `${row.id},${row.name}`).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'selected_rows.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const allSelected = data.length > 0 && data.every((row) => selectedRowIds[row.id]);
  const someSelected = data.some((row) => selectedRowIds[row.id]);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = !allSelected && someSelected;
    }
  }, [allSelected, someSelected]);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button onClick={handleDownloadSelected} disabled={Object.keys(selectedRowIds).length === 0}>
          Download Selected
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox
                ref={selectAllRef}
                checked={allSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
              />
            </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox
                  checked={!!selectedRowIds[row.id]}
                  onChange={() => handleSelectRow(row.id)}
                />
              </TableCell>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}