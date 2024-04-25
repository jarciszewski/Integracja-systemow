import { Select, MenuItem } from "@mui/material";
import { useEffect } from "react";
export const SelectComponent = ({ wars, selectedConflict, setSelectedConflict }) => {
  useEffect(() => {
    setSelectedConflict(wars?.data[0])
  }, [])
  return (
    <Select
      value={selectedConflict}
      onChange={(e) => setSelectedConflict(e.target.value)}
    >
      {wars?.data?.map(elem => {
        return (
          <MenuItem key={elem._id} value={elem}>{elem.name}</MenuItem>
        )
      })}
    </Select>
  );
};