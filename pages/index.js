
import React, { Fragment,useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useRouter } from 'next/router'

export default function Home() {

    const router = useRouter()
  return (
    <Fragment>
      <div>
          <br/>

          <Paper
              sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
              }}
          >

        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
             Honest Retirement
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
                <p>Retirement is a complicated matter. We've built a simple yet powerful retirement calculator to give you the honest facts about your money. </p>
             <p></p>


            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button onClick={()=>{ router.push("/calculator");}} variant="contained">New Plan</Button>
              <Button variant="outlined">Saved Plan</Button>
            </Stack>


          </Container>
        </Box>

          </Paper>
      </div>






    </Fragment>
  );
}
