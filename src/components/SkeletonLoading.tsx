import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

const Image = styled('img')({
  width: '40%',
});

function SkeletonLoading(props: { loading?: boolean }) {
  const { loading = false } = props;

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Box sx={{ margin: 1 }}>
          {loading ? (
            <Skeleton variant="circular" width={80} height={80}>
              <Avatar />
            </Skeleton>
          ) : (
            <Avatar src="" />
          )}
        </Box>
        <Box sx={{ width: '100%' }}>
          {loading ? (
            <Skeleton width={150} height={20}> 
              <Typography>.</Typography>
            </Skeleton>
          ) : (
            <Typography></Typography>
          )}
        </Box>
      </Box>
      {loading ? (
        <Skeleton variant="rectangular" width="100%">
          <div style={{ paddingTop: '57%' }} />
        </Skeleton>
      ) : (
        <Image
          src=""
          alt=""
        />
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
    <Grid item xs={4}> {/* Elemento adicional 1 */}
    <SkeletonLoading loading />
    </Grid>
    <Grid item xs={4}> {/* Elemento adicional 2 */}
    <SkeletonLoading loading />
    </Grid>
    <Grid item xs={4}> {/* Elemento adicional 3 */}
    <SkeletonLoading loading />
    </Grid>
    <Grid item xs={4}> {/* Elemento adicional 3 */}
    <SkeletonLoading loading />
    </Grid>
    <Grid item xs={4}> {/* Elemento adicional 3 */}
    <SkeletonLoading loading />
    </Grid>
    <Grid item xs={4}> {/* Elemento adicional 3 */}
    <SkeletonLoading loading />
    </Grid>
    <Grid item xs={4}> {/* Elemento adicional 3 */}
    <SkeletonLoading loading />
    </Grid>
    <Grid item xs={4}> {/* Elemento adicional 3 */}
    <SkeletonLoading loading />
    </Grid>
    <Grid item xs={4}> {/* Elemento adicional 3 */}
    <SkeletonLoading loading />
    </Grid>
  </Grid>

  );
}
