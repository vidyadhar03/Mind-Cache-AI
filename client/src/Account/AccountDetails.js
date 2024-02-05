import { useState,useContext } from "react";
import { TextField } from "@mui/material";
import { DataContext } from "../utils/DataContext";

export const AccountDetails = () => {
  const [name, setName] = useState("");
  const { globalEmail } = useContext(DataContext);


  return (
    <div className="p-4 md:p-8">
      <div>Your Account Details</div>
      <div className="w-full md:w-1/2 mt-4">
        <TextField
          id="outlined-basic"
          label="Add your Name"
          variant="outlined"
          InputLabelProps={{
            style: { fontFamily: "poppins" },
          }}
          sx={{ width: "100%", borderColor: "black" }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="w-full md:w-1/2 mt-4">
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          InputLabelProps={{
            style: { fontFamily: "poppins" },
          }}
          sx={{ width: "100%", borderColor: "black" }}
          defaultValue={globalEmail}
          // onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-4 text-base font-medium underline">
        Reset Password
      </div>
      <div className="text-center w-full md:w-1/2 px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium  shadow-lg text-base mt-8">
        Update Details
      </div>
    </div>
  );
};
