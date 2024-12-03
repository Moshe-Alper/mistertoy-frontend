import React, { useEffect, useState } from "react"
import Select from "@mui/joy/Select"
import Option from "@mui/joy/Option"

export function LabelSelector({ labels, onLabelChange }) {
  const [selectedLabels, setSelectedLabels] = useState([])

  useEffect(() => {
    onLabelChange(selectedLabels)
  }, [selectedLabels])

  const handleLabelChange = (event, newValue) => {
    setSelectedLabels(newValue || [])
  }

  return (
    <div className="label-selector">
      <label htmlFor="label-select">Select Labels:</label>
      <Select
        id="label-select"
        multiple
        value={selectedLabels}
        onChange={handleLabelChange}
        sx={{ minWidth: "13rem" }}
        slotProps={{
          listbox: {
            sx: {
              width: "100%",
            },
          },
        }}
      >
        {labels.map(label => (
          <Option key={label} value={label}>
            {label}
          </Option>
        ))}
      </Select>
    </div>
  )
}
