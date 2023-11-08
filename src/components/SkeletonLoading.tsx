import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const Image = styled("img")({
  width: "100%",
  height: "100%",
});

function SkeletonLoading(props: { loading?: boolean }) {
  const { loading = false } = props;

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ margin: 1 }}></Box>
      </Box>
      {loading ? (
        <Skeleton variant="rectangular" width="80%" height={385}>
          <div style={{ paddingTop: "57%" }} />
          <Box sx={{ width: "100%" }}>
            {loading ? (
              <Skeleton width={250} height={20}>
                <Typography></Typography>
              </Skeleton>
            ) : (
              <Typography></Typography>
            )}
          </Box>
        </Skeleton>
      ) : (
        <Image src="" alt="10%" />
      )}
    </div>
  );
}

export default function SkeletonChildren() {
  return (
    <Grid container spacing={3} alignItems="center">
      <Grid item xs={4}>
        <SkeletonLoading loading />
      </Grid>
      <Grid item xs={4}>
        <SkeletonLoading loading />
      </Grid>
      <Grid item xs={4}>
        <SkeletonLoading loading />
      </Grid>
      <Grid item xs={4}>
        <SkeletonLoading loading />
      </Grid>
      <Grid item xs={4}>
        <SkeletonLoading loading />
      </Grid>
      <Grid item xs={4}>
        <SkeletonLoading loading />
      </Grid>
      <Grid item xs={4}>
        <SkeletonLoading loading />
      </Grid>
      <Grid item xs={4}>
        <SkeletonLoading loading />
      </Grid>
      <Grid item xs={4}>
        <SkeletonLoading loading />
      </Grid>
    </Grid>
  );
}
