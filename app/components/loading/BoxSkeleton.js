import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";

export default function BoxSkeleton({ dimensions }) {
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
        width={dimensions.width}
        height={dimensions.height}
      />
    </Box>
  );
}
