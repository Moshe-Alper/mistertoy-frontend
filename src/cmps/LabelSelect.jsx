import { useEffect, useState } from "react"

  export function LabelSelector({ labels, onLabelChange }) {
    const [selectedLabels, setSelectedLabels] = useState([])
  
    useEffect(() => {
      onLabelChange(selectedLabels)
    }, [selectedLabels])
  
    function handleLabelChange(event) {
      const value = event.target.value
      setSelectedLabels(prevLabels => {
        if (prevLabels.includes(value)) {
          return prevLabels.filter(label => label !== value)
        } else {
          return [...prevLabels, value]
        }
      })
    }
  
    return (
      <div className="label-selector">
        <label htmlFor="label-select">Select Labels:</label>
        <select
          id="label-select"
          multiple
          value={selectedLabels}
          onChange={handleLabelChange}
        >
          {labels.map(label => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>
    )
  }

