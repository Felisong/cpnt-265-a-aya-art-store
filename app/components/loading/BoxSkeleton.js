import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function BoxSkeleton() {
  return (
    <Box
      sx={{
        bgcolor: "transparent",
        margin: 0,
        width: "fit-content",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Skeleton
        sx={{ borderRadius: "12px" }}
        className="bg-backDropPink m-2"
        variant="rectangular"
        width={250}
        height={350}
      />
    </Box>
  );
}
